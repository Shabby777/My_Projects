import type { HydratedJob } from "@/lib/store";

import { STATUS_LABELS } from "@/lib/constants";
import { toDateInputValue } from "@/lib/utils";

export function JobForm({
  action,
  job,
  submitLabel
}: {
  action: (formData: FormData) => void;
  job?: Partial<HydratedJob>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="surface-card overflow-hidden">
      <div className="border-b border-slate-100 px-8 py-8">
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Core Opportunity</p>
        <h2 className="mt-2 font-headline text-3xl font-extrabold tracking-tight text-primary">Architect your next move</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Keep each opportunity documented with enough context to make sharp follow-ups, prep well,
          and steer the pipeline intentionally.
        </p>
      </div>

      <div className="grid gap-10 px-8 py-8 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <label className="field-label" htmlFor="title">Job Title</label>
            <input className="ghost-input" defaultValue={job?.title ?? ""} id="title" name="title" />
          </div>
          <div>
            <label className="field-label" htmlFor="company">Company</label>
            <input className="ghost-input" defaultValue={job?.company ?? ""} id="company" name="company" />
          </div>
          <div>
            <label className="field-label" htmlFor="location">Location</label>
            <input className="ghost-input" defaultValue={job?.location ?? ""} id="location" name="location" placeholder="Remote / New York, NY" />
          </div>
          <div>
            <label className="field-label" htmlFor="status">Current Status</label>
            <select className="ghost-input" defaultValue={job?.status ?? "applied"} id="status" name="status">
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="appliedAt">Applied Date</label>
            <input className="ghost-input" defaultValue={toDateInputValue(job?.appliedAt)} id="appliedAt" name="appliedAt" type="date" />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="field-label" htmlFor="sourceUrl">Source URL</label>
            <input className="ghost-input" defaultValue={job?.sourceUrl ?? ""} id="sourceUrl" name="sourceUrl" type="url" />
          </div>
          <div>
            <label className="field-label" htmlFor="compensationText">Compensation Summary</label>
            <input className="ghost-input" defaultValue={job?.compensationText ?? ""} id="compensationText" name="compensationText" placeholder="$160k - $200k + equity" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="salaryMin">Salary Min</label>
              <input className="ghost-input" defaultValue={job?.salaryMin ?? ""} id="salaryMin" name="salaryMin" type="number" />
            </div>
            <div>
              <label className="field-label" htmlFor="salaryMax">Salary Max</label>
              <input className="ghost-input" defaultValue={job?.salaryMax ?? ""} id="salaryMax" name="salaryMax" type="number" />
            </div>
          </div>
          <div>
            <label className="field-label" htmlFor="description">Role Notes / Description</label>
            <textarea className="mt-3 min-h-48 w-full rounded-2xl border border-outline/20 bg-background px-4 py-4 text-sm text-ink outline-none transition focus:border-primary" defaultValue={job?.description ?? ""} id="description" name="description" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-100 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">Required: title, company, status.</p>
        <button className="cta-button" type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}