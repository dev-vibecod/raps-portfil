// English dictionary — UI chrome, services, page intros, SEO copy.
// Dossier-derived prose (about/experience/projects/education) lives in
// data/content.js; this file holds the site's own framing copy.
const en = {
  meta: { siteName: "Rafif A.W.", role: "Backend & AI/ML Engineer" },

  nav: {
    home: "Home",
    services: "Services",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    cta: "Get in touch",
  },

  common: {
    viewProjects: "View projects",
    startProject: "Start a project",
    viewAll: "View all projects",
    viewCaseStudy: "View case study",
    getInTouch: "Get in touch",
    backToProjects: "Back to all projects",
    allProjects: "All projects",
    next: "Next",
    representative: "Representative mockup",
    available: "Available for freelance & full-time",
    learnMore: "Learn more",
  },

  featured: {
    badge: "Featured product",
    live: "Live",
    visitSite: "Visit live site",
  },

  hero: {
    titleA: "Backend &",
    titleAccent: "AI/ML",
    titleB: "engineer shipping production systems",
    ctaPrimary: "View projects",
    ctaSecondary: "Start a project",
  },

  sections: {
    about: { eyebrow: "About", title: "Turning real business problems into", accent: "working products." },
    skills: { eyebrow: "Toolbox", title: "Skills &", accent: "capabilities.", sub: "A broad, production-tested stack across GenAI, backend, data/ML, and cloud — built for reliability, monitoring, and cost." },
    projects: { eyebrow: "Selected work", title: "Featured", accent: "projects.", sub: "End-to-end products owned from problem definition through deployment. Repositories are private; each case study uses a representative mockup." },
    experience: { eyebrow: "Career", title: "Experience &", accent: "education.", earlierLabel: "Earlier experience", educationLabel: "Education" },
    services: { eyebrow: "What I can build", title: "Services &", accent: "collaboration." },
  },

  home: {
    tech: { title: "Tech I build with" },
    servicesTeaser: {
      title: "Need a website, app, or AI built?",
      sub: "I take projects end-to-end — from idea and design to deployment and maintenance. Web, applications, AI/chatbots, data & ML, IoT and computer vision.",
    },
    projectsTeaser: {
      sub: "A selection of end-to-end products. Each case study uses a representative mockup — real repositories are private.",
    },
    aboutTeaser: {
      title: "Backend & AI/ML engineer, 3+ years, end-to-end on the cloud",
      cta: "More about me",
    },
    contact: {
      title: "Let's build something",
      accent: "great.",
      sub: "Open to freelance projects, collaborations, and full-time roles. Tell me what you want to build.",
    },
  },

  services: {
    title: "Web, app & AI development services",
    accent: "",
    intro:
      "I design, build, and deploy software end-to-end — websites, web & mobile-ready applications, AI assistants, data pipelines, and IoT/computer-vision systems. Solo or small-team, with care for reliability, monitoring, and cost.",
    areaServed: "Based in Bekasi, Indonesia · working remotely worldwide",
    includesLabel: "What's included",
    techLabel: "Typical stack",
    exampleLabel: "Related work",
    items: [
      {
        slug: "web",
        title: "Website Development",
        blurb: "Company profiles, landing pages, and full web apps — fast, responsive, and SEO-friendly.",
        includes: ["Company profile & landing pages", "Responsive, mobile-first UI", "Dashboards & web apps", "SEO & performance optimization"],
        tech: ["Next.js", "React", "Tailwind", "Vercel"],
        example: "complaint-management",
      },
      {
        slug: "apps",
        title: "Apps & Management Systems",
        blurb: "Management systems, asset management, internal tools, and admin dashboards with proper auth and roles.",
        includes: ["Management & asset systems", "Role-based access & auth", "REST APIs & integrations", "Admin dashboards & reporting"],
        tech: ["FastAPI", "PostgreSQL", "React", "Cloud Run"],
        example: "hr-data-api",
      },
      {
        slug: "ai",
        title: "AI, Chatbot & LLM",
        blurb: "RAG chatbots, customer & internal assistants, NL2SQL, and workflow automation grounded in your data.",
        includes: ["RAG chatbots & assistants", "Natural-language-to-SQL", "Agent & prompt workflows", "Automation (n8n) & integrations"],
        tech: ["LLM + RAG", "n8n", "Vertex AI", "LangChain"],
        example: "insurance-chatbot",
      },
      {
        slug: "data",
        title: "Data & ML Engineering",
        blurb: "ETL/ELT pipelines, batch & streaming data, ML models, and MLOps from feature engineering to serving.",
        includes: ["ETL/ELT & data pipelines", "ML models & scoring APIs", "Batch & streaming (CDC)", "Monitoring & MLOps"],
        tech: ["Python", "Airflow", "scikit-learn", "BigQuery"],
        example: "claim-fraud-detection",
      },
      {
        slug: "iot",
        title: "IoT & Computer Vision",
        blurb: "Object-detection apps, smart-device systems, and sensor monitoring — from model to device.",
        includes: ["Object detection & vision apps", "Smart-device & sensor systems", "Edge inference", "Real-time monitoring dashboards"],
        tech: ["TensorFlow", "OpenCV", "Python", "IoT"],
        example: "smart-parking-detection",
      },
      {
        slug: "cloud",
        title: "Cloud & Deployment",
        blurb: "End-to-end deployment on Google Cloud / AWS with Docker, CI/CD, infrastructure-as-code, and observability.",
        includes: ["GCP / AWS deployment", "Docker & Kubernetes", "CI/CD pipelines", "Monitoring & cost control"],
        tech: ["Google Cloud", "AWS", "Docker", "Terraform"],
        example: "hr-data-api",
      },
    ],
    howTitle: "How I work",
    how: [
      { step: "01", title: "Discovery", desc: "We define the problem, scope, and success criteria together." },
      { step: "02", title: "Design", desc: "Architecture, data model, and UI direction before any code." },
      { step: "03", title: "Build", desc: "Iterative delivery with working increments you can review." },
      { step: "04", title: "Deploy & support", desc: "Production deployment, monitoring, and handover or ongoing support." },
    ],
    faqTitle: "Frequently asked",
    faq: [
      { q: "Do you work remotely?", a: "Yes — I'm based in Bekasi, Indonesia and work remotely with clients anywhere." },
      { q: "Can you own a project end-to-end?", a: "Yes. I handle requirements, architecture, build, testing, deployment, and keeping things running — solo or with a small team." },
      { q: "What kind of projects do you take?", a: "Websites, web/management applications, AI & chatbots, data & ML pipelines, and IoT/computer-vision systems." },
      { q: "How do we start?", a: "Send a short brief via WhatsApp or email and we'll scope it together." },
    ],
  },

  projects: {
    title: "Projects & case studies",
    intro:
      "End-to-end products delivered as freelance and academic work, each owned from problem definition through deployment. Repositories are private — every case study uses a representative mockup.",
    academicLabel: "Academic / research",
  },

  about: {
    title: "About me",
    intro: "Backend & AI/ML engineer turning real business problems into working products.",
  },

  contact: {
    title: "Let's build something",
    accent: "great.",
    intro:
      "Have a website, app, or AI system in mind? Tell me about it. Open to freelance projects, collaborations, and full-time roles.",
    whatsapp: "Chat on WhatsApp",
    email: "Email me",
    formTitle: "Project brief",
    form: {
      name: "Your name",
      project: "What do you want to build?",
      detail: "Brief detail (budget, timeline, anything)",
      send: "Send via WhatsApp",
      sendEmail: "Or send by email",
      placeholderProject: "e.g. a company website, a management app, an AI chatbot…",
      placeholderDetail: "A few sentences about your project…",
    },
    waPrefix: "Hi Rafif, I'm",
    waMid: "I'd like to build:",
    waDetail: "Details:",
  },

  cv: {
    title: "Curriculum Vitae",
    download: "Download PDF",
    summaryLabel: "Profile",
    expLabel: "Experience",
    earlierLabel: "Earlier experience",
    eduLabel: "Education",
    skillsLabel: "Technical skills",
    productsLabel: "Featured product",
    linkLabel: "Download CV",
  },

  footer: {
    rights: "All rights reserved.",
    note: "Code repositories currently private; live demos available on request.",
  },

  detail: {
    frontend: { label: "Frontend", title: "Interface" },
    architecture: { label: "Architecture", title: "How it fits together" },
    backend: { label: "Backend", title: "APIs & data" },
    brief: { label: "In brief", title: "Problem, build & outcome", problem: "Problem", built: "What I built", outcome: "Outcome" },
    decisions: { label: "Engineering", title: "Key decisions" },
    banner: "Representative reconstruction — the real product is private. UI, endpoints & architecture below are illustrative.",
    apiEndpoints: "API endpoints",
    dataModel: "Data model",
    notes: "Implementation notes",
  },

  // SEO copy per page (title/description/keywords)
  seo: {
    home: {
      title: "Rafif Ayyassar Wicaksono — Web, App & AI Developer",
      description:
        "Backend & AI/ML engineer in Indonesia. I build websites, web & management apps, AI chatbots, data pipelines, and IoT/computer-vision systems — end-to-end.",
      keywords: ["web developer indonesia", "app developer", "AI engineer", "machine learning engineer", "freelance developer indonesia", "backend developer"],
    },
    services: {
      title: "Web, App & AI Development Services — Rafif A.W.",
      description:
        "Professional development services: websites, web & management apps, AI/chatbots, data & ML, IoT and computer vision. Remote from Indonesia, worldwide.",
      keywords: ["website development service", "app development service", "AI chatbot service", "IoT service", "computer vision service", "asset management system"],
    },
    projects: {
      title: "Projects & Case Studies — Rafif A.W.",
      description: "End-to-end AI, web, data, and IoT projects across fintech, telco, and enterprise.",
      keywords: ["software portfolio", "AI projects", "web development projects"],
    },
    about: {
      title: "About — Rafif Ayyassar Wicaksono",
      description: "Backend & AI/ML engineer with 3+ years of experience across fintech, telco, and enterprise. Google Cloud, AWS, FastAPI, LLM/RAG.",
      keywords: ["backend engineer", "AI/ML engineer", "google cloud", "fastapi developer"],
    },
    contact: {
      title: "Contact — Hire Rafif A.W.",
      description: "Start a website, app, or AI project. Contact via WhatsApp or email.",
      keywords: ["hire developer", "contact developer indonesia", "freelance web developer"],
    },
  },
};

export default en;
