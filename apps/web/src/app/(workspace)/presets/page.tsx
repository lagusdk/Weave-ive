import Link from "next/link";
import { ExternalLink, Eye, EyeOff, Plus } from "lucide-react";

import { prototypePresets } from "@/lib/mock-data";

export const metadata = { title: "Share presets" };

export default function PresetsPage() {
  return (
    <main>
      <div className="flex items-end justify-between gap-4">
        <div><p className="text-sm font-medium text-[#7b6aa5]">One DB, multiple views</p><h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em]">Share presets</h1><p className="mt-3 text-slate-500">같은 경험을 목적에 맞는 서로 다른 모습으로 보여주세요.</p></div>
        <button className="hidden items-center gap-2 rounded-xl bg-[#17182b] px-4 py-3 text-sm font-semibold text-white sm:flex"><Plus className="size-4" /> 새 프리셋</button>
      </div>
      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {prototypePresets.map((preset, index) => (
          <article key={preset.name} className="rounded-[1.6rem] border border-[#ded7cc] bg-white p-6">
            <div className="flex items-center justify-between">
              <span className={`grid size-11 place-items-center rounded-2xl ${["bg-violet-100 text-violet-700", "bg-orange-100 text-orange-700", "bg-cyan-100 text-cyan-700"][index]}`}>{preset.published ? <Eye className="size-5" /> : <EyeOff className="size-5" />}</span>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${preset.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{preset.published ? "Published" : "Draft"}</span>
            </div>
            <h2 className="mt-7 text-xl font-semibold">{preset.name}</h2>
            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{preset.description}</p>
            <p className="mt-6 text-xs text-slate-400">{preset.count} experiences selected</p>
            {index === 1 ? <Link href="/share/demo/frontend" className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-medium text-violet-700">공개 화면 미리보기 <ExternalLink className="size-4" /></Link> : <button className="mt-5 flex w-full items-center justify-between border-t border-slate-100 pt-5 text-sm font-medium">프리셋 편집 <span>→</span></button>}
          </article>
        ))}
      </section>
    </main>
  );
}
