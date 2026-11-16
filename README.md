# Web de Denise Berdeja · Psicología

Sitio estático hecho con **Astro** (sin frameworks pesados, sin rastreadores, carga rápida). Todo lo editable está en **`src/config/site.ts`**.

## Estructura de carpetas

```
denise-web/
├─ astro.config.mjs        (dominio y sitemap)
├─ package.json
├─ public/
│  ├─ favicon.svg          (reemplazalo por tu logo cuando lo tengas)
│  ├─ robots.txt
│  └─ images/              (tus fotos: ver LEEME.txt)
└─ src/
   ├─ config/site.ts       (TODOS los datos editables)
   ├─ lib/links.ts         (WhatsApp, Instagram, formato de precios)
   ├─ styles/global.css    (colores, tipografías, espacios y botones como variables)
   ├─ layouts/Base.astro   (SEO, Open Graph, analítica opcional)
   ├─ components/          (Header, Hero, Identificacion, Metodo, SobreMi, Psicoterapia,
   │                        MenteExpansiva, Recursos, Faq, Contacto, ContactForm, Footer, Photo)
   └─ pages/               (index, privacidad, terminos)
```

## 1. Instalar y ejecutar

Necesitás [Node.js 20 o superior](https://nodejs.org).

```bash
npm install
npm run dev        # abre http://localhost:4321
npm run build      # genera la carpeta dist/ lista para publicar
npm run preview    # prueba la versión final
```

## 2. Publicar gratis (opción recomendada: Cloudflare Pages)

1. Subí la carpeta a un repositorio de GitHub.
2. En Cloudflare Pages: *Create project > Connect to Git* y elegí el repositorio.
3. Build command: `npm run build` · Output directory: `dist`.
4. Cada vez que cambies algo y lo subas a GitHub, el sitio se actualiza solo.

La página se compila como HTML estático. El formulario usa una función de Cloudflare Pages en `functions/api/contacto.ts`.

## 3. Conectar tu dominio

1. Comprá el dominio (en Argentina, `.com.ar` se gestiona en NIC Argentina; también podés usar `.com`).
2. En Cloudflare Pages: *Custom domains > Set up a domain* y seguí los pasos (te indica qué registros DNS cargar).
3. Actualizá el dominio en **dos lugares**: `site.domain` en `src/config/site.ts` y `site` en `astro.config.mjs` (y la línea Sitemap de `public/robots.txt`).

## 4. Hacer funcionar el formulario

El formulario envía por Resend. En Cloudflare Pages, cargá estos valores en **Settings → Variables and Secrets**:

- `RESEND_API_KEY` como secreto. Usá una clave con permiso de envío para el dominio verificado.
- `RESEND_FROM_EMAIL` con una dirección del dominio verificado en Resend.
- `CONTACT_TO_EMAIL` solo en el entorno de prueba, con la dirección que va a recibir las pruebas. Si omitís esta variable, se usa el correo de Denise definido en `site.contact.email`.

Para probar en local, cargá las mismas variables en un archivo `.dev.vars` en la raíz. Luego ejecutá desde la raíz:

```bash
npm run build
npx wrangler pages dev dist
```

Abrí la dirección que muestra Wrangler, enviá un mensaje ficticio y confirmá que llegue al correo de prueba. Al responder desde el correo, el destinatario debe ser la dirección que ingresaste en el formulario. Para producción, configurá la clave y el remitente en ese entorno y dejá `CONTACT_TO_EMAIL` vacío para que los mensajes lleguen a Denise.

El servidor valida los campos, verifica el consentimiento y descarta envíos que completan el campo trampa. El formulario pide que no se incluyan datos clínicos.

## 5. Analítica (opcional)

Por defecto no hay ninguna. Para activarla, en `site.analytics` elegí `plausible` o `umami` y completá los datos. Ambas son respetuosas de la privacidad y no usan cookies de seguimiento (Plausible es paga; Umami se puede usar gratis en su plan inicial).

## 6. Datos que tenés que completar antes de publicar

En `src/config/site.ts`:

- [ ] `contact.whatsappNumber` (con código de país, sin signos; ej: `5491122334455`). Mientras esté vacío, los botones llevan al formulario.
- [ ] `contact.email`
- [ ] `professional.license` (matrícula) y `licenseBody`
- [ ] `domain` (y en `astro.config.mjs` y `public/robots.txt`)
- [ ] `photos.hero`, `photos.about`, `photos.ogImage` (colocá los archivos en `public/images/`)
- [ ] `program.spots`, `program.startDates`, `program.schedule`, `program.paymentMethods` y `program.enrollmentUrl` cuando estén confirmados
- [ ] Confirmar precios (`services.*.price`, `program.price`)
- [ ] Revisar con un profesional del derecho los textos de `legal` (privacidad y términos son un texto base)
- [ ] Reemplazar `public/favicon.svg` por tu logo, si lo tenés

Para mostrar un recurso cuando esté listo: en `site.resources`, cambiá `status` a `"disponible"` y agregá su `url`. Para ocultarlo: `"oculto"`.

## 7. Lista de comprobación

**En el celular**
- [ ] El menú abre, cierra y lleva a cada sección (también con el botón Cerrar).
- [ ] Los textos se leen sin hacer zoom y no hay scroll horizontal.
- [ ] Los botones de WhatsApp abren la conversación con el mensaje precargado.
- [ ] El formulario muestra errores claros al dejar campos vacíos.
- [ ] Un envío de prueba llega a tu correo y el mensaje de confirmación aparece.
- [ ] Las preguntas frecuentes se despliegan y se pliegan.

**En la computadora**
- [ ] Navegás todo el sitio solo con el teclado (Tab, Enter, Escape) y siempre se ve dónde está el foco.
- [ ] «Quiero solicitar una entrevista de admisión» deja el formulario con ese tema elegido.
- [ ] Las páginas /privacidad/ y /terminos/ abren bien.
- [ ] Al compartir el enlace en WhatsApp/Instagram aparece título e imagen.
- [ ] Probá el rendimiento con PageSpeed Insights y la accesibilidad con la pestaña Lighthouse de Chrome.

## Ampliar el sitio

Cada sección es un componente en `src/components/`. Para sumar una página nueva, creá un archivo en `src/pages/` (por ejemplo `tienda.astro`) usando `<Base>` como las demás. La estructura de Recursos ya está preparada para sumar una tienda más adelante.
