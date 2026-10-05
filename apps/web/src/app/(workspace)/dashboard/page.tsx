import Link from "next/link";
import { ArrowRight, CircleDashed, Plus, Sparkles } from "lucide-react";

import { PrototypeExperienceTile } from "@/components/prototype-experience-tile";
import { prototypeExperiences, prototypeGoals } from "@/lib/mock-data";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <main>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#7b6aa5]">2026년 10월의 archive</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">오늘의 나를<br className="sm:hidden" /> 가볍게 남겨볼까요?</h1>
        </div>
        <Link href="/experiences/new" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#17182b] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#17182b]/15">
          <Plus className="size-4" /> 새 경험 기록
        </Link>
      </div>

      <section className="mt-8 grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-[#252541] p-6 text-white sm:p-8">
          <div className="absolute -right-14 -top-16 size-52 rounded-full bg-violet-500/30 blur-2xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-violet-100"><Sparkles className="size-3.5" /> 지금 이어가는 경험</span>
            <p className="mt-8 text-sm text-violet-200/70">Folding Birding · Doing</p>
            <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-[-0.04em]">전시 피드백을 잊기 전에<br />짧은 회고로 남겨보세요.</h2>
            <Link href="/experiences/folding-birding" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white">기록 이어가기 <ArrowRight className="size-4" /></Link>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[#dfd8cc] bg-[#fffaf1] p-6">
          <p className="text-sm font-semibold">이번 달의 결</p>
          <div className="mt-7 flex items-end gap-2">
            <strong className="text-5xl tracking-[-0.06em]">07</strong>
            <span className="pb-1 text-sm text-slate-500">개의 기록</span>
          </div>
          <div className="mt-8 grid grid-cols-7 gap-1.5" aria-label="이번 주 기록 현황">
            {[1, 0, 1, 1, 0, 1, 0].map((active, index) => <span key={index} className={`h-10 rounded-lg ${active ? "bg-[#8b75ff]" : "bg-[#ebe4d8]"}`} />)}
          </div>
          <p className="mt-3 text-xs text-slate-400">완벽한 글보다 작은 흔적을 먼저 남겨요.</p>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">최근 경험</h2>
          <Link href="/archive" className="text-sm font-medium text-violet-700">Archive 전체보기</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {prototypeExperiences.map((experience) => <PrototypeExperienceTile key={experience.id} experience={experience} />)}
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        {prototypeGoals.map((goal) => (
          <article key={goal.interest} className="rounded-2xl border border-[#dfd8cc] bg-white p-5">
            <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{goal.interest}</span><CircleDashed className="size-4 text-slate-300" /></div>
            <h3 className="mt-4 min-h-12 font-semibold leading-6">{goal.goal}</h3>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${goal.progress}%`, backgroundColor: goal.color }} /></div>
            <p className="mt-2 text-right text-xs text-slate-400">{goal.progress}%</p>
          </article>
        ))}
      </section>
    </main>
  );
}
