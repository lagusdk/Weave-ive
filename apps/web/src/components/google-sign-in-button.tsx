"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export function GoogleSignInButton({ disabled = false }: { disabled?: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function signInWithGoogle() {
    setIsLoading(true);
    setErrorMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={disabled || isLoading}
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3.5 font-semibold text-[#17182b] shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <LoaderCircle className="size-5 animate-spin" />
        ) : (
          <span className="grid size-6 place-items-center rounded-full bg-white text-lg font-bold text-[#4285f4] shadow-sm ring-1 ring-slate-200">
            G
          </span>
        )}
        {isLoading ? "Google로 이동하는 중..." : "Google로 계속하기"}
      </button>
      {errorMessage ? (
        <p role="alert" className="mt-3 text-sm leading-6 text-rose-300">
          로그인을 시작하지 못했어요: {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
