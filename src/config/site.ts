/**
 * ARCHIVO CENTRAL DE CONFIGURACIÓN
 * Todo lo editable vive acá. Los campos vacíos ("") no se muestran o se resuelven de forma segura.
 */
export const site = {
  // ---------- Identidad ----------
  brand: "Denise Berdeja",
  signature: "Lic. Denise Berdeja · Psicologa clínica",
  tagline: "Una mente más amable",
  concept: "Psicología para una vida en expansión",
  domain: "https://www.deniseberdeja.com.ar", // TODO: dominio definitivo
  locale: "es_AR",
  description:
    "Terapia psicológica online para adultos y terapia de pareja desde la TCC, ACT y mindfulness. Programa grupal psicoeducativo Mente Expansiva. Denise Berdeja, Licenciada en Psicología.",

  // ---------- Datos profesionales ----------
  professional: {
    title: "Licenciada en Psicología",
    license: "M.N. 81020", // TODO: número de matrícula (ej: "M.N. 00000")
    licenseBody: "Universidad de Buenos Aires (UBA)", // TODO: ente que la otorga (opcional)
  },

  // ---------- Contacto ----------
  contact: {
    // Número con código de país y sin signos. Ej. Argentina móvil: "5491122334455"
    whatsappNumber: "5491140611874", // TODO
    whatsappMessages: {
      general: "Hola Denise, quiero consultar por una sesión particular.",
      pareja: "Hola Denise, quiero consultar por una sesión de Terapia de Pareja.",
      programa: "Hola Denise, quiero consultar sobre el programa Mente Expansiva.",
    },
    email: "deniseberdeja@gmail.com", // TODO: correo de contacto
    instagram: "lic.deniseberdeja",
  },

  // ---------- Formulario ----------
  form: {
    providerName: "Resend",
    minSecondsBeforeSubmit: 3, // protección básica anti-bots
    topics: [
      { value: "individual", label: "Psicoterapia individual" },
      { value: "pareja", label: "Terapia de pareja" },
      { value: "programa", label: "Mente Expansiva" },
      { value: "admision", label: "Entrevista de admisión de Mente Expansiva" },
      { value: "otra", label: "Otra consulta" },
    ],
  },

  // ---------- Analítica respetuosa de la privacidad (opcional) ----------
  analytics: {
    provider: "none" as "none" | "plausible" | "umami",
    plausibleDomain: "", // ej: "deniseberdeja.com.ar"
    umamiSrc: "", // ej: "https://cloud.umami.is/script.js"
    umamiWebsiteId: "",
  },

  // ---------- Fotografías (rutas dentro de /public) ----------
  photos: {
    hero: "/images/denise-index.jpeg", // ej: "/images/denise-inicio.jpg"
    about: "/images/denise-sobre-mi.jpeg", // ej: "/images/denise-sobre-mi.jpg"
    ogImage: "/images/denise-contacto.jpeg", // ej: "/images/og.jpg" (1200x630)
    heroAlt: "Retrato de Denise Berdeja",
    aboutAlt: "Denise Berdeja, Licenciada en Psicología",
  },

  // ---------- Servicios ----------
  services: {
    individual: {
      name: "Psicoterapia 1:1",
      modality: "Online",
      duration: "50 minutos (aproximadamente)",
      price: 45000, // honorario de referencia, en pesos argentinos
    },
    pareja: {
      name: "Terapia de Pareja",
      modality: "Online",
      duration: "70 minutos (aproximadamente)",
      price: 65000,
    },
  },

  // ---------- Mente Expansiva ----------
  program: {
    name: "Mente Expansiva",
    edition: "Founders Edition",
    price: 150000,
    priceNote: "por transferencia",
    paymentMethods: "Transferencia bancaria", // TODO: ajustar si cambia
    spots: null as number | null, // ej: 8. Con null se muestra "Cupos reducidos".
    startDates: "", // TODO: ej: "Comienza el 3 de marzo". Vacío = "A confirmar".
    schedule: "", // TODO: ej: "Martes de 19 a 20 h". Vacío = "A confirmar".
    enrollmentUrl: "", // TODO: enlace de inscripción (opcional)
  },

  // ---------- Recursos (estado: "proximamente" | "disponible" | "oculto") ----------
  resources: [
    {
      title: "Guías descargables",
      description: "Materiales breves para leer y practicar a tu ritmo.",
      status: "proximamente",
      url: "",
    },
    {
      title: "Talleres",
      description: "Encuentros puntuales para profundizar en una herramienta.",
      status: "proximamente",
      url: "",
    },
    {
      title: "Recursos para la ansiedad y el sobrepensamiento",
      description: "Ejercicios y explicaciones sencillas para el día a día.",
      status: "proximamente",
      url: "",
    },
    {
      title: "Próximos proyectos del Universo Denise",
      description: "Lo que se viene, a medida que se vaya definiendo.",
      status: "proximamente",
      url: "",
    },
  ] as Array<{ title: string; description: string; status: string; url: string }>,

  // ---------- Navegación ----------
  nav: [
    { label: "Inicio", href: "/#inicio" },
    { label: "Sobre mí", href: "/#sobre-mi" },
    { label: "Psicoterapia", href: "/#psicoterapia" },
    { label: "Mente Expansiva", href: "/#mente-expansiva" },
    { label: "Recursos", href: "/#recursos" },
    { label: "Contacto", href: "/#contacto" },
  ],

  // ---------- Textos legales ----------
  legal: {
    updated: "Octubre de 2026",
    siteNotice:
      "Este sitio ofrece información profesional y psicoeducativa. No sustituye una evaluación individual ni es un servicio de emergencia.",
    emergency:
      "Si estás atravesando una situación de emergencia o riesgo, comunicate con el 911 o acudí a la guardia más cercana.",
    // Texto base: revisalo con un profesional del derecho antes de publicar.
    privacy: [
      {
        title: "Quién es responsable de los datos",
        body: "Denise Berdeja, Licenciada en Psicología, es responsable del tratamiento de los datos que enviás a través de este sitio.",
      },
      {
        title: "Qué datos se recogen",
        body: "Nombre, correo electrónico, teléfono y el mensaje que decidas escribir. Te pedimos que no incluyas información clínica sensible en el formulario: los detalles se conversan luego, en un marco adecuado.",
      },
      {
        title: "Para qué se usan",
        body: "Únicamente para responder tu consulta y coordinar una conversación inicial. No se utilizan para publicidad ni se venden o ceden a terceros.",
      },
      {
        title: "Proveedores que intervienen",
        body: "El formulario es procesado por un servicio externo de recepción de formularios, indicado en esta página cuando está configurado. Si escribís por WhatsApp, rige además la política de esa plataforma.",
      },
      {
        title: "Tus derechos",
        body: "Podés solicitar el acceso, la rectificación o la supresión de tus datos escribiendo al correo de contacto del sitio. En Argentina, la Agencia de Acceso a la Información Pública es la autoridad de aplicación de la Ley 25.326.",
      },
      {
        title: "Cookies y analítica",
        body: "El sitio no instala cookies publicitarias. Si se activa una herramienta de analítica respetuosa de la privacidad, se indicará en esta sección.",
      },
    ],
    terms: [
      {
        title: "Carácter informativo",
        body: "Los contenidos del sitio son informativos y psicoeducativos. No constituyen diagnóstico, tratamiento ni indicación terapéutica, y no reemplazan una evaluación profesional individual.",
      },
      {
        title: "Servicios",
        body: "La pertinencia de cada servicio se evalúa de manera individual. Mente Expansiva es un programa psicoeducativo grupal: no es psicoterapia grupal y no reemplaza la psicoterapia.",
      },
      {
        title: "Honorarios",
        body: "Los valores publicados son de referencia. Las condiciones específicas se acuerdan directamente con la profesional.",
      },
      {
        title: "Emergencias",
        body: "Este sitio y sus canales de contacto no son un servicio de emergencia ni de atención de urgencias.",
      },
      {
        title: "Propiedad intelectual",
        body: "Los textos, imágenes y materiales del sitio pertenecen a Denise Berdeja. Para reproducirlos, pedí autorización previa.",
      },
    ],
  },
};
