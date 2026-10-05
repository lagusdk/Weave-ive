import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <section className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-sm text-rose-300">Login error</p>
        <h1 className="mt-3 text-3xl font-semibold">로그인을 완료하지 못했어요.</h1>
        <p className="mt-3 leading-7 text-slate-400">Google 또는 Supabase의 Redirect URL 설정을 확인한 뒤 다시 시도해주세요.</p>
        <Link href="/login" className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-slate-950">로그인으로 돌아가기</Link>
      </section>
    </main>
  );
}
