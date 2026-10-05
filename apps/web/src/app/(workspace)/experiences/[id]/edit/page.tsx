import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ExperienceForm } from "@/components/experience-form";
import { EXPERIENCE_SELECT, type ExperienceQueryRow, toExperienceRecord } from "@/lib/experience-model";
import { createClient } from "@/lib/supabase/server";

import { updateExperience } from "../../actions";

export const metadata = { title: "경험 수정" };

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase.from("experiences").select(EXPERIENCE_SELECT).eq("id", id).maybeSingle();
  if (error || !data) notFound();

  const experience = toExperienceRecord(data as unknown as ExperienceQueryRow);
  const saveExperience = updateExperience.bind(null, experience.id);

  return (
    <main className="mx-auto max-w-4xl">
      <Link href={`/experiences/${experience.id}`} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-700"><ArrowLeft className="size-4" /> 기록으로 돌아가기</Link>
      <p className="mt-7 text-sm font-medium text-[#7b6aa5]">Edit experience</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em]">경험 다듬기</h1>
      <ExperienceForm action={saveExperience} experience={experience} />
    </main>
  );
}
