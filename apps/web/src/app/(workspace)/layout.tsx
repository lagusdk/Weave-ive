import { redirect } from "next/navigation";

import { WorkspaceShell } from "@/components/workspace-shell";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  if (!hasSupabaseEnv()) redirect("/login");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <WorkspaceShell
      user={{
        displayName: user.user_metadata.full_name ?? user.user_metadata.name ?? user.email?.split("@")[0] ?? "Weaver",
        email: user.email ?? "Google account",
      }}
    >
      {children}
    </WorkspaceShell>
  );
}
