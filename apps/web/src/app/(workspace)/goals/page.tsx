import { ArrowRight, Plus } from "lucide-react";

import { prototypeGoals } from "@/lib/mock-data";

export const metadata = { title: "Goals" };

export default function GoalsPage() {
  return (
    <main>
      <div className="flex items-end justify-between gap-4">
        <div><p className="text-sm font-medium text-[#7b6aa5]">Interest → Goal → Activity</p><h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em]">나아갈 방향</h1></div>
        <button className="hidden items-center gap-2 rounded-xl bg-[#17182b] px-4 py-3 text-sm font-semibold text-white sm:flex"><Plus className="size-4" /> 목표 추가</button>
      </div>
      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {prototypeGoals.map((goal, index) => (
          <article key={goal.interest} className="relative overflow-hidden rounded-[1.6rem] border border-[#ded7cc] bg-white p-6">
            <span className="absolute right-5 top-5 text-6xl font-black text-slate-50">0{index + 1}</span>
            <span className="relative inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: goal.color }}>{goal.interest}</span>
            <h2 className="relative mt-8 min-h-16 text-xl font-semibold leading-8">{goal.goal}</h2>
            <div className="mt-7 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${goal.progress}%`, backgroundColor: goal.color }} /></div>
            <div className="mt-3 flex justify-between text-xs text-slate-400"><span>진행 중</span><span>{goal.progress}%</span></div>
            <button className="mt-8 flex w-full items-center justify-between border-t border-slate-100 pt-5 text-sm font-medium">연결된 활동 보기 <ArrowRight className="size-4" /></button>
          </article>
        ))}
      </section>
    </main>
  );
}
