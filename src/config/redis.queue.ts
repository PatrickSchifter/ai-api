import IORedis from "ioredis";
import { redisConfig } from "./redis";

export const redisQueue = new IORedis(redisConfig);
