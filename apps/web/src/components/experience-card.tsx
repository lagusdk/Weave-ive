"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type ExperienceCardProps = {
  title: string;
  summary: string;
  status: "Idea" | "Doing" | "Done";
  period: string;
  tags: string[];
  details: string;
};

export function ExperienceCard({
  title,
  summary,
  status,
  period,
  tags,
  details,
}: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#111326]/90 p-6 shadow-2xl shadow-violet-950/30 sm:p-8">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
            {status}
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-2 leading-7 text-slate-300">{summary}</p>
        </div>
        <span className="whitespace-nowrap text-xs text-slate-500">{period}</span>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="mt-8 flex w-full items-center justify-between border-t border-white/10 pt-5 text-left text-sm font-medium text-slate-200"
      >
        경험 자세히 보기
        <ChevronDown
          className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? <p className="mt-4 leading-7 text-slate-400">{details}</p> : null}
    </article>
  );
}
