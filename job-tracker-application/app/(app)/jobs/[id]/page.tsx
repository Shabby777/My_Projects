import Link from "next/link";
import { notFound } from "next/navigation";

import { StatusBadge } from "@/components/status-badge";
import { EVENT_LABELS, STATUS_LABELS } from "@/lib/constants";
import { getJobById } from "@/lib/queries";
import { currencyRange, formatDate, formatDateTime, formatTimeRange, toDateTimeInputValue } from "@/lib/utils";

import { deleteEvent, deleteNote, saveEvent, saveNote, updateJobStatus } from "../../actions";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section className="surface-card overflow-hidden">
        <div className="border-l-4 border-accent px-8 py-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={job.status} />
                <p className="text-sm text-muted">Applied {formatDate(job.appliedAt)}</p>
              </div>
              <h2 className="mt-4 font-headline text-4xl font-extrabold tracking-tight text-primary">{job.title}</h2>
              <p className="mt-3 text-lg text-muted">{job.company}{job.location ? ` · ${job.location}` : ""}</p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{job.description || "No role description has been captured yet."}</p>
            </div>

            <div className="flex w-full flex-col gap-3 xl:w-72">
              <form action={updateJobStatus} className="surface-card border border-outline/20 p-4 shadow-none">
                <input name="jobId" type="hidden" value={job.id} />
                <label className="field-label" htmlFor="status">Update Status</label>
                <select className="ghost-input mt-2" defaultValue={job.status} name="status">
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <button className="cta-button mt-4 w-full" type="submit">Save Status</button>
              </form>
              <Link className="rounded-xl border border-outline/30 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-primary" href={`/jobs/${job.id}/edit`}>
                Edit Details
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-background p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Compensation</p>
              <p className="mt-2 font-headline text-2xl font-bold text-primary">{currencyRange(job.salaryMin, job.salaryMax, job.compensationText)}</p>
            </div>
            <div className="rounded-2xl bg-background p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Assets</p>
              <p className="mt-2 text-sm text-muted">
                {job.sourceUrl ? (
                  <a className="font-medium text-primary" href={job.sourceUrl} target="_blank" rel="noreferrer">
                    Open original posting
                  </a>
                ) : (
                  "No source URL yet"
                )}
              </p>
            </div>
            <div className="rounded-2xl bg-background p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Relationship Map</p>
              <p className="mt-2 text-sm text-muted">{job.contacts.length} contacts attached</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="surface-card p-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Strategic Notes</p>
            <h3 className="mt-2 font-headline text-2xl font-bold text-primary">Notes and context</h3>

            <form action={saveNote} className="mt-8 rounded-2xl bg-background p-5">
              <input name="jobId" type="hidden" value={job.id} />
              <div className="grid gap-4 md:grid-cols-[0.4fr_1fr_auto]">
                <input className="ghost-input" name="category" placeholder="Category" />
                <input className="ghost-input" name="content" placeholder="Add a note..." />
                <button className="cta-button" type="submit">Save</button>
              </div>
            </form>

            <div className="mt-6 space-y-4">
              {job.notes.map((note) => (
                <div className="rounded-2xl bg-background p-5" key={note.id}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{note.category || "General"} · {formatDate(note.updatedAt)}</p>
                      <p className="mt-2 text-sm leading-7 text-ink">{note.content}</p>
                    </div>
                    <form action={deleteNote}>
                      <input name="jobId" type="hidden" value={job.id} />
                      <input name="noteId" type="hidden" value={note.id} />
                      <button className="text-xs font-semibold uppercase tracking-[0.16em] text-danger" type="submit">Delete</button>
                    </form>
                  </div>
                  <details className="mt-4">
                    <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.16em] text-primary">Edit Note</summary>
                    <form action={saveNote} className="mt-4 grid gap-4 md:grid-cols-[0.4fr_1fr_auto]">
                      <input name="jobId" type="hidden" value={job.id} />
                      <input name="noteId" type="hidden" value={note.id} />
                      <input className="ghost-input" defaultValue={note.category ?? ""} name="category" />
                      <input className="ghost-input" defaultValue={note.content} name="content" />
                      <button className="cta-button" type="submit">Update</button>
                    </form>
                  </details>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Application Timeline</p>
            <h3 className="mt-2 font-headline text-2xl font-bold text-primary">Interviews and follow-ups</h3>

            <form action={saveEvent} className="mt-8 grid gap-4 rounded-2xl bg-background p-5 lg:grid-cols-2">
              <input name="jobId" type="hidden" value={job.id} />
              <input className="ghost-input" name="title" placeholder="Event title" />
              <select className="ghost-input" defaultValue="interview" name="type">
                {Object.entries(EVENT_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <input className="ghost-input" name="startsAt" type="datetime-local" />
              <input className="ghost-input" name="endsAt" type="datetime-local" />
              <input className="ghost-input lg:col-span-2" name="details" placeholder="Details or agenda" />
              <input className="ghost-input lg:col-span-2" name="linkUrl" placeholder="Meeting or prep link" />
              <button className="cta-button lg:col-span-2" type="submit">Add Event</button>
            </form>

            <div className="mt-6 space-y-4">
              {job.events.map((event) => (
                <div className="rounded-2xl bg-background p-5" key={event.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{EVENT_LABELS[event.type]} · {formatDateTime(event.startsAt)}</p>
                      <p className="mt-2 font-headline text-xl font-bold text-primary">{event.title}</p>
                      <p className="mt-1 text-sm text-muted">{formatTimeRange(event.startsAt, event.endsAt)}</p>
                      {event.details ? <p className="mt-3 text-sm leading-7 text-ink">{event.details}</p> : null}
                      {event.linkUrl ? (
                        <a className="mt-3 inline-flex text-sm font-medium text-primary" href={event.linkUrl} target="_blank" rel="noreferrer">Open link</a>
                      ) : null}
                    </div>
                    <form action={deleteEvent}>
                      <input name="jobId" type="hidden" value={job.id} />
                      <input name="eventId" type="hidden" value={event.id} />
                      <button className="text-xs font-semibold uppercase tracking-[0.16em] text-danger" type="submit">Delete</button>
                    </form>
                  </div>

                  <details className="mt-4">
                    <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.16em] text-primary">Edit Event</summary>
                    <form action={saveEvent} className="mt-4 grid gap-4 lg:grid-cols-2">
                      <input name="jobId" type="hidden" value={job.id} />
                      <input name="eventId" type="hidden" value={event.id} />
                      <input className="ghost-input" defaultValue={event.title} name="title" />
                      <select className="ghost-input" defaultValue={event.type} name="type">
                        {Object.entries(EVENT_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                      <input className="ghost-input" defaultValue={toDateTimeInputValue(event.startsAt)} name="startsAt" type="datetime-local" />
                      <input className="ghost-input" defaultValue={toDateTimeInputValue(event.endsAt)} name="endsAt" type="datetime-local" />
                      <input className="ghost-input lg:col-span-2" defaultValue={event.details ?? ""} name="details" />
                      <input className="ghost-input lg:col-span-2" defaultValue={event.linkUrl ?? ""} name="linkUrl" />
                      <button className="cta-button lg:col-span-2" type="submit">Update Event</button>
                    </form>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Key Contacts</p>
            <h3 className="mt-2 font-headline text-2xl font-bold text-primary">People in the loop</h3>
            <div className="mt-6 space-y-4">
              {job.contacts.length ? (
                job.contacts.map((contact) => (
                  <div className="rounded-2xl bg-background p-5" key={contact.id}>
                    <p className="font-headline text-lg font-bold text-primary">{contact.name}</p>
                    <p className="mt-1 text-sm text-muted">{contact.role || "Contact"}{contact.company ? ` · ${contact.company}` : ""}</p>
                    {contact.email ? <p className="mt-3 text-sm text-ink">{contact.email}</p> : null}
                    {contact.linkedin ? (
                      <a className="mt-3 inline-flex text-sm font-medium text-primary" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn profile</a>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl bg-background p-5 text-sm text-muted">No contacts attached yet.</div>
              )}
            </div>
          </div>

          <div className="surface-card p-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Quick Links</p>
            <h3 className="mt-2 font-headline text-2xl font-bold text-primary">Attached assets</h3>
            <div className="mt-6 rounded-2xl bg-background p-5 text-sm text-muted">
              {job.sourceUrl ? (
                <a className="font-medium text-primary" href={job.sourceUrl} target="_blank" rel="noreferrer">Original job posting</a>
              ) : (
                "Add a source URL from edit mode to keep external context close."
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}