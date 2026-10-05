import Link from "next/link";
import { Plus, Search } from "lucide-react";

import { ExperienceListCard } from "@/components/experience-list-card";
import {
  EXPERIENCE_SELECT,
  type ExperienceQueryRow,
  type ExperienceStatus,
  toExperienceRecord,
} from "@/lib/experience-model";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Archive" };

const filters: { value: "all" | ExperienceStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "doing", label: "Doing" },
  { value: "idea", label: "Idea" },
  { value: "done", label: "Done" },
  { value: "paused", label: "Paused" },
];

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "all" } = await searchParams;
  const selectedStatus = filters.some((filter) => filter.value === status) ? status : "all";
  const supabase = await createClient();

  let query = supabase.from("experiences").select(EXPERIENCE_SELECT).order("updated_at", { ascending: false });
  if (selectedStatus !== "all") query = query.eq("status", selectedStatus);
  if (q.trim()) query = query.ilike("title", `%${q.trim()}%`);

  const { data, error } = await query;
  const experiences = ((data ?? []) as unknown as ExperienceQueryRow[]).map(toExperienceRecord);

  return (
    <main>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#7b6aa5]">Experience database</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em]">Archive</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-500">완성된 결과뿐 아니라 진행 중인 생각과 작은 경험까지, 나중의 내가 다시 찾을 수 있도록 모아두는 공간.</p>
        </div>
        <Link href="/experiences/new" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#17182b] px-5 py-3.5 text-sm font-semibold text-white">
          <Plus className="size-4" /> 새 경험 기록
        </Link>
      </div>

      <form className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-2xl border border-[#ddd6ca] bg-white px-4 py-3 text-slate-400">
          <Search className="size-4" />
          <input name="q" defaultValue={q} className="w-full bg-transparent text-sm text-slate-700 outline-none" placeholder="경험 제목을 검색해보세요" />
        </label>
        {selectedStatus !== "all" ? <input type="hidden" name="status" value={selectedStatus} /> : null}
        <button className="rounded-2xl border border-[#ddd6ca] bg-white px-5 py-3 text-sm font-medium">검색</button>
      </form>

      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const params = new URLSearchParams();
          if (q) params.set("q", q);
          if (filter.value !== "all") params.set("status", filter.value);
          const href = params.size ? `/archive?${params.toString()}` : "/archive";
          return (
            <Link key={filter.value} href={href} className={`rounded-full px-3 py-1.5 text-xs font-medium ${selectedStatus === filter.value ? "bg-[#17182b] text-white" : "border border-[#ddd6ca] bg-white text-slate-500"}`}>
              {filter.label}
            </Link>
          );
        })}
      </div>

      {error ? (
        <p role="alert" className="mt-8 rounded-2xl bg-rose-100 px-5 py-4 text-sm text-rose-800">기록을 불러오지 못했어요: {error.message}</p>
      ) : experiences.length > 0 ? (
        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {experiences.map((experience) => <ExperienceListCard key={experience.id} experience={experience} />)}
        </section>
      ) : (
        <section className="mt-8 rounded-[1.6rem] border border-dashed border-[#d8d1c5] bg-white/60 px-6 py-14 text-center">
          <h2 className="text-lg font-semibold">아직 조건에 맞는 경험이 없어요.</h2>
          <p className="mt-2 text-sm text-slate-500">첫 경험을 기록하거나 검색 조건을 바꿔보세요.</p>
          <Link href="/experiences/new" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#17182b] px-4 py-3 text-sm font-semibold text-white"><Plus className="size-4" /> 경험 기록하기</Link>
        </section>
      )}
    </main>
  );
}
