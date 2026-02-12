type JobStatus = "queued" | "processing" | "done" | "error";

interface JobResult {
  status: JobStatus;
  input?: string;
  output?: string;
  error?: string;
  createdAt: Date;
  finishedAt?: Date;
}

const store = new Map<string, JobResult>();

export function saveQueued(id: string, input: string) {
  store.set(id, {
    status: "queued",
    input,
    createdAt: new Date(),
  });
}

export function markProcessing(id: string) {
  const job = store.get(id);
  if (!job) return;
  job.status = "processing";
}

export function saveResult(id: string, output: string) {
  const job = store.get(id);
  if (!job) return;

  job.status = "done";
  job.output = output;
  job.finishedAt = new Date();
}

export function saveError(id: string, error: string) {
  const job = store.get(id);
  if (!job) return;

  job.status = "error";
  job.error = error;
  job.finishedAt = new Date();
}

export function getResult(id: string) {
  return store.get(id);
}
