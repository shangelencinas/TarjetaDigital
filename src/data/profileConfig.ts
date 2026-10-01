/**
 * CONFIGURACIÓN CENTRAL EDITABLE
 * Modifica los valores de este archivo para personalizar toda la tarjeta digital ejecutiva.
 * Todos los campos con [PLACEHOLDER] están diseñados para ser reemplazados por datos reales.
 */

export interface CareerExperience {
  id: string;
  period: string; // e.g., "[2018 – 2024]"
  institution: string; // e.g., "[INSTITUCIÓN BANCARIA / GRUPO FINANCIERO]"
  role: string; // e.g., "[DIRECTOR / GERENTE DE BANCA EMPRESARIAL]"
  location?: string;
  description: string;
  highlights: string[];
}

export interface ExpertiseArea {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  tags?: string[];
}

export interface BusinessSolution {
  id: string;
  number: string;
  title: string;
  category: 'consultoria' | 'financiero';
  categoryLabel: string;
  isPrimary?: boolean;
  description: string;
  deliverable: string;
  idealFor: string;
}

export interface MethodologyStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface StatMetric {
  id: string;
  prefix?: string;
  value: string; // "+XX", "XX%"
  numericTarget?: number; // for GSAP counter animation
  suffix?: string;
  label: string;
  sublabel: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarPlaceholder?: string;
}

export interface ProfileData {
  // Identidad personal
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  specialty: string;
  tagline: string;
  bioHeadline: string;
  bioParagraphs: string[];
  
  // Datos de contacto
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string; // Solo dígitos con código de país, ej. "5215500000000"
  whatsappDefaultMessage: string;
  email: string;
  linkedinUrl: string;
  linkedinDisplay: string;
  companyName: string;
  companyLogoUrl: string;
  location: string;
  websiteUrl: string;
  photoUrl: string;

  // Secciones
  stats: StatMetric[];
  experiences: CareerExperience[];
  expertiseAreas: ExpertiseArea[];
  solutions: BusinessSolution[];
  methodology: MethodologyStep[];
  testimonials: TestimonialItem[];
}

export const initialProfileData: ProfileData = {
  // 1. Identidad Personal & Profesional (Placeholders editables)
  firstName: "Jhon",
  lastName: "Doe",
  fullName: "Jhon Doe",
  role: "Consultor Empresarial & Asesor Financiero",
  specialty: "Consultoría Empresarial & Estrategia Financiera",
  tagline: "Consultoría estratégica de negocio y asesoría financiera para impulsar decisiones que transforman tu empresa.",
  
  // 2. Perfil Profesional (100–150 palabras editables)
  bioHeadline: "Consultoría empresarial y experiencia financiera que generan confianza",
  bioParagraphs: [
    "Consultor empresarial y asesor financiero con sólida trayectoria acompañando a directivos, socios y comités de empresas en etapas de crecimiento, reestructuración y consolidación de mercado.",
    "Mi enfoque integra el rigor estratégico de la consultoría de negocios de alto nivel con la solvencia técnica adquirida en el sector bancario e institucional. Brindo acompañamiento integral para resolver encrucijadas operativas, diseñar planes de crecimiento sostenido, optimizar la estructura de capital y asegurar condiciones de financiamiento comercial que maximicen el valor patrimonial de tu empresa."
  ],

  // 3. Contacto & Redes
  phone: "+1234567890",
  phoneDisplay: "+XX (XXX) XXX-XXXX",
  whatsappNumber: "5215500000000",
  whatsappDefaultMessage: "Hola Jhon, me interesa conversar sobre consultoría empresarial y asesoría financiera para mi empresa.",
  email: "contacto@ejemplo-financiero.com",
  linkedinUrl: "https://www.linkedin.com/in/placeholder-ejecutivo",
  linkedinDisplay: "linkedin.com/in/[tu-perfil]",
  companyName: "[FIRMA / GRUPO EMPRESARIAL]",
  companyLogoUrl: "/src/assets/images/executive_firm_logo_1790812978573.jpg",
  location: "[CIUDAD, PAÍS]",
  websiteUrl: "https://www.ejemplo-financiero.com",
  photoUrl: "/src/assets/images/executive_portrait_placeholder_1790812965488.jpg",

  // 4. Estadísticas y Logros (Placeholders sin inventar cifras)
  stats: [
    {
      id: "stat-years",
      value: "+XX",
      numericTarget: 18,
      prefix: "+",
      suffix: " AÑOS",
      label: "Experiencia profesional",
      sublabel: "Consultoría de negocios y sector bancario"
    },
    {
      id: "stat-clients",
      value: "+XX",
      numericTarget: 120,
      prefix: "+",
      suffix: "",
      label: "Empresas asesoradas",
      sublabel: "Acompañamiento a directores y accionistas"
    },
    {
      id: "stat-operations",
      value: "+XX",
      numericTarget: 250,
      prefix: "+",
      suffix: "",
      label: "Proyectos e intervenciones",
      sublabel: "Planes estratégicos y soluciones financieras"
    },
    {
      id: "stat-custom",
      value: "XX%",
      numericTarget: 98,
      prefix: "",
      suffix: "%",
      label: "[INDICADOR PERSONALIZABLE]",
      sublabel: "Retención, efectividad o índice a definir"
    }
  ],

  // 5. Trayectoria Profesional (Línea de tiempo interactiva)
  experiences: [
    {
      id: "exp-1",
      period: "[AÑO – PRESENTE]",
      institution: "[FIRMA DE CONSULTORÍA / ASESORÍA EMPRESARIAL]",
      role: "Consultor Empresarial & Asesor Financiero Senior",
      location: "[CIUDAD / PAÍS]",
      description: "Consejería estratégica y consultoría directiva para medianas y grandes empresas. Diagnóstico integral de negocios, diseño de rutas de escalamiento, gobierno corporativo y estructuración financiera personalizada.",
      highlights: [
        "Acompañamiento a comités directivos y dueños de empresa.",
        "Desarrollo de planes estratégicos de crecimiento y reestructuración.",
        "Estructuración y negociación de esquemas de capital y financiamiento."
      ]
    },
    {
      id: "exp-2",
      period: "[AÑO – AÑO]",
      institution: "[INSTITUCIÓN BANCARIA / BANCA EMPRESARIAL & CORPORATIVA]",
      role: "[DIRECTOR / GERENTE SENIOR DE BANCA CORPORATIVA]",
      location: "[CIUDAD / PAÍS]",
      description: "Administración integral de portafolios comerciales y de crédito corporativo. Análisis de solvencia, rentabilidad y coordinación de mesas de dinero y derivados para empresas del sector productivo.",
      highlights: [
        "Evaluación de viabilidad financiera y comités de crédito.",
        "Atracción y consolidación de clientes estratégicos.",
        "Supervisión de operaciones de financiamiento y tesorería."
      ]
    },
    {
      id: "exp-3",
      period: "[AÑO – AÑO]",
      institution: "[BANCO / ENTIDAD FINANCIERA INTERNACIONAL]",
      role: "[EJECUTIVO SENIOR DE SOLUCIONES EMPRESARIALES]",
      location: "[CIUDAD / PAÍS]",
      description: "Atención especializada y consultiva a directivos de finanzas y tesoreros. Implementación de líneas de capital de trabajo, factoraje y comercio exterior.",
      highlights: [
        "Diagnóstico de estructura de capital empresarial.",
        "Negociación de esquemas de garantías y condiciones financieras.",
        "Mantenimiento de relaciones de confianza institucional de largo plazo."
      ]
    },
    {
      id: "exp-4",
      period: "[AÑO – AÑO]",
      institution: "[GRUPO FINANCIERO / ENTIDAD BANCARIA]",
      role: "[ANALISTA SENIOR DE CRÉDITO Y RIESGO]",
      location: "[CIUDAD / PAÍS]",
      description: "Modelación de estados financieros, proyecciones de flujo de efectivo y auditoría de riesgos para expedientes crediticios de mediana y gran envergadura.",
      highlights: [
        "Análisis profundo de balances, estados de resultados y flujos.",
        "Generación de reportes de riesgo y solvencia comercial."
      ]
    }
  ],

  // 6. Áreas de Experiencia (Consultoría Empresarial primero, después Asesoría Financiera)
  expertiseAreas: [
    {
      id: "area-1",
      title: "Consultoría empresarial",
      shortDesc: "Diagnóstico profundo, resolución de cuellos de botella y diseño de hojas de ruta estratégicas para potenciar el valor del negocio.",
      iconName: "Briefcase",
      tags: ["Principal", "Estrategia", "Dirección"]
    },
    {
      id: "area-2",
      title: "Planeación estratégica",
      shortDesc: "Definición de horizontes corporativos, metas operativas y alineación de equipos clave para blindar el rumbo de la empresa.",
      iconName: "Compass",
      tags: ["Principal", "Gobernanza", "Metas"]
    },
    {
      id: "area-3",
      title: "Desarrollo de negocios",
      shortDesc: "Identificación de nuevas avenidas de valor, expansión comercial y diseño de propuestas de alto impacto en el mercado.",
      iconName: "TrendingUp",
      tags: ["Principal", "Expansión", "Crecimiento"]
    },
    {
      id: "area-4",
      title: "Acompañamiento a la dirección",
      shortDesc: "Consejería confidencial para directores generales y comités de socios, actuando como aliado consultivo de cabecera.",
      iconName: "Users",
      tags: ["Principal", "Confianza", "C-Level"]
    },
    {
      id: "area-5",
      title: "Asesoría financiera",
      shortDesc: "Evaluación rigurosa de liquidez, presupuestos, flujos de efectivo y rentabilidad para respaldar la estrategia corporativa.",
      iconName: "BarChart3",
      tags: ["Financiero", "Flujo", "Rentabilidad"]
    },
    {
      id: "area-6",
      title: "Crédito empresarial & deuda",
      shortDesc: "Estructuración de expedientes crediticios bancarios para maximizar probabilidades de aprobación y tasas preferenciales.",
      iconName: "ShieldCheck",
      tags: ["Financiero", "Capital de Trabajo", "Garantías"]
    },
    {
      id: "area-7",
      title: "Servicios bancarios corporativos",
      shortDesc: "Vinculación y estructuración de los mejores instrumentos bancarios y de mercado para la tesorería y operación de la empresa.",
      iconName: "Landmark",
      tags: ["Financiero", "Banca", "Tesorería"]
    },
    {
      id: "area-8",
      title: "Relaciones comerciales y alianzas",
      shortDesc: "Articulación de redes institucionales, mesas de negociación y acuerdos comerciales estratégicos de alto nivel.",
      iconName: "Handshake",
      tags: ["Estratégico", "Negociación", "B2B"]
    }
  ],

  // 7. Soluciones para tu empresa (Priorizando Consultoría Empresarial, luego Asesoría Financiera)
  solutions: [
    // --- SERVICIOS PRINCIPALES: CONSULTORÍA EMPRESARIAL ---
    {
      id: "sol-1",
      number: "01",
      title: "Diagnóstico empresarial integral",
      category: "consultoria",
      categoryLabel: "Consultoría Empresarial (Principal)",
      isPrimary: true,
      description: "Radiografía profunda del modelo de negocio, estructura organizacional, eficiencia operativa y riesgos latentes para definir prioridades de acción inmediata.",
      deliverable: "Informe de diagnóstico ejecutivo + Plan estratégico de intervención",
      idealFor: "Empresas en etapa de estancamiento, reestructuración o consolidación"
    },
    {
      id: "sol-2",
      number: "02",
      title: "Estrategia de crecimiento y escalamiento",
      category: "consultoria",
      categoryLabel: "Consultoría Empresarial (Principal)",
      isPrimary: true,
      description: "Diseño de la hoja de ruta corporativa para expandir líneas de negocio, ingresar a nuevos mercados o multiplicar la capacidad comercial de forma sostenible.",
      deliverable: "Plan de expansión corporativo con metas e indicadores (KPIs)",
      idealFor: "Empresas listas para dar un salto cuantitativo de escala"
    },
    {
      id: "sol-3",
      number: "03",
      title: "Acompañamiento a la alta dirección",
      category: "consultoria",
      categoryLabel: "Consultoría Empresarial (Principal)",
      isPrimary: true,
      description: "Participación consultiva como asesor externo de cabecera en comités ejecutivos y juntas directivas, aportando perspectiva imparcial y visión de largo plazo.",
      deliverable: "Sesiones periódicas de gobierno corporativo y revisión de rumbo",
      idealFor: "Directores Generales y fundadores que requieren un criterio experto"
    },
    {
      id: "sol-4",
      number: "04",
      title: "Desarrollo de negocios y alianzas comerciales",
      category: "consultoria",
      categoryLabel: "Consultoría Empresarial (Principal)",
      isPrimary: true,
      description: "Optimización de la propuesta de valor comercial, redefinición de esquemas de negociación con clientes clave y articulación de sinergias estratégicas B2B.",
      deliverable: "Marco comercial ejecutivo y estrategia de alianzas institucionales",
      idealFor: "Compañías que buscan incrementar su tracción y cuota de mercado"
    },

    // --- SERVICIOS FINANCIEROS COMPLEMENTARIOS: ASESORÍA FINANCIERA ---
    {
      id: "sol-5",
      number: "05",
      title: "Planeación financiera y flujo de tesorería",
      category: "financiero",
      categoryLabel: "Asesoría Financiera",
      isPrimary: false,
      description: "Construcción de modelos de flujo de caja, presupuestos operativos y políticas de reservas para garantizar liquidez y previsibilidad en todo momento.",
      deliverable: "Modelo dinámico de proyección de flujo y control presupuestal",
      idealFor: "Organizaciones que requieren blindar su flujo de caja mensual"
    },
    {
      id: "sol-6",
      number: "06",
      title: "Gestión de crédito empresarial y banca",
      category: "financiero",
      categoryLabel: "Asesoría Financiera",
      isPrimary: false,
      description: "Estructuración de expedientes crediticios y vinculación con la banca para obtener líneas de crédito, factoraje o financiamiento de activos en condiciones óptimas.",
      deliverable: "Expediente crediticio institucional y acompañamiento en comités",
      idealFor: "Empresas que requieren capital de trabajo o fondeo de proyectos"
    },
    {
      id: "sol-7",
      number: "07",
      title: "Optimización y refinanciamiento de pasivos",
      category: "financiero",
      categoryLabel: "Asesoría Financiera",
      isPrimary: false,
      description: "Auditoría de deuda existente, reducción del costo financiero y renegociación de plazos y tasas ante instituciones bancarias.",
      deliverable: "Estrategia de reestructuración de deuda y alivio de amortizaciones",
      idealFor: "Compañías con múltiples pasivos financieros dispersos"
    }
  ],

  // 8. Metodología de Trabajo (4 etapas)
  methodology: [
    {
      number: "01",
      title: "CONOCER",
      subtitle: "Comprensión y Contexto",
      description: "Comprender la situación actual, los antecedentes del negocio y los objetivos prioritarios de los directivos."
    },
    {
      number: "02",
      title: "ANALIZAR",
      subtitle: "Diagnóstico Riguroso",
      description: "Identificar cuellos de botella, riesgos latentes, áreas de mejora y oportunidades de valor financiero no aprovechadas."
    },
    {
      number: "03",
      title: "PROPONER",
      subtitle: "Estrategia a la Medida",
      description: "Desarrollar alternativas viables, rutas de estructuración financiera y tácticas claras con sustento cuantitativo."
    },
    {
      number: "04",
      title: "ACOMPAÑAR",
      subtitle: "Ejecución y Seguimiento",
      description: "Dar seguimiento continuo a la implementación, medir resultados y asegurar el cumplimiento de las metas acordadas."
    }
  ],

  // 9. Testimonios (Placeholders claramente identificables)
  testimonials: [
    {
      id: "test-1",
      name: "[NOMBRE DEL CLIENTE 1]",
      role: "Director General",
      company: "[EMPRESA INDUSTRIAL]",
      quote: "Su visión bancaria y capacidad analítica nos permitieron reestructurar nuestros pasivos de manera impecable. Contar con un criterio tan sólido en nuestras decisiones ha sido un punto de inflexión para la compañía."
    },
    {
      id: "test-2",
      name: "[NOMBRE DEL CLIENTE 2]",
      role: "Chief Financial Officer (CFO)",
      company: "[GRUPO COMERCIAL / SERVICIOS]",
      quote: "Un profesional que combina el rigor técnico de la banca corporativa con una cercanía y comprensión real del día a día del empresario. Genera una confianza absoluta desde la primera reunión."
    },
    {
      id: "test-3",
      name: "[NOMBRE DEL CLIENTE 3]",
      role: "Socio Fundador",
      company: "[EMPRESA DE LOGÍSTICA & DISTRIBUCIÓN]",
      quote: "Gracias a su asesoría estratégica logramos una línea de crédito empresarial con condiciones preferenciales que nos permitió triplicar nuestra capacidad operativa en menos de un año."
    }
  ]
};

/**
 * Generador de archivo vCard (.vcf) compatible con iPhone, Android y Outlook.
 */
export function generateVCardString(profile: ProfileData): string {
  const vcardLines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.fullName}`,
    `N:${profile.lastName};${profile.firstName};;;`,
    `TITLE:${profile.role}`,
    `ORG:${profile.companyName}`,
    `TEL;TYPE=CELL,VOICE:${profile.phone}`,
    `TEL;TYPE=WORK,VOICE:${profile.phone}`,
    `EMAIL;TYPE=PREF,INTERNET:${profile.email}`,
    `URL:${profile.websiteUrl}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${profile.linkedinUrl}`,
    `NOTE:${profile.tagline} - ${profile.specialty}`,
    `ADR;TYPE=WORK:;;;${profile.location};;;`,
    "END:VCARD"
  ];
  return vcardLines.join("\r\n");
}

/**
 * Descarga automática del archivo .vcf en el dispositivo del usuario
 */
export function downloadVCard(profile: ProfileData) {
  const vcard = generateVCardString(profile);
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const fileName = `${profile.firstName.replace(/[^a-zA-Z0-9]/g, "_")}_${profile.lastName.replace(/[^a-zA-Z0-9]/g, "_")}.vcf`;
  link.setAttribute("download", fileName || "contacto_ejecutivo.vcf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
