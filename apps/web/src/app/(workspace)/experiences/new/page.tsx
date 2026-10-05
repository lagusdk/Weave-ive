"use client";

import { useState } from "react";
import { Check, ImagePlus, Link2, Plus, Type } from "lucide-react";

export default function NewExperiencePage() {
  const [saved, setSaved] = useState(false);

  return (
    <main className="mx-auto max-w-4xl">
      <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-medium text-[#7b6aa5]">New experience</p><h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em]">경험 기록하기</h1></div><span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700">Prototype only</span></div>
      <form onSubmit={(event) => { event.preventDefault(); setSaved(true); }} className="mt-8 space-y-5">
        <section className="rounded-[1.6rem] border border-[#ded7cc] bg-white p-6 sm:p-8">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Title</label>
          <input required className="mt-3 w-full border-none bg-transparent text-3xl font-semibold tracking-[-0.04em] outline-none placeholder:text-slate-300" placeholder="어떤 경험을 남길까요?" />
          <textarea className="mt-5 min-h-24 w-full resize-none rounded-2xl bg-[#f8f6f2] p-4 text-sm leading-7 outline-none placeholder:text-slate-400" placeholder="무엇을 했고, 왜 기억하고 싶은지 짧게 적어보세요." />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-medium text-slate-500">상태<select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800"><option>Doing</option><option>Idea</option><option>Done</option><option>Paused</option></select></label>
            <label className="text-xs font-medium text-slate-500">관심 분야<input className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none" placeholder="XR, Web, Research" /></label>
          </div>
        </section>
        <section className="rounded-[1.6rem] border border-dashed border-[#cfc5b6] bg-[#fffaf2] p-6 sm:p-8">
          <div className="flex items-center justify-between"><div><h2 className="font-semibold">경험 블록</h2><p className="mt-1 text-xs text-slate-400">기록 방식은 이후 자유롭게 추가할 수 있어요.</p></div><Plus className="size-5 text-slate-400" /></div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[{ icon: Type, label: "Text" }, { icon: ImagePlus, label: "Image" }, { icon: Link2, label: "Link" }].map(({ icon: Icon, label }) => <button type="button" key={label} className="flex flex-col items-center gap-2 rounded-xl border border-[#e2dacf] bg-white px-3 py-4 text-xs font-medium text-slate-500 hover:border-violet-300 hover:text-violet-700"><Icon className="size-5" />{label}</button>)}
          </div>
        </section>
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#17182b] px-5 py-4 font-semibold text-white"><Check className="size-4" /> 프로토타입 기록 확인</button>
        {saved ? <p className="rounded-xl bg-emerald-100 px-4 py-3 text-center text-sm text-emerald-800">화면 동작을 확인했어요. 다음 단계에서 Supabase 저장을 연결할 예정입니다.</p> : null}
      </form>
    </main>
  );
}
