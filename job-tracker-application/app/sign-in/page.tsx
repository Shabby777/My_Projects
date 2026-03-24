"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { DEMO_USER } from "@/lib/constants";

export default function SignInPage() {
  const [email, setEmail] = useState(DEMO_USER.email);
  const [password, setPassword] = useState(DEMO_USER.password);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard"
    });

    setPending(false);

    if (result?.error) {
      setError("The demo credentials were rejected.");
      return;
    }

    window.location.href = result?.url ?? "/dashboard";
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-ambient lg:grid-cols-[1.1fr_0.9fr]">
        <section className="bg-cta-gradient px-10 py-12 text-white">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">Career Architect</p>
          <h1 className="mt-4 font-headline text-5xl font-extrabold tracking-tight">Curate your next chapter with intention.</h1>
          <p className="mt-6 max-w-lg text-base text-white/80">
            This MVP turns the editorial prototypes into a real workspace for tracking applications,
            interviews, notes, and next steps in one place.
          </p>
          <div className="mt-10 rounded-3xl bg-white/10 p-6 backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Demo Access</p>
            <p className="mt-3 font-medium">{DEMO_USER.email}</p>
            <p className="mt-1 text-sm text-white/75">{DEMO_USER.password}</p>
          </div>
        </section>

        <section className="px-10 py-12">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Sign In</p>
          <h2 className="mt-3 font-headline text-3xl font-extrabold tracking-tight text-primary">Enter the executive workspace</h2>

          <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
            <div>
              <label className="field-label" htmlFor="email">Email</label>
              <input className="ghost-input" id="email" onChange={(event) => setEmail(event.target.value)} type="email" value={email} />
            </div>

            <div>
              <label className="field-label" htmlFor="password">Password</label>
              <input className="ghost-input" id="password" onChange={(event) => setPassword(event.target.value)} type="password" value={password} />
            </div>

            {error ? <p className="text-sm text-danger">{error}</p> : null}

            <button className="cta-button w-full" disabled={pending} type="submit">
              {pending ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}