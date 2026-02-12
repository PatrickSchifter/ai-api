Redis-Queued Prompt Processing API with Gemini Integration

This repository contains an API that receives user prompts, enqueues them into a Redis queue, and processes them asynchronously using the Gemini Free API. The system is designed to be resilient: if a request to Gemini fails, it automatically retries until a successful response is obtained. Once the prompt is processed, the final result is delivered to a registered webhook endpoint.

The architecture ensures reliability, scalability, and fault tolerance by decoupling request intake from processing, making it suitable for high-throughput and distributed environments.
