import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Edit3, Link2, Quote } from "lucide-react";

import { prototypeExperiences } from "@/lib/mock-data";

export default async function ExperienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = prototypeExperiences.find((item) => item.id === id);
  if (!experience) notFound();

  return (
    <main className="mx-auto max-w-4xl">
      <Link href="/archive" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-700"><ArrowLeft className="size-4" /> Archive</Link>
      <article className="mt-6 overflow-hidden rounded-[2rem] border border-[#ded7cc] bg-white">
        <div className={`h-3 bg-gradient-to-r ${experience.accent}`} />
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3"><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{experience.status}</span><button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium"><Edit3 className="size-3.5" /> 편집</button></div>
          <h1 className="mt-7 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{experience.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-500">{experience.summary}</p>
          <p className="mt-6 flex items-center gap-2 text-sm text-slate-400"><CalendarDays className="size-4" /> {experience.period}</p>
          <div className="mt-6 flex flex-wrap gap-2">{experience.tags.map((tag) => <span key={tag} className="rounded-lg bg-[#f4f1fa] px-2.5 py-1.5 text-xs text-[#665b84]">#{tag}</span>)}</div>
          <section className="mt-10 rounded-2xl bg-[#f8f6f2] p-6"><Quote className="size-5 text-violet-500" /><h2 className="mt-5 font-semibold">지금 남겨둔 메모</h2><p className="mt-3 leading-8 text-slate-600">{experience.note}</p></section>
          <section className="mt-5 rounded-2xl border border-dashed border-slate-200 p-6"><Link2 className="size-5 text-slate-400" /><h2 className="mt-4 font-semibold">관련 자료를 연결할 자리</h2><p className="mt-2 text-sm leading-6 text-slate-400">이미지, 코드, 링크와 파일 블록이 이곳에 쌓이게 됩니다.</p></section>
        </div>
      </article>
    </main>
  );
}
