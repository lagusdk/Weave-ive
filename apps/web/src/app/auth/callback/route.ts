import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

function makeUsername(email: string | undefined, userId: string) {
  const emailName = email?.split("@")[0] ?? "weaver";
  const safeName = emailName.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 20);
  const base = safeName.length >= 3 ? safeName : "weaver";
  return `${base}-${userId.slice(0, 6)}`.slice(0, 30);
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const requestedPath = searchParams.get("next") ?? "/dashboard";
  const nextPath = requestedPath.startsWith("/") && !requestedPath.startsWith("//") ? requestedPath : "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").upsert(
          {
            id: user.id,
            username: makeUsername(user.email, user.id),
            display_name: user.user_metadata.full_name ?? user.user_metadata.name ?? user.email?.split("@")[0] ?? "Weaver",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" },
        );
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const destination = process.env.NODE_ENV === "development" || !forwardedHost
        ? `${origin}${nextPath}`
        : `https://${forwardedHost}${nextPath}`;

      return NextResponse.redirect(destination);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
