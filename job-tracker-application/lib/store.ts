import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { DEMO_USER } from "@/lib/constants";
import type { EventType, JobStatus } from "@/lib/types";

export type NoteRecord = {
  id: string;
  category?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type EventRecord = {
  id: string;
  title: string;
  type: EventType;
  startsAt: string;
  endsAt: string;
  details?: string;
  linkUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type ContactRecord = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  email?: string;
  linkedin?: string;
  createdAt: string;
  updatedAt: string;
};

export type JobRecord = {
  id: string;
  userId: string;
  title: string;
  company: string;
  location?: string;
  status: JobStatus;
  sourceUrl?: string;
  description?: string;
  compensationText?: string;
  salaryMin?: number;
  salaryMax?: number;
  appliedAt?: string;
  createdAt: string;
  updatedAt: string;
  notes: NoteRecord[];
  events: EventRecord[];
  contacts: ContactRecord[];
};

export type HydratedNote = Omit<NoteRecord, "createdAt" | "updatedAt"> & {
  createdAt: Date;
  updatedAt: Date;
};

export type HydratedEvent = Omit<EventRecord, "startsAt" | "endsAt" | "createdAt" | "updatedAt"> & {
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type HydratedContact = Omit<ContactRecord, "createdAt" | "updatedAt"> & {
  createdAt: Date;
  updatedAt: Date;
};

export type HydratedJob = Omit<JobRecord, "appliedAt" | "createdAt" | "updatedAt" | "notes" | "events" | "contacts"> & {
  appliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  notes: HydratedNote[];
  events: HydratedEvent[];
  contacts: HydratedContact[];
};

type StoreData = {
  users: Array<{ id: string; email: string; name: string }>;
  jobs: JobRecord[];
};

const DATA_PATH = path.join(process.cwd(), "data", "demo-db.json");

function nowIso() {
  return new Date().toISOString();
}

function makeId() {
  return crypto.randomUUID();
}

function daysFromNow(days: number, hour = 9, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, minute, 0, 0);
  return date;
}

function eventRecord(title: string, type: EventType, startsAt: Date, durationHours: number, details: string): EventRecord {
  const endsAt = new Date(startsAt.getTime() + durationHours * 60 * 60 * 1000);
  const stamp = nowIso();
  return {
    id: makeId(),
    title,
    type,
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
    details,
    createdAt: stamp,
    updatedAt: stamp
  };
}

function jobRecord(title: string, company: string, status: JobStatus, offset: number, extra?: Partial<JobRecord>): JobRecord {
  const stamp = nowIso();
  return {
    id: makeId(),
    userId: DEMO_USER.id,
    title,
    company,
    status,
    location: extra?.location ?? "Remote",
    sourceUrl: extra?.sourceUrl ?? `https://${company.toLowerCase().replace(/\s+/g, "")}.example/jobs/${title.toLowerCase().replace(/\s+/g, "-")}`,
    description:
      extra?.description ??
      `Lead the next phase of platform strategy at ${company} with a strong focus on systems thinking, hiring collaboration, and high-leverage execution.`,
    compensationText: extra?.compensationText ?? "$175k - $220k",
    salaryMin: extra?.salaryMin ?? 175000,
    salaryMax: extra?.salaryMax ?? 220000,
    appliedAt: daysFromNow(offset, 10, 0).toISOString(),
    createdAt: stamp,
    updatedAt: stamp,
    notes: extra?.notes ?? [],
    events: extra?.events ?? [],
    contacts: extra?.contacts ?? []
  };
}

function createSeedData(): StoreData {
  const stamp = nowIso();
  return {
    users: [{ id: DEMO_USER.id, email: DEMO_USER.email, name: DEMO_USER.name }],
    jobs: [
      jobRecord("Senior Product Designer", "Stripe", "offer", -9, {
        compensationText: "$180k - $220k",
        notes: [
          {
            id: makeId(),
            category: "Offer Strategy",
            content: "Clarify equity refresh cadence and ask about design org reporting lines before making a final decision.",
            createdAt: stamp,
            updatedAt: stamp
          }
        ],
        contacts: [
          {
            id: makeId(),
            name: "Maya Chen",
            role: "Design Director",
            company: "Stripe",
            email: "maya.chen@stripe.example",
            createdAt: stamp,
            updatedAt: stamp
          }
        ],
        events: [eventRecord("Offer Review Call", "follow_up", daysFromNow(1, 11, 0), 1, "Review compensation package and start-date flexibility.")]
      }),
      jobRecord("Experience Lead", "Airbnb", "interviewing", -16, {
        location: "San Francisco, CA",
        notes: [
          {
            id: makeId(),
            category: "Interview Prep",
            content: "Prepare examples on redesigning onboarding flows and improving experimentation velocity.",
            createdAt: stamp,
            updatedAt: stamp
          }
        ],
        contacts: [
          {
            id: makeId(),
            name: "Jordan Reyes",
            role: "Recruiter",
            company: "Airbnb",
            linkedin: "https://linkedin.com/in/jordan-reyes-demo",
            createdAt: stamp,
            updatedAt: stamp
          }
        ],
        events: [
          eventRecord("Portfolio Review", "interview", daysFromNow(2, 14, 0), 1, "Live walkthrough of two marketplace redesign case studies."),
          eventRecord("Thank You Note", "follow_up", daysFromNow(3, 9, 0), 0.5, "Send follow-up and recap next steps.")
        ]
      }),
      jobRecord("Design Systems Architect", "Notion", "applied", -3, {
        location: "Hybrid",
        notes: [
          {
            id: makeId(),
            category: "Resume Tailoring",
            content: "Highlighted design token migration, component governance, and docs adoption improvements.",
            createdAt: stamp,
            updatedAt: stamp
          }
        ]
      }),
      jobRecord("Staff UI Engineer", "Framer", "interviewing", -21, {
        location: "Amsterdam",
        compensationText: "$160k - $210k + relocation",
        events: [
          eventRecord("System Design Interview", "interview", daysFromNow(4, 16, 0), 1.5, "Architecture review focused on editor performance and collaboration sync.")
        ]
      })
    ]
  };
}

export async function ensureSeeded() {
  try {
    const data = await readStore();
    const existing = data.users.find((user) => user.email === DEMO_USER.email);
    if (existing) return existing.id;
  } catch {
    // fall through to initialize store
  }

  await mkdir(path.dirname(DATA_PATH), { recursive: true });
  const data = createSeedData();
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2));
  return DEMO_USER.id;
}

export async function readStore(): Promise<StoreData> {
  await ensureSeededFileExists();
  const raw = await readFile(DATA_PATH, "utf8");
  return JSON.parse(raw) as StoreData;
}

async function ensureSeededFileExists() {
  try {
    await readFile(DATA_PATH, "utf8");
  } catch {
    await mkdir(path.dirname(DATA_PATH), { recursive: true });
    await writeFile(DATA_PATH, JSON.stringify(createSeedData(), null, 2));
  }
}

export async function writeStore(data: StoreData) {
  await mkdir(path.dirname(DATA_PATH), { recursive: true });
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2));
}

export function hydrateJob(job: JobRecord): HydratedJob {
  return {
    ...job,
    appliedAt: job.appliedAt ? new Date(job.appliedAt) : undefined,
    createdAt: new Date(job.createdAt),
    updatedAt: new Date(job.updatedAt),
    notes: job.notes.map((note) => ({ ...note, createdAt: new Date(note.createdAt), updatedAt: new Date(note.updatedAt) })),
    events: job.events.map((event) => ({ ...event, startsAt: new Date(event.startsAt), endsAt: new Date(event.endsAt), createdAt: new Date(event.createdAt), updatedAt: new Date(event.updatedAt) })),
    contacts: job.contacts.map((contact) => ({ ...contact, createdAt: new Date(contact.createdAt), updatedAt: new Date(contact.updatedAt) }))
  };
}

export function toStoredJob(job: HydratedJob): JobRecord {
  return {
    ...job,
    appliedAt: job.appliedAt?.toISOString(),
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
    notes: job.notes.map((note) => ({ ...note, createdAt: note.createdAt.toISOString(), updatedAt: note.updatedAt.toISOString() })),
    events: job.events.map((event) => ({ ...event, startsAt: event.startsAt.toISOString(), endsAt: event.endsAt.toISOString(), createdAt: event.createdAt.toISOString(), updatedAt: event.updatedAt.toISOString() })),
    contacts: job.contacts.map((contact) => ({ ...contact, createdAt: contact.createdAt.toISOString(), updatedAt: contact.updatedAt.toISOString() }))
  };
}

export function createId() {
  return makeId();
}