"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

export type ExperienceActionState = { error: string | null };

const experienceSchema = z.object({
  title: z.string().trim().min(2, "제목을 두 글자 이상 입력해주세요.").max(100, "제목은 100자까지 입력할 수 있어요."),
  summary: z.string().trim().max(500, "요약은 500자까지 입력할 수 있어요."),
  status: z.enum(["idea", "doing", "done", "paused"]),
  startedOn: z.string(),
  endedOn: z.string(),
  interests: z.string().max(300),
  reflection: z.string().trim().max(5000, "회고는 5,000자까지 입력할 수 있어요."),
}).refine(({ startedOn, endedOn }) => !startedOn || !endedOn || endedOn >= startedOn, {
  message: "종료일은 시작일보다 빠를 수 없어요.",
});

function readExperienceForm(formData: FormData) {
  return experienceSchema.safeParse({
    title: String(formData.get("title") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    status: String(formData.get("status") ?? "idea"),
    startedOn: String(formData.get("startedOn") ?? ""),
    endedOn: String(formData.get("endedOn") ?? ""),
    interests: String(formData.get("interests") ?? ""),
    reflection: String(formData.get("reflection") ?? ""),
  });
}

function slugify(value: string) {
  return value.normalize("NFKC").toLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "experience";
}

function parseInterests(value: string) {
  const unique = new Map<string, { name: string; slug: string }>();
  value.split(",").map((item) => item.trim()).filter(Boolean).slice(0, 12).forEach((name) => unique.set(slugify(name), { name, slug: slugify(name) }));
  return [...unique.values()];
}

async function getAuthenticatedUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return { supabase, user };
}

async function syncInterests(supabase: Awaited<ReturnType<typeof createClient>>, ownerId: string, experienceId: string, rawInterests: string) {
  const interests = parseInterests(rawInterests);
  const { error: deleteError } = await supabase.from("experience_interests").delete().eq("experience_id", experienceId);
  if (deleteError) throw deleteError;
  if (interests.length === 0) return;

  const { data: interestRows, error: interestError } = await supabase.from("interests").upsert(
    interests.map((interest) => ({ owner_id: ownerId, ...interest })),
    { onConflict: "owner_id,slug" },
  ).select("id");
  if (interestError) throw interestError;

  const { error: relationError } = await supabase.from("experience_interests").insert(
    (interestRows ?? []).map(({ id }) => ({ owner_id: ownerId, experience_id: experienceId, interest_id: id })),
  );
  if (relationError) throw relationError;
}

async function syncReflection(supabase: Awaited<ReturnType<typeof createClient>>, ownerId: string, experienceId: string, reflection: string) {
  const { data: existing, error: findError } = await supabase.from("experience_blocks").select("id").eq("experience_id", experienceId).eq("block_type", "reflection").limit(1).maybeSingle();
  if (findError) throw findError;

  if (!reflection) {
    if (existing) {
      const { error } = await supabase.from("experience_blocks").delete().eq("id", existing.id);
      if (error) throw error;
    }
    return;
  }

  if (existing) {
    const { error } = await supabase.from("experience_blocks").update({ content: { text: reflection }, updated_at: new Date().toISOString() }).eq("id", existing.id);
    if (error) throw error;
    return;
  }

  const { error } = await supabase.from("experience_blocks").insert({ owner_id: ownerId, experience_id: experienceId, block_type: "reflection", content: { text: reflection }, position: 0 });
  if (error) throw error;
}

export async function createExperience(_previousState: ExperienceActionState, formData: FormData): Promise<ExperienceActionState> {
  const parsed = readExperienceForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "입력 내용을 확인해주세요." };
  const { supabase, user } = await getAuthenticatedUser();
  if (!user) return { error: "로그인이 만료됐어요. 다시 로그인해주세요." };

  const values = parsed.data;
  const slug = `${slugify(values.title)}-${crypto.randomUUID().slice(0, 8)}`;
  const { data: experience, error } = await supabase.from("experiences").insert({
    owner_id: user.id,
    title: values.title,
    slug,
    summary: values.summary || null,
    status: values.status,
    started_on: values.startedOn || null,
    ended_on: values.endedOn || null,
  }).select("id").single();
  if (error || !experience) return { error: `저장하지 못했어요: ${error?.message ?? "알 수 없는 오류"}` };

  try {
    await syncInterests(supabase, user.id, experience.id, values.interests);
    await syncReflection(supabase, user.id, experience.id, values.reflection);
  } catch (syncError) {
    await supabase.from("experiences").delete().eq("id", experience.id);
    const message = syncError instanceof Error ? syncError.message : "연결 정보를 저장하지 못했어요.";
    return { error: `저장하지 못했어요: ${message}` };
  }

  revalidatePath("/dashboard");
  revalidatePath("/archive");
  redirect(`/experiences/${experience.id}`);
}

export async function updateExperience(experienceId: string, _previousState: ExperienceActionState, formData: FormData): Promise<ExperienceActionState> {
  const parsed = readExperienceForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "입력 내용을 확인해주세요." };
  const { supabase, user } = await getAuthenticatedUser();
  if (!user) return { error: "로그인이 만료됐어요. 다시 로그인해주세요." };

  const values = parsed.data;
  const { error } = await supabase.from("experiences").update({
    title: values.title,
    summary: values.summary || null,
    status: values.status,
    started_on: values.startedOn || null,
    ended_on: values.endedOn || null,
    updated_at: new Date().toISOString(),
  }).eq("id", experienceId).eq("owner_id", user.id);
  if (error) return { error: `수정하지 못했어요: ${error.message}` };

  try {
    await syncInterests(supabase, user.id, experienceId, values.interests);
    await syncReflection(supabase, user.id, experienceId, values.reflection);
  } catch (syncError) {
    const message = syncError instanceof Error ? syncError.message : "연결 정보를 수정하지 못했어요.";
    return { error: `일부 내용을 수정하지 못했어요: ${message}` };
  }

  revalidatePath("/dashboard");
  revalidatePath("/archive");
  revalidatePath(`/experiences/${experienceId}`);
  redirect(`/experiences/${experienceId}`);
}

export async function deleteExperience(experienceId: string) {
  const { supabase, user } = await getAuthenticatedUser();
  if (!user) redirect("/login");
  const { error } = await supabase.from("experiences").delete().eq("id", experienceId).eq("owner_id", user.id);
  if (error) redirect(`/experiences/${experienceId}?deleteError=1`);
  revalidatePath("/dashboard");
  revalidatePath("/archive");
  redirect("/archive");
}
