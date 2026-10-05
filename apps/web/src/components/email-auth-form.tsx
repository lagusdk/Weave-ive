"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, Mail, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

type AuthMode = "sign-in" | "sign-up";

function makeUsername(email: string, userId: string) {
  const emailName = email.split("@")[0];
  const safeName = emailName.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 20);
  const base = safeName.length >= 3 ? safeName : "weaver";
  return `${base}-${userId.slice(0, 6)}`.slice(0, 30);
}

export function EmailAuthForm({ disabled = false }: { disabled?: boolean }) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function ensureProfile(user: { id: string; email?: string; user_metadata: Record<string, unknown> }) {
    const email = user.email ?? "weaver@example.com";
    const metadataName = typeof user.user_metadata.full_name === "string" ? user.user_metadata.full_name : null;
    const displayName = metadataName || email.split("@")[0];
    const supabase = createClient();

    await supabase.from("profiles").upsert(
      {
        id: user.id,
        username: makeUsername(email, user.id),
        display_name: displayName,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setNotice(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const displayName = String(formData.get("displayName") ?? "").trim();
    const supabase = createClient();

    if (mode === "sign-up") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: displayName || email.split("@")[0] },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      if (data.session && data.user) {
        await ensureProfile(data.user);
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      setNotice("가입 확인 메일을 보냈어요. 메일의 링크를 누른 뒤 로그인해주세요.");
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const message = error.message.toLowerCase().includes("email not confirmed")
        ? "이메일 확인이 아직 완료되지 않았어요. 받은 메일의 확인 링크를 먼저 눌러주세요."
        : "이메일 또는 비밀번호를 확인해주세요.";
      setErrorMessage(message);
      setIsLoading(false);
      return;
    }

    if (data.user) await ensureProfile(data.user);
    router.replace("/dashboard");
    router.refresh();
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setErrorMessage(null);
    setNotice(null);
  }

  return (
    <div>
      <div className="grid grid-cols-2 rounded-xl bg-white/5 p-1 text-sm">
        <button
          type="button"
          onClick={() => changeMode("sign-in")}
          className={`rounded-lg px-3 py-2.5 transition ${mode === "sign-in" ? "bg-white font-semibold text-[#17182b]" : "text-slate-400 hover:text-white"}`}
        >
          로그인
        </button>
        <button
          type="button"
          onClick={() => changeMode("sign-up")}
          className={`rounded-lg px-3 py-2.5 transition ${mode === "sign-up" ? "bg-white font-semibold text-[#17182b]" : "text-slate-400 hover:text-white"}`}
        >
          계정 만들기
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {mode === "sign-up" ? (
          <label className="block">
            <span className="text-xs font-medium text-slate-400">표시 이름</span>
            <span className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 focus-within:border-violet-400/60">
              <UserRound className="size-4 text-slate-500" />
              <input name="displayName" autoComplete="name" required className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600" placeholder="Weave:ive에서 사용할 이름" />
            </span>
          </label>
        ) : null}

        <label className="block">
          <span className="text-xs font-medium text-slate-400">이메일</span>
          <span className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 focus-within:border-violet-400/60">
            <Mail className="size-4 text-slate-500" />
            <input name="email" type="email" autoComplete="email" required className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600" placeholder="name@example.com" />
          </span>
        </label>

        <label className="block">
          <span className="text-xs font-medium text-slate-400">비밀번호</span>
          <input
            name="password"
            type="password"
            autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
            required
            minLength={8}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-violet-400/60"
            placeholder="8자 이상 입력"
          />
        </label>

        <button
          disabled={disabled || isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-semibold text-[#17182b] shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? <LoaderCircle className="size-5 animate-spin" /> : null}
          {isLoading ? "처리하는 중..." : mode === "sign-in" ? "이메일로 로그인" : "테스트 계정 만들기"}
          {!isLoading ? <ArrowRight className="size-4" /> : null}
        </button>
      </form>

      {errorMessage ? <p role="alert" className="mt-4 rounded-xl bg-rose-400/10 px-3 py-2.5 text-sm leading-6 text-rose-200">{errorMessage}</p> : null}
      {notice ? <p role="status" className="mt-4 flex gap-2 rounded-xl bg-emerald-400/10 px-3 py-2.5 text-sm leading-6 text-emerald-200"><CheckCircle2 className="mt-0.5 size-4 shrink-0" />{notice}</p> : null}
    </div>
  );
}
