import type { JobStatus } from "@/lib/types";

import { ensureSeeded } from "@/lib/seed";
import { hydrateJob, readStore } from "@/lib/store";

export async function getUserId() {
  return ensureSeeded();
}

export async function getJobs() {
  const userId = await getUserId();
  const store = await readStore();
  return store.jobs
    .filter((job) => job.userId === userId)
    .map(hydrateJob)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

export async function getJobById(id: string) {
  const userId = await getUserId();
  const store = await readStore();
  const job = store.jobs.find((entry) => entry.id === id && entry.userId === userId);
  return job ? hydrateJob(job) : null;
}

export async function getDashboardData() {
  const jobs = await getJobs();
  const activeStatuses: JobStatus[] = ["wishlist", "applied", "interviewing", "offer"];
  const now = new Date();

  const totalApplications = jobs.length;
  const activeApplications = jobs.filter((job) => activeStatuses.includes(job.status)).length;
  const interviews = jobs.flatMap((job) => job.events.filter((event) => event.type === "interview" && event.startsAt >= now));
  const offers = jobs.filter((job) => job.status === "offer").length;
  const recentActivity = [...jobs].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 5);
  const upcoming = jobs
    .flatMap((job) => job.events.map((event) => ({ ...event, company: job.company, role: job.title })))
    .filter((event) => event.startsAt >= now)
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime())
    .slice(0, 5);

  const byStatus = jobs.reduce<Record<JobStatus, number>>(
    (acc, job) => {
      acc[job.status] += 1;
      return acc;
    },
    { wishlist: 0, applied: 0, interviewing: 0, offer: 0, rejected: 0, archived: 0 }
  );

  return { totalApplications, activeApplications, interviews: interviews.length, offers, byStatus, recentActivity, upcoming };
}

export async function getCalendarData() {
  const jobs = await getJobs();
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const monthEvents = jobs
    .flatMap((job) => job.events.map((event) => ({ ...event, company: job.company, role: job.title })))
    .filter((event) => event.startsAt.getMonth() === month && event.startsAt.getFullYear() === year)
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());

  const todayEvents = monthEvents.filter((event) => event.startsAt.toDateString() === now.toDateString());

  return { monthEvents, todayEvents, now };
}

export function buildCalendarMatrix<T extends { startsAt: Date }>(events: T[], now: Date) {
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const start = new Date(firstOfMonth);
  start.setDate(start.getDate() - start.getDay());

  return Array.from({ length: 35 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    const dayEvents = events.filter((event) => event.startsAt.toDateString() === day.toDateString());
    return {
      date: day,
      inMonth: day.getMonth() === now.getMonth(),
      isToday: day.toDateString() === now.toDateString(),
      events: dayEvents
    };
  });
}