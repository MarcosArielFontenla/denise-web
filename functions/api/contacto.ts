import { sendContactEmail, type ContactEmailEnv } from "../../src/lib/contact-email.ts";

export function onRequestPost({ request, env }: { request: Request; env: ContactEmailEnv }) {
  return sendContactEmail(request, env);
}
