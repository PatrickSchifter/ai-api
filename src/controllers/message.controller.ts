import { llmQueue } from "../queue/llm.queue";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

export async function createMessage(req: Request, res: Response) {
  const { content } = req.body;

  const job = await llmQueue.add("generate", {
    content,
  });

  return res.json({
    job_id: job.id,
    status: "queued",
  });
}
