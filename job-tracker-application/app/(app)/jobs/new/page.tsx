import { JobForm } from "@/components/job-form";

import { createJob } from "../../actions";

export default function NewJobPage() {
  return <JobForm action={createJob} submitLabel="Save Position" />;
}