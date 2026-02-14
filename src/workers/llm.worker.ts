import { Worker } from "bullmq";
import { GeminiService } from "../services/gemini.service";
import { saveResult } from "../storage/result.store";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  tls: {},
});
const gemini = new GeminiService();

new Worker(
  "llm-queue",
  async (job) => {
    const jobId = job.id?.toString();
    if (!jobId) throw new Error("Job sem ID válido");

    console.log(`⚙️ Processando job ${jobId}`);

    const result = await gemini.generateContent(job.data.content);

    saveResult(jobId, result);

    console.log(`✅ Job finalizado ${jobId}`);

    return result;
  },
  {
    connection,
    concurrency: 3,
  },
);
