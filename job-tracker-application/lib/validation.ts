import { z } from "zod";

const optionalNumber = z
  .string()
  .trim()
  .optional()
  .transform((value) => {
    if (!value) return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? Number.NaN : parsed;
  })
  .refine((value) => value === undefined || Number.isFinite(value), {
    message: "Must be a valid number"
  });

const optionalDate = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? new Date(value) : undefined))
  .refine((value) => value === undefined || !Number.isNaN(value.getTime()), {
    message: "Must be a valid date"
  });

const optionalDateTime = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? new Date(value) : undefined))
  .refine((value) => value === undefined || !Number.isNaN(value.getTime()), {
    message: "Must be a valid date and time"
  });

export const jobSchema = z.object({
  title: z.string().trim().min(1, "Job title is required"),
  company: z.string().trim().min(1, "Company is required"),
  location: z.string().trim().optional(),
  status: z.enum(["wishlist", "applied", "interviewing", "offer", "rejected", "archived"]),
  sourceUrl: z.string().trim().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().trim().optional(),
  compensationText: z.string().trim().optional(),
  salaryMin: optionalNumber,
  salaryMax: optionalNumber,
  appliedAt: optionalDate
});

export const noteSchema = z.object({
  jobId: z.string().trim().min(1),
  noteId: z.string().trim().optional(),
  category: z.string().trim().optional(),
  content: z.string().trim().min(1, "Note content is required")
});

export const eventSchema = z
  .object({
    jobId: z.string().trim().min(1),
    eventId: z.string().trim().optional(),
    title: z.string().trim().min(1, "Event title is required"),
    type: z.enum(["interview", "follow_up", "deadline", "prep"]),
    startsAt: optionalDateTime,
    endsAt: optionalDateTime,
    details: z.string().trim().optional(),
    linkUrl: z.string().trim().url("Must be a valid URL").optional().or(z.literal(""))
  })
  .refine(
    (value) =>
      value.startsAt !== undefined &&
      value.endsAt !== undefined &&
      value.startsAt <= value.endsAt,
    {
      message: "Start time must be before end time",
      path: ["endsAt"]
    }
  );

export function parseJobForm(formData: FormData) {
  return jobSchema.parse({
    title: formData.get("title"),
    company: formData.get("company"),
    location: formData.get("location"),
    status: formData.get("status"),
    sourceUrl: formData.get("sourceUrl"),
    description: formData.get("description"),
    compensationText: formData.get("compensationText"),
    salaryMin: formData.get("salaryMin"),
    salaryMax: formData.get("salaryMax"),
    appliedAt: formData.get("appliedAt")
  });
}

export function parseNoteForm(formData: FormData) {
  return noteSchema.parse({
    jobId: formData.get("jobId"),
    noteId: formData.get("noteId"),
    category: formData.get("category"),
    content: formData.get("content")
  });
}

export function parseEventForm(formData: FormData) {
  return eventSchema.parse({
    jobId: formData.get("jobId"),
    eventId: formData.get("eventId"),
    title: formData.get("title"),
    type: formData.get("type"),
    startsAt: formData.get("startsAt"),
    endsAt: formData.get("endsAt"),
    details: formData.get("details"),
    linkUrl: formData.get("linkUrl")
  });
}