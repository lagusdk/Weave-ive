import Link from "next/link";
import { ArrowRight, CircleDashed, Plus, Sparkles } from "lucide-react";

import { ExperienceListCard } from "@/components/experience-list-card";
import { EXPERIENCE_SELECT, statusLabel, type ExperienceQueryRow, toExperienceRecord } from "@/lib/experience-model";
import { prototypeGoals } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const now = new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
  const nextMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)).toISOString();

  const [{ data: recentData }, { count: totalCount }, { count: monthCount }] = await Promise.all([
    supabase.from("experiences").select(EXPERIENCE_SELECT).order("updated_at", { ascending: false }).limit(3),
    supabase.from("experiences").select("id", { count: "exact", head: true }),
    supabase.from("experiences").select("id", { count: "exact", head: true }).gte("created_at", monthStart).lt("created_at", nextMonth),
  ]);
  const recent = ((recentData ?? []) as unknown as ExperienceQueryRow[]).map(toExperienceRecord);
  const current = recent.find((experience) => experience.status === "doing") ?? recent[0];
  const monthLabel = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long" }).format(now);

  return (
    <main>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#7b6aa5]">{monthLabel}의 archive</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">오늘의 나를<br className="sm:hidden" /> 가볍게 남겨볼까요?</h1>
        </div>
        <Link href="/experiences/new" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#17182b] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#17182b]/15"><Plus className="size-4" /> 새 경험 기록</Link>
      </div>

      <section className="mt-8 grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-[#252541] p-6 text-white sm:p-8">
          <div className="absolute -right-14 -top-16 size-52 rounded-full bg-violet-500/30 blur-2xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-violet-100"><Sparkles className="size-3.5" /> 지금 이어가는 경험</span>
            {current ? (
              <><p className="mt-8 text-sm text-violet-200/70">{statusLabel[current.status]} · 최근 업데이트</p><h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-[-0.04em]">{current.title}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-violet-100/70">{current.summary || "지금의 생각을 짧은 회고로 이어서 남겨보세요."}</p><Link href={`/experiences/${current.id}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white">기록 이어가기 <ArrowRight className="size-4" /></Link></>
            ) : (
              <><h2 className="mt-8 max-w-xl text-3xl font-semibold tracking-[-0.04em]">첫 경험을 기록해<br />나만의 아카이브를 시작해보세요.</h2><Link href="/experiences/new" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white">첫 기록 만들기 <ArrowRight className="size-4" /></Link></>
            )}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[#dfd8cc] bg-[#fffaf1] p-6">
          <p className="text-sm font-semibold">이번 달의 결</p>
          <div className="mt-7 flex items-end gap-2"><strong className="text-5xl tracking-[-0.06em]">{String(monthCount ?? 0).padStart(2, "0")}</strong><span className="pb-1 text-sm text-slate-500">개의 새 기록</span></div>
          <div className="mt-8 h-2 overflow-hidden rounded-full bg-[#ebe4d8]"><div className="h-full rounded-full bg-[#8b75ff]" style={{ width: `${Math.min(100, (monthCount ?? 0) * 12.5)}%` }} /></div>
          <p className="mt-3 text-xs text-slate-400">전체 {totalCount ?? 0}개 · 완벽한 글보다 작은 흔적을 먼저 남겨요.</p>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold">최근 경험</h2><Link href="/archive" className="text-sm font-medium text-violet-700">Archive 전체보기</Link></div>
        {recent.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{recent.map((experience) => <ExperienceListCard key={experience.id} experience={experience} />)}</div> : <div className="rounded-2xl border border-dashed border-[#d8d1c5] bg-white/60 p-8 text-center text-sm text-slate-500">아직 기록이 없어요. 위의 버튼으로 첫 경험을 남겨보세요.</div>}
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold">관심사 목표</h2><span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-700">PROTOTYPE</span></div>
        <div className="grid gap-4 lg:grid-cols-3">
          {prototypeGoals.map((goal) => <article key={goal.interest} className="rounded-2xl border border-[#dfd8cc] bg-white p-5"><div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{goal.interest}</span><CircleDashed className="size-4 text-slate-300" /></div><h3 className="mt-4 min-h-12 font-semibold leading-6">{goal.goal}</h3><div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${goal.progress}%`, backgroundColor: goal.color }} /></div><p className="mt-2 text-right text-xs text-slate-400">{goal.progress}%</p></article>)}
        </div>
      </section>
    </main>
  );
}
