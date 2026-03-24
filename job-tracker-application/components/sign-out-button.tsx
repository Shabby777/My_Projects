"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      className="rounded-xl border border-outline/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted transition hover:border-primary hover:text-primary"
      onClick={() => signOut({ callbackUrl: "/sign-in" })}
      type="button"
    >
      Sign Out
    </button>
  );
}