import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Edit3, Link2, Quote, Trash2 } from "lucide-react";

import {
  EXPERIENCE_SELECT,
  formatExperiencePeriod,
  statusLabel,
  type ExperienceQueryRow,
  toExperienceRecord,
} from "@/lib/experience-model";
import { createClient } from "@/lib/supabase/server";

import { deleteExperience } from "../actions";

export default async function ExperienceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ deleteError?: string }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const supabase = await createClient();
  const { data, error } = await supabase.from("experiences").select(EXPERIENCE_SELECT).eq("id", id).maybeSingle();
  if (error || !data) notFound();

  const experience = toExperienceRecord(data as unknown as ExperienceQueryRow);
  const removeExperience = deleteExperience.bind(null, experience.id);

  return (
    <main className="mx-auto max-w-4xl">
      <Link href="/archive" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-700"><ArrowLeft className="size-4" /> Archive</Link>
      {query.deleteError ? <p role="alert" className="mt-5 rounded-xl bg-rose-100 px-4 py-3 text-sm text-rose-800">기록을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.</p> : null}
      <article className="mt-6 overflow-hidden rounded-[2rem] border border-[#ded7cc] bg-white">
        <div className="h-3 bg-gradient-to-r from-violet-500 to-fuchsia-400" />
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{statusLabel[experience.status]}</span>
            <div className="flex gap-2">
              <Link href={`/experiences/${experience.id}/edit`} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium"><Edit3 className="size-3.5" /> 편집</Link>
              <form action={removeExperience}>
                <button className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-3 py-2 text-xs font-medium text-rose-700"><Trash2 className="size-3.5" /> 삭제</button>
              </form>
            </div>
          </div>
          <h1 className="mt-7 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{experience.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-500">{experience.summary || "아직 요약이 없는 경험이에요."}</p>
          <p className="mt-6 flex items-center gap-2 text-sm text-slate-400"><CalendarDays className="size-4" /> {formatExperiencePeriod(experience)}</p>
          <div className="mt-6 flex flex-wrap gap-2">{experience.interests.map((tag) => <span key={tag} className="rounded-lg bg-[#f4f1fa] px-2.5 py-1.5 text-xs text-[#665b84]">#{tag}</span>)}</div>
          <section className="mt-10 rounded-2xl bg-[#f8f6f2] p-6">
            <Quote className="size-5 text-violet-500" />
            <h2 className="mt-5 font-semibold">지금 남겨둔 회고</h2>
            <p className="mt-3 whitespace-pre-wrap leading-8 text-slate-600">{experience.reflection || "아직 회고가 없어요. 편집에서 지금의 생각을 남겨보세요."}</p>
          </section>
          <section className="mt-5 rounded-2xl border border-dashed border-slate-200 p-6"><Link2 className="size-5 text-slate-400" /><h2 className="mt-4 font-semibold">관련 자료를 연결할 자리</h2><p className="mt-2 text-sm leading-6 text-slate-400">이미지, 코드, 링크와 파일 블록은 다음 단계에서 이곳에 연결할 예정이에요.</p></section>
        </div>
      </article>
    </main>
  );
}
