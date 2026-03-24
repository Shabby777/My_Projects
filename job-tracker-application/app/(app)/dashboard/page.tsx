import Link from "next/link";

import { StatusBadge } from "@/components/status-badge";
import { getDashboardData } from "@/lib/queries";
import { formatDateTime } from "@/lib/utils";

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="surface-card bg-hero-glow p-8">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Executive Hub</p>
          <h2 className="mt-3 font-headline text-4xl font-extrabold tracking-tight text-primary">Strategic visibility across the whole search.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            The dashboard is now driven by stored jobs and interview events, so counts and upcoming
            priorities stay honest as the pipeline changes.
          </p>
        </div>
        <div className="surface-card p-8">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Pipeline Mix</p>
          <div className="mt-6 space-y-4">
            {Object.entries(data.byStatus).map(([status, count]) => (
              <div className="flex items-center justify-between" key={status}>
                <StatusBadge status={status as never} />
                <span className="font-headline text-2xl font-bold text-primary">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Tracked Roles", data.totalApplications],
          ["Active Pipeline", data.activeApplications],
          ["Upcoming Interviews", data.interviews],
          ["Offers", data.offers]
        ].map(([label, value]) => (
          <div className="surface-card p-6" key={String(label)}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{label}</p>
            <p className="mt-3 font-headline text-4xl font-bold text-primary">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-card p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Recent Activity</p>
              <h3 className="mt-2 font-headline text-2xl font-bold text-primary">Applications moving most recently</h3>
            </div>
            <Link className="text-sm font-semibold text-primary" href="/jobs">
              View all jobs
            </Link>
          </div>
          <div className="mt-8 space-y-4">
            {data.recentActivity.map((job) => (
              <Link className="flex items-center justify-between rounded-2xl bg-background px-5 py-4 transition hover:bg-surface-low" href={`/jobs/${job.id}`} key={job.id}>
                <div>
                  <p className="font-headline text-lg font-bold text-primary">{job.title}</p>
                  <p className="mt-1 text-sm text-muted">{job.company}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={job.status} />
                  <p className="mt-2 text-xs text-muted">{formatDateTime(job.updatedAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="surface-card p-8">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Upcoming Agenda</p>
          <h3 className="mt-2 font-headline text-2xl font-bold text-primary">Next strategic steps</h3>
          <div className="mt-8 space-y-4">
            {data.upcoming.length ? (
              data.upcoming.map((event) => (
                <div className="rounded-2xl bg-background p-5" key={event.id}>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{formatDateTime(event.startsAt)}</p>
                  <p className="mt-2 font-headline text-lg font-bold text-primary">{event.title}</p>
                  <p className="mt-1 text-sm text-muted">{event.company} · {event.role}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-background p-6 text-sm text-muted">No future events yet. Add an interview or follow-up from a job detail page.</div>
            )}
          </div>
          <Link className="mt-6 inline-flex text-sm font-semibold text-primary" href="/calendar">
            Open calendar
          </Link>
        </div>
      </section>
    </div>
  );
}