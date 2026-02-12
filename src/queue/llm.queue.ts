import { Queue } from "bullmq";
import redis from "../config/redis";

export const llmQueue = new Queue("llm-queue", {
  connection: redis,
});
