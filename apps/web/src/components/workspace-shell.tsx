"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  ChevronRight,
  Goal,
  Home,
  Layers3,
  LogOut,
  Plus,
  Sparkles,
} from "lucide-react";

import { signOut } from "@/app/(workspace)/actions";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/archive", label: "Archive", icon: Archive },
  { href: "/goals", label: "Goals", icon: Goal },
  { href: "/presets", label: "Share presets", icon: Layers3 },
];

type WorkspaceShellProps = {
  children: React.ReactNode;
  user: { displayName: string; email: string };
};

export function WorkspaceShell({ children, user }: WorkspaceShellProps) {
  const pathname = usePathname();
  const initial = user.displayName.slice(0, 1).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f5f1e9] text-[#1c1d31] lg:grid lg:grid-cols-[272px_1fr]">
      <aside className="hidden min-h-screen flex-col bg-[#17182b] px-5 py-6 text-white lg:sticky lg:top-0 lg:flex lg:h-screen">
        <Link href="/dashboard" className="flex items-center gap-3 px-2">
          <Image src="/brand/weave-ive-icon.png" alt="" width={42} height={42} />
          <div>
            <p className="font-semibold tracking-tight">Weave:ive</p>
            <p className="text-xs text-violet-200/60">personal archive</p>
          </div>
        </Link>

        <Link
          href="/experiences/new"
          className="mt-8 flex items-center justify-between rounded-2xl bg-[#8b75ff] px-4 py-3.5 text-sm font-semibold shadow-lg shadow-violet-950/30 transition hover:bg-[#9b88ff]"
        >
          새 경험 기록하기 <Plus className="size-4" />
        </Link>

        <nav className="mt-8 space-y-1" aria-label="주요 메뉴">
          {navigation.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  isActive
                    ? "bg-white/10 font-medium text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="size-[18px]" /> {label}
                {isActive ? <ChevronRight className="ml-auto size-4" /> : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-rose-400 text-sm font-bold">
              {initial}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.displayName}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
          </div>
          <form action={signOut}>
            <button className="mt-3 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-400 hover:bg-white/5 hover:text-white">
              <LogOut className="size-3.5" /> 로그아웃
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 pb-24 lg:pb-0">
        <header className="flex items-center justify-between border-b border-[#ded8cd] bg-[#f5f1e9]/90 px-5 py-4 backdrop-blur lg:hidden">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Image src="/brand/weave-ive-icon.png" alt="" width={34} height={34} />
            Weave:ive
          </Link>
          <Link href="/experiences/new" className="grid size-10 place-items-center rounded-full bg-[#17182b] text-white">
            <Plus className="size-5" />
          </Link>
        </header>

        <div className="mx-auto w-full max-w-[1320px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
            <Sparkles className="size-3.5" /> UI prototype · sample data
          </div>
          {children}
        </div>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-2xl border border-white/10 bg-[#17182b]/95 p-2 text-white shadow-2xl backdrop-blur lg:hidden">
        {navigation.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link key={href} href={href} className={`flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] ${isActive ? "bg-white/10 text-white" : "text-slate-500"}`}>
              <Icon className="size-4" /> {label.split(" ")[0]}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
