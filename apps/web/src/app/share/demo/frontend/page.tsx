import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { prototypeExperiences } from "@/lib/mock-data";

export const metadata = { title: "Frontend · Demo view" };

export default function PublicFrontendPresetPage() {
  return (
    <main className="min-h-screen bg-[#f6f0e6] px-5 py-8 text-[#1b1b2f] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/presets" className="inline-flex items-center gap-2 text-sm text-slate-500"><ArrowLeft className="size-4" /> 프로토타입으로 돌아가기</Link>
        <header className="py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">Frontend · Selected view</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-0.06em] sm:text-7xl">경험을 구조로 만들고,<br />구조를 화면으로 옮깁니다.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">제품의 문제를 발견하고 React와 TypeScript로 실제 사용 가능한 흐름을 만드는 과정을 기록합니다.</p>
        </header>
        <section className="grid gap-5 pb-20 md:grid-cols-2">
          {prototypeExperiences.slice(0, 2).map((experience, index) => (
            <article key={experience.id} className={`${index === 0 ? "bg-[#292743] text-white" : "bg-white"} rounded-[2rem] p-7 sm:p-9`}>
              <p className={`text-xs uppercase tracking-widest ${index === 0 ? "text-violet-200" : "text-violet-700"}`}>0{index + 1} · Case</p>
              <h2 className="mt-10 text-3xl font-semibold tracking-[-0.04em]">{experience.title}</h2>
              <p className={`mt-3 leading-7 ${index === 0 ? "text-slate-300" : "text-slate-500"}`}>{experience.summary}</p>
              <div className="mt-8 flex items-center justify-between"><span className="text-xs opacity-60">{experience.period}</span><ArrowUpRight className="size-5" /></div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
