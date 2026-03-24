import type { JobStatus } from "@/lib/types";

import { STATUS_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const tones: Record<JobStatus, string> = {
  wishlist: "bg-amber-100 text-amber-800",
  applied: "bg-slate-200 text-slate-700",
  interviewing: "bg-primary/10 text-primary",
  offer: "bg-accent/40 text-primary",
  rejected: "bg-rose-100 text-rose-700",
  archived: "bg-slate-100 text-slate-500"
};

export function StatusBadge({ status, className }: { status: JobStatus; className?: string }) {
  return <span className={cn("chip", tones[status], className)}>{STATUS_LABELS[status]}</span>;
}