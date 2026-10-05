import { Filter, Search } from "lucide-react";

import { PrototypeExperienceTile } from "@/components/prototype-experience-tile";
import { prototypeExperiences } from "@/lib/mock-data";

export const metadata = { title: "Archive" };

export default function ArchivePage() {
  return (
    <main>
      <p className="text-sm font-medium text-[#7b6aa5]">Experience database</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em]">Archive</h1>
      <p className="mt-3 max-w-2xl leading-7 text-slate-500">완성된 결과뿐 아니라 진행 중인 생각과 작은 경험까지, 나중의 내가 다시 찾을 수 있도록 모아두는 공간.</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-2xl border border-[#ddd6ca] bg-white px-4 py-3 text-slate-400">
          <Search className="size-4" /><input className="w-full bg-transparent text-sm text-slate-700 outline-none" placeholder="경험, 기술, 관심사를 검색해보세요" />
        </label>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#ddd6ca] bg-white px-5 py-3 text-sm font-medium"><Filter className="size-4" /> 필터</button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {["All  3", "Doing  2", "Idea  1", "Done  0"].map((item, index) => <button key={item} className={`rounded-full px-3 py-1.5 text-xs font-medium ${index === 0 ? "bg-[#17182b] text-white" : "border border-[#ddd6ca] bg-white text-slate-500"}`}>{item}</button>)}
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {prototypeExperiences.map((experience) => <PrototypeExperienceTile key={experience.id} experience={experience} />)}
      </section>
    </main>
  );
}
