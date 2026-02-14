import IORedis from "ioredis";
import { redisConfig } from "./redis";

export const redisWorker = new IORedis(redisConfig);
