import { Request, Response } from "express";
import { getResult } from "../storage/result.store";

export async function getMessage(req: Request, res: Response) {
  const { job_id } = req.params;

  if (!job_id || Array.isArray(job_id)) {
    return res.status(400).json({
      error: "job_id inválido",
    });
  }

  const result = getResult(job_id);

  if (!result) {
    return res.json({ status: "pending" });
  }

  return res.json({
    status: "done",
    result,
  });
}
