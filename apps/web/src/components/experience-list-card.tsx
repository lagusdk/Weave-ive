import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

import { formatExperiencePeriod, statusLabel, type ExperienceRecord } from "@/lib/experience-model";

const statusStyle = { idea: "bg-cyan-50 text-cyan-700", doing: "bg-amber-50 text-amber-700", done: "bg-emerald-50 text-emerald-700", paused: "bg-slate-100 text-slate-600" };
const statusAccent = { idea: "from-cyan-500 to-sky-400", doing: "from-violet-500 to-fuchsia-400", done: "from-emerald-500 to-lime-400", paused: "from-slate-400 to-slate-300" };

export function ExperienceListCard({ experience }: { experience: ExperienceRecord }) {
  const updatedAt = new Intl.DateTimeFormat("ko-KR", { month: "short", day: "numeric" }).format(new Date(experience.updatedAt));
  return (
    <Link href={`/experiences/${experience.id}`} className="group overflow-hidden rounded-[1.4rem] border border-[#e1dcd3] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#39304f]/10">
      <div className={`h-2 bg-gradient-to-r ${statusAccent[experience.status]}`} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3"><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle[experience.status]}`}>{statusLabel[experience.status]}</span><ArrowUpRight className="size-4 text-slate-300 transition group-hover:text-violet-600" /></div>
        <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">{experience.title}</h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{experience.summary || "아직 요약이 없는 경험이에요."}</p>
        <p className="mt-4 text-xs text-slate-400">{formatExperiencePeriod(experience)}</p>
        <div className="mt-4 flex min-h-6 flex-wrap gap-1.5">{experience.interests.slice(0, 3).map((tag) => <span key={tag} className="rounded-md bg-[#f4f1fa] px-2 py-1 text-[11px] text-[#665b84]">#{tag}</span>)}</div>
        <p className="mt-5 flex items-center gap-1.5 border-t border-slate-100 pt-4 text-xs text-slate-400"><Clock3 className="size-3.5" /> {updatedAt} 업데이트</p>
      </div>
    </Link>
  );
}
