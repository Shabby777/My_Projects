"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getUserId } from "@/lib/queries";
import { createId, readStore, writeStore } from "@/lib/store";
import { parseEventForm, parseJobForm, parseNoteForm } from "@/lib/validation";

export async function createJob(formData: FormData) {
  const userId = await getUserId();
  const values = parseJobForm(formData);
  const store = await readStore();
  const stamp = new Date().toISOString();
  const jobId = createId();

  store.jobs.push({
    id: jobId,
    userId,
    title: values.title,
    company: values.company,
    location: values.location || undefined,
    status: values.status,
    sourceUrl: values.sourceUrl || undefined,
    description: values.description || undefined,
    compensationText: values.compensationText || undefined,
    salaryMin: values.salaryMin,
    salaryMax: values.salaryMax,
    appliedAt: values.appliedAt?.toISOString(),
    createdAt: stamp,
    updatedAt: stamp,
    notes: [],
    events: [],
    contacts: []
  });

  await writeStore(store);
  revalidatePath("/dashboard");
  revalidatePath("/jobs");
  revalidatePath("/calendar");
  redirect(`/jobs/${jobId}`);
}

export async function updateJob(jobId: string, formData: FormData) {
  const values = parseJobForm(formData);
  const store = await readStore();
  const job = store.jobs.find((entry) => entry.id === jobId);

  if (!job) {
    redirect("/jobs");
  }

  job.title = values.title;
  job.company = values.company;
  job.location = values.location || undefined;
  job.status = values.status;
  job.sourceUrl = values.sourceUrl || undefined;
  job.description = values.description || undefined;
  job.compensationText = values.compensationText || undefined;
  job.salaryMin = values.salaryMin;
  job.salaryMax = values.salaryMax;
  job.appliedAt = values.appliedAt?.toISOString();
  job.updatedAt = new Date().toISOString();

  await writeStore(store);
  revalidatePath("/dashboard");
  revalidatePath("/jobs");
  revalidatePath(`/jobs/${jobId}`);
  revalidatePath(`/jobs/${jobId}/edit`);
  revalidatePath("/calendar");
  redirect(`/jobs/${jobId}`);
}

export async function updateJobStatus(formData: FormData) {
  const jobId = String(formData.get("jobId"));
  const status = String(formData.get("status"));
  const store = await readStore();
  const job = store.jobs.find((entry) => entry.id === jobId);

  if (!job) return;

  job.status = status as typeof job.status;
  job.updatedAt = new Date().toISOString();
  await writeStore(store);
  revalidatePath("/dashboard");
  revalidatePath("/jobs");
  revalidatePath(`/jobs/${jobId}`);
}

export async function saveNote(formData: FormData) {
  const values = parseNoteForm(formData);
  const store = await readStore();
  const job = store.jobs.find((entry) => entry.id === values.jobId);

  if (!job) return;

  if (values.noteId) {
    const note = job.notes.find((entry) => entry.id === values.noteId);
    if (!note) return;
    note.category = values.category || undefined;
    note.content = values.content;
    note.updatedAt = new Date().toISOString();
  } else {
    const stamp = new Date().toISOString();
    job.notes.unshift({
      id: createId(),
      category: values.category || undefined,
      content: values.content,
      createdAt: stamp,
      updatedAt: stamp
    });
  }

  job.updatedAt = new Date().toISOString();
  await writeStore(store);
  revalidatePath(`/jobs/${values.jobId}`);
  revalidatePath("/dashboard");
}

export async function deleteNote(formData: FormData) {
  const noteId = String(formData.get("noteId"));
  const jobId = String(formData.get("jobId"));
  const store = await readStore();
  const job = store.jobs.find((entry) => entry.id === jobId);

  if (!job) return;

  job.notes = job.notes.filter((note) => note.id !== noteId);
  job.updatedAt = new Date().toISOString();
  await writeStore(store);
  revalidatePath(`/jobs/${jobId}`);
}

export async function saveEvent(formData: FormData) {
  const values = parseEventForm(formData);
  const store = await readStore();
  const job = store.jobs.find((entry) => entry.id === values.jobId);

  if (!job) return;

  if (values.eventId) {
    const event = job.events.find((entry) => entry.id === values.eventId);
    if (!event) return;
    event.title = values.title;
    event.type = values.type;
    event.startsAt = values.startsAt!.toISOString();
    event.endsAt = values.endsAt!.toISOString();
    event.details = values.details || undefined;
    event.linkUrl = values.linkUrl || undefined;
    event.updatedAt = new Date().toISOString();
  } else {
    const stamp = new Date().toISOString();
    job.events.push({
      id: createId(),
      title: values.title,
      type: values.type,
      startsAt: values.startsAt!.toISOString(),
      endsAt: values.endsAt!.toISOString(),
      details: values.details || undefined,
      linkUrl: values.linkUrl || undefined,
      createdAt: stamp,
      updatedAt: stamp
    });
  }

  job.updatedAt = new Date().toISOString();
  await writeStore(store);
  revalidatePath(`/jobs/${values.jobId}`);
  revalidatePath("/calendar");
  revalidatePath("/dashboard");
}

export async function deleteEvent(formData: FormData) {
  const eventId = String(formData.get("eventId"));
  const jobId = String(formData.get("jobId"));
  const store = await readStore();
  const job = store.jobs.find((entry) => entry.id === jobId);

  if (!job) return;

  job.events = job.events.filter((event) => event.id !== eventId);
  job.updatedAt = new Date().toISOString();
  await writeStore(store);
  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/calendar");
  revalidatePath("/dashboard");
}