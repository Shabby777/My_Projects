import Link from "next/link";

import { StatusBadge } from "@/components/status-badge";
import { getJobs } from "@/lib/queries";
import { currencyRange, formatShortDate } from "@/lib/utils";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Applications</p>
          <h2 className="mt-2 font-headline text-4xl font-extrabold tracking-tight text-primary">Pipeline board</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Every opportunity is now stored and queryable, so this screen behaves like a real
            pipeline instead of a static concept mock.
          </p>
        </div>
        <Link className="cta-button" href="/jobs/new">
          Add New Job
        </Link>
      </section>

      <section className="space-y-4">
        {jobs.map((job) => (
          <Link className="surface-card block overflow-hidden p-6 transition hover:-translate-y-0.5" href={`/jobs/${job.id}`} key={job.id}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-headline text-2xl font-bold text-primary">{job.title}</p>
                  <StatusBadge status={job.status} />
                </div>
                <p className="mt-2 text-sm text-muted">
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
              </div>

              <div className="grid gap-3 text-sm text-muted md:grid-cols-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Applied</p>
                  <p className="mt-1 font-medium text-ink">{formatShortDate(job.appliedAt)}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Compensation</p>
                  <p className="mt-1 font-medium text-ink">{currencyRange(job.salaryMin, job.salaryMax, job.compensationText)}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Activity</p>
                  <p className="mt-1 font-medium text-ink">{job.events.length} events · {job.notes.length} notes</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}