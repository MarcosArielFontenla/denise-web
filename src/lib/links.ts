import { site } from "../config/site";

/** Devuelve el enlace de WhatsApp; si el número no está configurado, lleva al formulario de contacto. */
export function whatsappUrl(kind: keyof typeof site.contact.whatsappMessages = "general"): string {
  const number = site.contact.whatsappNumber.replace(/\D/g, "");
  if (!number) return "/#contacto";
  const text = encodeURIComponent(site.contact.whatsappMessages[kind]);
  return `https://wa.me/${number}?text=${text}`;
}

export const whatsappIsConfigured = (): boolean =>
  site.contact.whatsappNumber.replace(/\D/g, "").length > 0;

export const instagramUrl = (): string =>
  site.contact.instagram ? `https://www.instagram.com/${site.contact.instagram.replace(/^@/, "")}/` : "";

export const formatARS = (n: number): string =>
  "$" + new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(n);

export const isExternal = (href: string): boolean => /^https?:\/\//.test(href);
