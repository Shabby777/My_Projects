import { EVENT_LABELS } from "@/lib/constants";
import { buildCalendarMatrix, getCalendarData } from "@/lib/queries";
import { formatDateTime, formatTimeRange } from "@/lib/utils";

export default async function CalendarPage() {
  const { monthEvents, todayEvents, now } = await getCalendarData();
  const matrix = buildCalendarMatrix(monthEvents, now);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <section className="surface-card overflow-hidden">
        <div className="border-b border-slate-100 px-8 py-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Interview Calendar</p>
          <h2 className="mt-2 font-headline text-3xl font-extrabold tracking-tight text-primary">
            {new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(now)}
          </h2>
        </div>

        <div className="grid grid-cols-7 border-b border-slate-100 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {matrix.map((cell) => (
            <div className={`min-h-36 border-b border-r border-slate-100 p-3 ${cell.inMonth ? "bg-white" : "bg-background/70 text-slate-400"} ${cell.isToday ? "bg-primary/5" : ""}`} key={cell.date.toISOString()}>
              <p className={`text-sm font-semibold ${cell.isToday ? "text-primary" : ""}`}>{cell.date.getDate()}</p>
              <div className="mt-3 space-y-2">
                {cell.events.map((event) => (
                  <div className="rounded-lg bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary" key={event.id}>
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="space-y-6">
        <div className="surface-card p-8">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Today</p>
          <h3 className="mt-2 font-headline text-2xl font-bold text-primary">Schedule for now</h3>
          <div className="mt-6 space-y-4">
            {todayEvents.length ? (
              todayEvents.map((event) => (
                <div className="rounded-2xl bg-background p-5" key={event.id}>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{EVENT_LABELS[event.type]}</p>
                  <p className="mt-2 font-headline text-lg font-bold text-primary">{event.title}</p>
                  <p className="mt-1 text-sm text-muted">{formatTimeRange(event.startsAt, event.endsAt)}</p>
                  <p className="mt-2 text-sm text-ink">{event.company}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-background p-5 text-sm text-muted">No events scheduled today.</div>
            )}
          </div>
        </div>

        <div className="surface-card p-8">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Month Agenda</p>
          <h3 className="mt-2 font-headline text-2xl font-bold text-primary">Upcoming milestones</h3>
          <div className="mt-6 space-y-4">
            {monthEvents.map((event) => (
              <div className="rounded-2xl bg-background p-5" key={event.id}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{EVENT_LABELS[event.type]} · {formatDateTime(event.startsAt)}</p>
                <p className="mt-2 font-headline text-lg font-bold text-primary">{event.title}</p>
                <p className="mt-1 text-sm text-muted">{event.company} · {event.role}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}