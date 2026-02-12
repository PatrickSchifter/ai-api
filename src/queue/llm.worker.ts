import { Worker } from "bullmq";
import { GeminiService } from "../services/gemini.service";
import { saveResult } from "../storage/result.store";
import { sendWebhook } from "../webhook/sender";
import redis from "../config/redis";

const gemini = new GeminiService();

new Worker(
  "llm-queue",
  async (job) => {
    const jobId = job.id?.toString();

    if (!jobId) {
      throw new Error("Job sem ID válido");
    }
    const result = await gemini.generateContent(job.data.content);

    saveResult(jobId, result);

    return result;
  },
  {
    connection: redis,
  },
);
