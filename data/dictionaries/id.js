// Indonesian dictionary (primary locale). Faithful translation of en.js.
const id = {
  meta: { siteName: "Rafif A.W.", role: "Backend & AI/ML Engineer" },

  nav: {
    home: "Beranda",
    services: "Layanan",
    projects: "Proyek",
    about: "Tentang",
    contact: "Kontak",
    cta: "Hubungi saya",
  },

  common: {
    viewProjects: "Lihat proyek",
    startProject: "Mulai proyek",
    viewAll: "Lihat semua proyek",
    viewCaseStudy: "Lihat studi kasus",
    getInTouch: "Hubungi saya",
    backToProjects: "Kembali ke semua proyek",
    allProjects: "Semua proyek",
    next: "Berikutnya",
    representative: "Mockup representatif",
    available: "Tersedia untuk freelance & full-time",
    learnMore: "Selengkapnya",
  },

  featured: {
    badge: "Produk unggulan",
    live: "Live",
    visitSite: "Kunjungi situs",
  },

  hero: {
    titleA: "Engineer Backend &",
    titleAccent: "AI/ML",
    titleB: "yang membangun sistem siap produksi",
    ctaPrimary: "Lihat proyek",
    ctaSecondary: "Mulai proyek",
  },

  sections: {
    about: { eyebrow: "Tentang", title: "Mengubah masalah bisnis nyata menjadi", accent: "produk yang bekerja." },
    skills: { eyebrow: "Perkakas", title: "Keahlian &", accent: "kapabilitas.", sub: "Stack luas yang teruji di produksi — GenAI, backend, data/ML, dan cloud — dibangun dengan perhatian pada keandalan, monitoring, dan biaya." },
    projects: { eyebrow: "Karya pilihan", title: "Proyek", accent: "unggulan.", sub: "Produk end-to-end yang ditangani dari definisi masalah sampai deployment. Repositori bersifat privat; tiap studi kasus memakai mockup representatif." },
    experience: { eyebrow: "Karier", title: "Pengalaman &", accent: "pendidikan.", earlierLabel: "Pengalaman awal", educationLabel: "Pendidikan" },
    services: { eyebrow: "Yang bisa saya bangun", title: "Layanan &", accent: "kerja sama." },
  },

  home: {
    tech: { title: "Teknologi yang saya pakai" },
    servicesTeaser: {
      title: "Butuh website, aplikasi, atau AI?",
      sub: "Saya kerjakan proyek end-to-end — dari ide dan desain sampai deployment dan pemeliharaan. Website, aplikasi, AI/chatbot, data & ML, IoT dan computer vision.",
    },
    projectsTeaser: {
      sub: "Sejumlah produk end-to-end. Tiap studi kasus memakai mockup representatif — repositori asli bersifat privat.",
    },
    aboutTeaser: {
      title: "Engineer Backend & AI/ML, 3+ tahun, end-to-end di cloud",
      cta: "Selengkapnya tentang saya",
    },
    contact: {
      title: "Mari bangun sesuatu yang",
      accent: "hebat.",
      sub: "Terbuka untuk proyek freelance, kerja sama, dan peran full-time. Ceritakan apa yang ingin Anda bangun.",
    },
  },

  services: {
    title: "Jasa pembuatan website, aplikasi & AI",
    accent: "",
    intro:
      "Saya merancang, membangun, dan men-deploy software secara end-to-end — website, aplikasi web, asisten AI, pipeline data, hingga sistem IoT/computer vision. Solo atau tim kecil, dengan perhatian pada keandalan, monitoring, dan biaya.",
    areaServed: "Berbasis di Bekasi, Indonesia · bekerja remote ke seluruh dunia",
    includesLabel: "Yang termasuk",
    techLabel: "Teknologi umum",
    exampleLabel: "Karya terkait",
    items: [
      {
        slug: "web",
        title: "Pembuatan Website",
        blurb: "Company profile, landing page, dan aplikasi web — cepat, responsif, dan ramah SEO.",
        includes: ["Company profile & landing page", "UI responsif, mobile-first", "Dashboard & aplikasi web", "Optimasi SEO & performa"],
        tech: ["Next.js", "React", "Tailwind", "Vercel"],
        example: "complaint-management",
      },
      {
        slug: "apps",
        title: "Aplikasi & Sistem Manajemen",
        blurb: "Sistem manajemen, manajemen aset, internal tools, dan dashboard admin dengan auth dan role yang rapi.",
        includes: ["Sistem manajemen & aset", "Akses berbasis role & auth", "REST API & integrasi", "Dashboard admin & pelaporan"],
        tech: ["FastAPI", "PostgreSQL", "React", "Cloud Run"],
        example: "hr-data-api",
      },
      {
        slug: "ai",
        title: "AI, Chatbot & LLM",
        blurb: "Chatbot RAG, asisten pelanggan & internal, NL2SQL, dan otomasi alur kerja yang berbasis data Anda.",
        includes: ["Chatbot & asisten RAG", "Natural-language-to-SQL", "Alur agent & prompt", "Otomasi (n8n) & integrasi"],
        tech: ["LLM + RAG", "n8n", "Vertex AI", "LangChain"],
        example: "insurance-chatbot",
      },
      {
        slug: "data",
        title: "Data & ML Engineering",
        blurb: "Pipeline ETL/ELT, data batch & streaming, model ML, dan MLOps dari feature engineering sampai serving.",
        includes: ["Pipeline ETL/ELT & data", "Model ML & API scoring", "Batch & streaming (CDC)", "Monitoring & MLOps"],
        tech: ["Python", "Airflow", "scikit-learn", "BigQuery"],
        example: "claim-fraud-detection",
      },
      {
        slug: "iot",
        title: "IoT & Computer Vision",
        blurb: "Aplikasi deteksi objek, sistem perangkat pintar, dan monitoring sensor — dari model sampai perangkat.",
        includes: ["Deteksi objek & aplikasi vision", "Sistem perangkat pintar & sensor", "Inferensi di edge", "Dashboard monitoring real-time"],
        tech: ["TensorFlow", "OpenCV", "Python", "IoT"],
        example: "smart-parking-detection",
      },
      {
        slug: "cloud",
        title: "Cloud & Deployment",
        blurb: "Deployment end-to-end di Google Cloud / AWS dengan Docker, CI/CD, infrastructure-as-code, dan observability.",
        includes: ["Deployment GCP / AWS", "Docker & Kubernetes", "Pipeline CI/CD", "Monitoring & kontrol biaya"],
        tech: ["Google Cloud", "AWS", "Docker", "Terraform"],
        example: "hr-data-api",
      },
    ],
    howTitle: "Cara saya bekerja",
    how: [
      { step: "01", title: "Diskusi awal", desc: "Kita definisikan masalah, ruang lingkup, dan kriteria sukses bersama." },
      { step: "02", title: "Desain", desc: "Arsitektur, model data, dan arah UI sebelum menulis kode." },
      { step: "03", title: "Pembangunan", desc: "Pengerjaan iteratif dengan hasil bertahap yang bisa Anda review." },
      { step: "04", title: "Deploy & dukungan", desc: "Deployment produksi, monitoring, dan serah terima atau dukungan berkelanjutan." },
    ],
    faqTitle: "Pertanyaan umum",
    faq: [
      { q: "Apakah bisa kerja remote?", a: "Bisa — saya berbasis di Bekasi, Indonesia dan bekerja remote dengan klien di mana saja." },
      { q: "Bisa menangani proyek end-to-end?", a: "Bisa. Saya menangani kebutuhan, arsitektur, pembangunan, pengujian, deployment, dan menjaganya tetap berjalan — solo atau dengan tim kecil." },
      { q: "Jenis proyek apa yang dikerjakan?", a: "Website, aplikasi web/manajemen, AI & chatbot, pipeline data & ML, serta sistem IoT/computer vision." },
      { q: "Bagaimana cara memulai?", a: "Kirim brief singkat via WhatsApp atau email, nanti kita tentukan ruang lingkupnya bersama." },
    ],
  },

  projects: {
    title: "Proyek & studi kasus",
    intro:
      "Produk end-to-end yang dikerjakan sebagai pekerjaan freelance dan akademik, masing-masing ditangani dari definisi masalah sampai deployment. Repositori bersifat privat — tiap studi kasus memakai mockup representatif.",
    academicLabel: "Akademik / riset",
  },

  about: {
    title: "Tentang saya",
    intro: "Engineer Backend & AI/ML yang mengubah masalah bisnis nyata menjadi produk yang bekerja.",
  },

  contact: {
    title: "Mari bangun sesuatu yang",
    accent: "hebat.",
    intro:
      "Punya rencana website, aplikasi, atau sistem AI? Ceritakan ke saya. Terbuka untuk proyek freelance, kerja sama, dan peran full-time.",
    whatsapp: "Chat via WhatsApp",
    email: "Kirim email",
    formTitle: "Brief proyek",
    form: {
      name: "Nama Anda",
      project: "Apa yang ingin Anda bangun?",
      detail: "Detail singkat (budget, timeline, apa saja)",
      send: "Kirim via WhatsApp",
      sendEmail: "Atau kirim lewat email",
      placeholderProject: "mis. website perusahaan, aplikasi manajemen, chatbot AI…",
      placeholderDetail: "Beberapa kalimat tentang proyek Anda…",
    },
    waPrefix: "Halo Rafif, saya",
    waMid: "Saya ingin membangun:",
    waDetail: "Detail:",
  },

  cv: {
    title: "Curriculum Vitae",
    download: "Unduh PDF",
    summaryLabel: "Profil",
    expLabel: "Pengalaman",
    earlierLabel: "Pengalaman awal",
    eduLabel: "Pendidikan",
    skillsLabel: "Keahlian teknis",
    productsLabel: "Produk unggulan",
    projectsLabel: "Proyek pilihan",
    linkLabel: "Unduh CV",
  },

  chat: {
    title: "Tanya tentang Rafif",
    subtitle: "Asisten AI",
    greeting: "Hai! Saya asisten AI Rafif. Tanya saya soal pengalaman, proyek, atau jasa yang ia tawarkan.",
    placeholder: "Tanya soal pengalaman, proyek, jasa…",
    error: "Terjadi kesalahan. Coba lagi, atau hubungi Rafif langsung.",
    disclaimer: "AI · hanya menjawab tentang Rafif",
    suggestions: ["Jasa apa saja yang Rafif tawarkan?", "Ceritakan tentang OprexDuit", "Pengalaman Rafif di AI / LLM?"],
  },

  footer: {
    rights: "Hak cipta dilindungi.",
    note: "Repositori kode saat ini privat; demo langsung tersedia atas permintaan.",
  },

  detail: {
    frontend: { label: "Frontend", title: "Antarmuka" },
    architecture: { label: "Arsitektur", title: "Cara semuanya terhubung" },
    backend: { label: "Backend", title: "API & data" },
    brief: { label: "Ringkas", title: "Masalah, solusi & hasil", problem: "Masalah", built: "Yang saya bangun", outcome: "Hasil" },
    decisions: { label: "Engineering", title: "Keputusan penting" },
    banner: "Rekonstruksi representatif — produk asli bersifat privat. UI, endpoint & arsitektur di bawah ini bersifat ilustratif.",
    apiEndpoints: "Endpoint API",
    dataModel: "Model data",
    notes: "Catatan implementasi",
  },

  seo: {
    home: {
      title: "Rafif Ayyassar Wicaksono — Jasa Pembuatan Website, Aplikasi & AI",
      description:
        "Engineer Backend & AI/ML di Indonesia. Jasa pembuatan website, aplikasi & sistem manajemen, chatbot AI, pipeline data, dan IoT/computer vision — end-to-end.",
      keywords: ["jasa pembuatan website", "jasa pembuatan aplikasi", "jasa bikin website", "jasa bikin aplikasi", "freelance developer indonesia", "jasa pembuatan AI", "programmer freelance"],
    },
    services: {
      title: "Jasa Pembuatan Website, Aplikasi & AI — Rafif A.W.",
      description:
        "Jasa pengembangan profesional: website, aplikasi web & sistem manajemen, AI/chatbot, data & ML, IoT dan computer vision. Remote dari Indonesia ke seluruh dunia.",
      keywords: ["jasa pembuatan website", "jasa pembuatan aplikasi", "jasa pembuatan chatbot AI", "jasa IoT", "jasa computer vision", "jasa deteksi objek", "sistem manajemen aset", "jasa pembuatan sistem informasi"],
    },
    projects: {
      title: "Proyek & Studi Kasus — Rafif A.W.",
      description: "Proyek AI, web, data, dan IoT end-to-end di fintech, telco, dan enterprise.",
      keywords: ["portofolio software", "proyek AI", "proyek pembuatan website"],
    },
    about: {
      title: "Tentang — Rafif Ayyassar Wicaksono",
      description: "Engineer Backend & AI/ML dengan 3+ tahun pengalaman di fintech, telco, dan enterprise. Google Cloud, AWS, FastAPI, LLM/RAG.",
      keywords: ["backend engineer indonesia", "AI/ML engineer", "google cloud", "developer fastapi"],
    },
    contact: {
      title: "Kontak — Pesan Jasa Rafif A.W.",
      description: "Mulai proyek website, aplikasi, atau AI. Hubungi via WhatsApp atau email.",
      keywords: ["kontak developer", "jasa developer indonesia", "freelance web developer indonesia"],
    },
  },
};

export default id;
