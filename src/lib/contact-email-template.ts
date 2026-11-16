import { site } from "../config/site.ts";

interface ContactEmailContent {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function formatContactEmail({ name, email, phone, topic, message }: ContactEmailContent) {
  const details = [
    { label: "Nombre", value: name },
    { label: "Correo electrónico", value: email },
    { label: "Teléfono", value: phone },
  ];
  const content = message || "Sin mensaje adicional.";
  const text = [
    ...details.map(({ label, value }) => `${label}: ${value}`),
    `Tema: ${topic}`,
    "",
    content,
  ].join("\n");
  const detailRows = details.map(({ label, value }) => `
    <tr>
      <td style="padding:0 0 14px;font-size:16px;line-height:1.45;overflow-wrap:anywhere;word-break:break-word;">
        <strong style="display:block;color:#6b5f5f;font-size:13px;">${label}</strong>
        ${escapeHtml(value)}
      </td>
    </tr>`).join("");

  const html = `<!doctype html>
<html lang="es-AR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nueva consulta web</title>
</head>
<body style="margin:0;padding:0;background:#f6eded;color:#504545;font-family:Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#f6eded" style="width:100%;background:#f6eded;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <!--[if mso]><table role="presentation" width="600" cellspacing="0" cellpadding="0"><tr><td><![endif]-->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e6d3d3;border-top:5px solid #dbbbbf;">
          <tr>
            <td bgcolor="#504545" style="padding:24px;color:#ffffff;background:#504545;">
              <p style="margin:0;font:normal 25px/1.2 Georgia,serif;">${escapeHtml(site.brand)}</p>
              <p style="margin:6px 0 0;color:#f6eded;font-size:13px;line-height:1.4;">Psicología &middot; Formulario de contacto</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <h1 style="margin:0;font:normal 30px/1.2 Georgia,serif;">Nueva consulta web</h1>
              <p style="margin:8px 0 22px;color:#6b5f5f;font-size:15px;line-height:1.5;">${escapeHtml(topic)}</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;table-layout:fixed;">
                ${detailRows}
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#f6eded" style="width:100%;table-layout:fixed;background:#f6eded;border-left:3px solid #dbbbbf;">
                <tr>
                  <td style="padding:16px;overflow-wrap:anywhere;word-break:break-word;">
                    <h2 style="margin:0 0 6px;font-size:14px;line-height:1.4;">Mensaje</h2>
                    <p style="margin:0;font-size:16px;line-height:1.6;">${escapeHtml(content).replace(/\r\n|\r|\n/g, "<br>")}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:18px 0 0;color:#6b5f5f;font-size:13px;line-height:1.5;">Podés responder a este correo para contactarte con quien hizo la consulta.</p>
            </td>
          </tr>
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { html, text };
}
