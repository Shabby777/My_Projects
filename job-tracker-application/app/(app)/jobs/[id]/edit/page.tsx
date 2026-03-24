import { notFound } from "next/navigation";

import { JobForm } from "@/components/job-form";
import { getJobById } from "@/lib/queries";

import { updateJob } from "../../../actions";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  return <JobForm action={updateJob.bind(null, id)} job={job} submitLabel="Update Position" />;
}