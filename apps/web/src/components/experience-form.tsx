"use client";

import Link from "next/link";
import { useActionState } from "react";
import { BookOpenText, CalendarDays, Check, LoaderCircle, Tags } from "lucide-react";

import type { ExperienceActionState } from "@/app/(workspace)/experiences/actions";
import type { ExperienceRecord } from "@/lib/experience-model";

const initialState: ExperienceActionState = { error: null };

type ExperienceFormProps = {
  action: (state: ExperienceActionState, formData: FormData) => Promise<ExperienceActionState>;
  experience?: ExperienceRecord;
};

export function ExperienceForm({ action, experience }: ExperienceFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const isEditing = Boolean(experience);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <section className="rounded-[1.6rem] border border-[#ded7cc] bg-white p-6 sm:p-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Title</label>
        <input name="title" required minLength={2} maxLength={100} defaultValue={experience?.title} className="mt-3 w-full border-none bg-transparent text-3xl font-semibold tracking-[-0.04em] outline-none placeholder:text-slate-300" placeholder="어떤 경험을 남길까요?" />
        <textarea name="summary" maxLength={500} defaultValue={experience?.summary} className="mt-5 min-h-24 w-full resize-none rounded-2xl bg-[#f8f6f2] p-4 text-sm leading-7 outline-none placeholder:text-slate-400" placeholder="무엇을 했고, 왜 기억하고 싶은지 짧게 적어보세요." />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-medium text-slate-500">상태<select name="status" defaultValue={experience?.status ?? "doing"} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800"><option value="idea">Idea</option><option value="doing">Doing</option><option value="done">Done</option><option value="paused">Paused</option></select></label>
          <label className="text-xs font-medium text-slate-500"><span className="flex items-center gap-1.5"><Tags className="size-3.5" /> 관심 분야</span><input name="interests" defaultValue={experience?.interests.join(", ")} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none" placeholder="XR, Web, Research" /></label>
          <label className="text-xs font-medium text-slate-500"><span className="flex items-center gap-1.5"><CalendarDays className="size-3.5" /> 시작일</span><input name="startedOn" type="date" defaultValue={experience?.startedOn ?? ""} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none" /></label>
          <label className="text-xs font-medium text-slate-500"><span className="flex items-center gap-1.5"><CalendarDays className="size-3.5" /> 종료일</span><input name="endedOn" type="date" defaultValue={experience?.endedOn ?? ""} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none" /></label>
        </div>
      </section>
      <section className="rounded-[1.6rem] border border-[#ded7cc] bg-[#fffaf2] p-6 sm:p-8">
        <div className="flex items-center gap-2"><BookOpenText className="size-5 text-violet-600" /><h2 className="font-semibold">지금 남기고 싶은 회고</h2></div>
        <p className="mt-2 text-xs text-slate-400">완성된 글이 아니어도 괜찮아요. 현재의 생각을 그대로 적어두세요.</p>
        <textarea name="reflection" maxLength={5000} defaultValue={experience?.reflection} className="mt-5 min-h-48 w-full resize-y rounded-2xl border border-[#e2dacf] bg-white p-4 text-sm leading-7 outline-none placeholder:text-slate-400 focus:border-violet-300" placeholder="어떤 선택을 했고, 무엇을 배웠나요? 다음에는 무엇을 해보고 싶나요?" />
      </section>
      {state.error ? <p role="alert" className="rounded-xl bg-rose-100 px-4 py-3 text-sm leading-6 text-rose-800">{state.error}</p> : null}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link href={experience ? `/experiences/${experience.id}` : "/archive"} className="rounded-2xl border border-[#d8d1c5] bg-white px-5 py-4 text-center text-sm font-semibold text-slate-600">취소</Link>
        <button disabled={isPending} className="flex items-center justify-center gap-2 rounded-2xl bg-[#17182b] px-6 py-4 font-semibold text-white disabled:opacity-60">{isPending ? <LoaderCircle className="size-4 animate-spin" /> : <Check className="size-4" />}{isPending ? "저장하는 중..." : isEditing ? "수정 내용 저장" : "경험 저장하기"}</button>
      </div>
    </form>
  );
}
