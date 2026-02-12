import { Router } from "express";
import { createMessage } from "../controllers/message.controller";
import { getMessage } from "../controllers/result.controller";

const router = Router();

router.get("/health", (_, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

router.post("/messages", createMessage);

router.get("/messages/:job_id", getMessage);

export default router;
