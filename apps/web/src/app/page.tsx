import Image from "next/image";
import { ArrowRight, Database, Goal, Layers3, Share2 } from "lucide-react";

import { ExperienceCard } from "@/components/experience-card";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export default function Home() {
  const isSupabaseConfigured = hasSupabaseEnv();

  return (
    <main className="min-h-screen overflow-hidden px-5 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/weave-ive-icon.png"
              alt="Weave:ive symbol"
              width={42}
              height={42}
              priority
            />
            <span className="text-lg font-semibold tracking-tight">Weave:ive</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span
              className={`size-2 rounded-full ${isSupabaseConfigured ? "bg-emerald-400" : "bg-amber-400"}`}
            />
            {isSupabaseConfigured ? "Supabase connected" : "Supabase setup pending"}
          </div>
        </header>

        <section className="grid gap-10 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-28">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-sm text-violet-200">
              <Layers3 className="size-4" /> One DB, multiple views
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.05em] text-balance sm:text-7xl">
              여러 모습의 나를
              <span className="gradient-text block">하나의 경험으로 엮다.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              관심과 목표, 활동과 경험을 계속 쌓고 필요한 순간에 원하는 관점의
              나를 골라 공유하는 제너럴리스트의 개인 아카이브.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5">
                Archive 시작하기 <ArrowRight className="size-4" />
              </button>
              <span className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300">
                Interest → Goal → Activity → Experience
              </span>
            </div>
          </div>

          <ExperienceCard
            title="Folding Birding"
            summary="공간 인터랙션과 웹 기술을 엮어 만든 XR 전시 경험"
            status="Doing"
            period="2026.03 — 현재"
            tags={["XR", "Three.js", "UX", "Exhibition"]}
            details="React 기반 인터페이스, 공간 상호작용 설계, Quest 연동 과정과 전시 피드백을 하나의 경험으로 기록합니다."
          />
        </section>

        <section className="grid gap-4 pb-16 md:grid-cols-3">
          {[
            {
              icon: Goal,
              title: "Direction",
              body: "관심 분야와 목표를 연결해 앞으로 향할 방향을 관리합니다.",
            },
            {
              icon: Database,
              title: "Archive",
              body: "작은 경험도 잃지 않고 관계형 데이터로 차곡차곡 축적합니다.",
            },
            {
              icon: Share2,
              title: "Share",
              body: "하나의 원본을 목적별 관점과 프리셋으로 다시 구성합니다.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            >
              <Icon className="mb-8 size-5 text-violet-300" />
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-2 leading-7 text-slate-400">{body}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
