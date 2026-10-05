import { ExperienceForm } from "@/components/experience-form";

import { createExperience } from "../actions";

export const metadata = { title: "새 경험 기록" };

export default function NewExperiencePage() {
  return (
    <main className="mx-auto max-w-4xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#7b6aa5]">New experience</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em]">경험 기록하기</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">지금 남긴 기록은 나만의 Supabase 아카이브에 안전하게 저장돼요.</p>
        </div>
      </div>
      <ExperienceForm action={createExperience} />
    </main>
  );
}
