import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, LockKeyhole, Sparkles } from "lucide-react";

import { EmailAuthForm } from "@/components/email-auth-form";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "로그인" };

export default async function LoginPage() {
  const isConfigured = hasSupabaseEnv();

  if (isConfigured) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) redirect("/dashboard");
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-12">
      <div className="absolute left-[8%] top-[12%] size-52 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute bottom-[8%] right-[8%] size-56 rounded-full bg-rose-500/15 blur-3xl" />
      <section className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-[#121426]/85 p-7 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-9">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="size-4" /> 홈으로
        </Link>
        <div className="mt-8 flex items-center gap-3">
          <Image src="/brand/weave-ive-icon.png" alt="Weave:ive" width={52} height={52} priority />
          <div>
            <p className="text-xl font-semibold">Weave:ive</p>
            <p className="text-xs text-violet-200/60">your experience archive</p>
          </div>
        </div>
        <h1 className="mt-9 text-3xl font-semibold tracking-[-0.04em]">다시, 나의 경험으로.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">별도 서비스 설정 없이 이메일 계정 하나로 프로토타입을 시작해보세요.</p>
        <div className="mt-8">
          <EmailAuthForm disabled={!isConfigured} />
        </div>
        {!isConfigured ? (
          <p className="mt-4 rounded-xl bg-amber-300/10 px-3 py-2 text-xs leading-5 text-amber-200">Supabase 환경변수를 먼저 설정해야 로그인을 사용할 수 있어요.</p>
        ) : null}
        <div className="mt-7 grid grid-cols-2 gap-2 text-xs text-slate-500">
          <p className="flex items-center gap-1.5"><LockKeyhole className="size-3.5" /> 비공개 기록 보호</p>
          <p className="flex items-center justify-end gap-1.5"><Sparkles className="size-3.5" /> Prototype access</p>
        </div>
      </section>
    </main>
  );
}
