import axios from "axios";

interface WebhookPayload {
  job_id: string;
  status: "done" | "error";
  result?: string;
  error?: string;
}

export async function sendWebhook(url: string, payload: WebhookPayload) {
  try {
    await axios.post(url, payload, {
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`✅ Webhook enviado → ${url}`);
  } catch (error: any) {
    console.error(`❌ Falha ao enviar webhook → ${url}`, error.message);
  }
}
