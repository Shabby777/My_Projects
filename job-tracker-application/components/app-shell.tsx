import Link from "next/link";
import { getServerSession } from "next-auth";

import { SignOutButton } from "@/components/sign-out-button";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/jobs", label: "Applications" },
  { href: "/calendar", label: "Calendar" }
];

export async function AppShell({ children, pathname }: { children: React.ReactNode; pathname: string }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-white/60 bg-white/70 px-5 py-6 backdrop-blur md:flex">
        <div className="mb-10 px-3">
          <p className="font-headline text-2xl font-extrabold tracking-tight text-primary">Career Architect</p>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted">Executive Workspace</p>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                className={cn(
                  "block rounded-2xl px-4 py-3 text-sm font-medium transition",
                  active ? "bg-primary text-white shadow-ambient" : "text-muted hover:bg-background hover:text-primary"
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-3xl bg-cta-gradient p-5 text-white shadow-ambient">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Quick Action</p>
          <h3 className="mt-2 font-headline text-xl font-bold">Add a new opportunity</h3>
          <p className="mt-2 text-sm text-white/80">
            Keep the pipeline current so the dashboard and calendar stay useful.
          </p>
          <Link className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary" href="/jobs/new">
            New Job
          </Link>
        </div>

        <div className="mt-auto rounded-2xl bg-surface-low p-4">
          <p className="font-medium text-ink">{session?.user?.name ?? "Senior Architect"}</p>
          <p className="mt-1 text-sm text-muted">{session?.user?.email}</p>
        </div>
      </aside>

      <div className="md:ml-72">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/60 bg-white/70 px-5 py-4 backdrop-blur">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Career Architect</p>
            <h1 className="font-headline text-2xl font-bold text-primary">Professional trajectory, curated.</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link className="cta-button hidden sm:inline-flex" href="/jobs/new">
              Add Job
            </Link>
            <SignOutButton />
          </div>
        </header>
        <main className="px-5 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}