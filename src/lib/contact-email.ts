import { site } from "../config/site.ts";
import { formatContactEmail } from "./contact-email-template.ts";
import { isContactPhoneValid } from "./contact-phone.ts";

export interface ContactEmailEnv {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
}

const emailPattern = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;
const maxBodyBytes = 16_384;

export async function sendContactEmail(request: Request, env: ContactEmailEnv): Promise<Response> {
  const respond = (status: number) => {
    const ok = status === 200;
    const headers = { "Cache-Control": "no-store" };
    if (!request.headers.get("Accept")?.includes("text/html")) {
      return Response.json({ ok }, { status, headers });
    }

    const message = ok
      ? "Tu mensaje fue enviado. Te voy a responder por correo electrónico."
      : "No se pudo enviar el mensaje. Volvé al sitio para intentar de nuevo o consultar por WhatsApp.";
    return new Response(`<!doctype html><html lang="es-AR"><meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1"><title>Formulario de contacto</title>
      <main><h1>Formulario de contacto</h1><p>${message}</p><a href="/#contacto">Volver a contacto</a></main></html>`, {
      status,
      headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
    });
  };

  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) return respond(403);

  const contentType = request.headers.get("Content-Type")?.split(";")[0];
  if (contentType !== "application/x-www-form-urlencoded") return respond(415);
  if (Number(request.headers.get("Content-Length")) > maxBodyBytes) return respond(413);

  let fields: URLSearchParams;
  try {
    const reader = request.body?.getReader();
    if (!reader) return respond(400);

    const decoder = new TextDecoder();
    let body = "";
    let size = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBodyBytes) {
        await reader.cancel();
        return respond(413);
      }
      body += decoder.decode(value, { stream: true });
    }
    fields = new URLSearchParams(body + decoder.decode());
  } catch {
    return respond(400);
  }

  const field = (key: string) => fields.get(key)?.trim() ?? "";
  const name = field("nombre");
  const email = field("email");
  const phone = field("telefono");
  const message = field("mensaje");
  const topic = site.form.topics.find(({ value }) => value === field("interes"));
  if (field("empresa") || fields.get("consentimiento") !== "on" || !topic ||
      !name || name.length > 100 || !emailPattern.test(email) || email.length > 150 ||
      !isContactPhoneValid(phone) || message.length > 1000) {
    return respond(400);
  }

  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.RESEND_FROM_EMAIL?.trim() || "";
  const to = env.CONTACT_TO_EMAIL?.trim() || site.contact.email;
  if (!apiKey || !emailPattern.test(from) || !emailPattern.test(to)) {
    console.error("Formulario de contacto: falta configurar el envío por Resend.");
    return respond(503);
  }

  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        from: `${site.brand} — Formulario web <${from}>`,
        to: [to],
        reply_to: email,
        subject: `Consulta web · ${topic.label}`,
        ...formatContactEmail({ name, email, phone, topic: topic.label, message }),
      }),
    });

    if (result.ok) {
      const receipt = await result.json() as { id?: string };
      if (receipt.id) return respond(200);
    }
    console.error(`Formulario de contacto: Resend no confirmó el envío (HTTP ${result.status}).`);
  } catch {
    console.error("Formulario de contacto: falló la comunicación con Resend.");
  }
  return respond(502);
}
