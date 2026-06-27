// ---------------------------------------------------------------------------
// Core content. English prose is transcribed verbatim from
// Rafif_Ayyassar_Portfolio_Dossier.pdf; Indonesian is a faithful translation
// of the same facts. Bilingual fields are { id, en }; shared fields (names,
// dates, tech, numbers) are plain. Resolve with localize()/pick() from lib/i18n.
// Never invent or inflate beyond the dossier.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Rafif Ayyassar Wicaksono",
  role: "Backend & AI/ML Engineer",
  location: "Bekasi, Indonesia",
  phone: "(+62) 813-9557-6836",
  phoneE164: "6281395576836",
  email: "Rafifwicaksono03@gmail.com",
  linkedin: "https://linkedin.com/in/rafifayyassarwicaksono",
  tagline: {
    en: "Backend & AI/ML engineer building production LLM, data, and backend systems — end-to-end on Google Cloud.",
    id: "Engineer Backend & AI/ML yang membangun sistem LLM, data, dan backend untuk produksi — end-to-end di Google Cloud.",
  },
  taglineAlt: {
    en: "I design and ship AI products end-to-end: RAG chatbots, ML pipelines, and FastAPI backends, deployed and operated in the cloud.",
    id: "Saya merancang dan merilis produk AI end-to-end: chatbot RAG, pipeline ML, dan backend FastAPI, yang di-deploy dan dioperasikan di cloud.",
  },
  note: {
    en: "Code repositories currently private; live demos available on request.",
    id: "Repositori kode saat ini privat; demo langsung tersedia atas permintaan.",
  },
};

export const about = {
  paragraphs: [
    {
      en: "I am a backend and AI/ML engineer with 3+ years of professional experience (since 2022), working across fintech, telco, and enterprise. Over the last two years my focus has shifted to building and deploying Generative AI and backend systems — turning real business problems into working products rather than prototypes.",
      id: "Saya engineer backend dan AI/ML dengan 3+ tahun pengalaman profesional (sejak 2022), bekerja di bidang fintech, telko, dan enterprise. Dalam dua tahun terakhir fokus saya bergeser ke membangun dan men-deploy sistem Generative AI dan backend — mengubah masalah bisnis nyata menjadi produk yang bekerja, bukan sekadar prototipe.",
    },
    {
      en: "I design and ship products end-to-end: LLM/RAG applications, machine-learning pipelines, and Python/FastAPI backends, deployed and operated in production. I work primarily on Google Cloud with full end-to-end deployment, and also build on AWS and — for region-specific workloads — Tencent Cloud and Alibaba Cloud. To date I have delivered 20+ freelance projects, most of them owned solo from requirements through deployment.",
      id: "Saya merancang dan merilis produk end-to-end: aplikasi LLM/RAG, pipeline machine learning, dan backend Python/FastAPI, yang di-deploy dan dioperasikan di produksi. Saya bekerja terutama di Google Cloud dengan deployment end-to-end penuh, juga membangun di AWS dan — untuk beban kerja spesifik regional — Tencent Cloud dan Alibaba Cloud. Hingga kini saya telah menyelesaikan 20+ proyek freelance, sebagian besar dikerjakan solo dari kebutuhan hingga deployment.",
    },
    {
      en: "I tend to operate in solo or small-team setups, lean toward open-source and lightweight, VPS-friendly tooling, and care about the unglamorous parts — reliability, monitoring, and cost. I am comfortable owning the full lifecycle: gathering requirements, designing the architecture, building, testing, deploying, and keeping things running.",
      id: "Saya terbiasa bekerja solo atau dalam tim kecil, condong ke perkakas open-source yang ringan dan ramah VPS, serta peduli pada bagian yang tidak glamor — keandalan, monitoring, dan biaya. Saya nyaman menangani seluruh siklus: menggali kebutuhan, merancang arsitektur, membangun, menguji, men-deploy, dan menjaganya tetap berjalan.",
    },
  ],
  highlights: [
    { value: "3+", label: { en: "Years experience (since 2022)", id: "Tahun pengalaman (sejak 2022)" } },
    { value: "20+", label: { en: "Freelance projects delivered", id: "Proyek freelance selesai" } },
    { value: "4", label: { en: "Clouds: GCP · AWS · Tencent · Alibaba", id: "Cloud: GCP · AWS · Tencent · Alibaba" } },
    { value: "E2E", label: { en: "Owned solo, requirements → production", id: "Solo, dari kebutuhan → produksi" } },
  ],
};

export const coreExpertise = [
  {
    title: { en: "Generative AI & LLM applications", id: "Aplikasi Generative AI & LLM" },
    body: {
      en: "RAG systems, customer and internal chatbots, agent workflows, natural-language-to-SQL (NL2SQL), prompt engineering, and LLM evaluation.",
      id: "Sistem RAG, chatbot pelanggan dan internal, alur kerja agent, natural-language-to-SQL (NL2SQL), prompt engineering, dan evaluasi LLM.",
    },
  },
  {
    title: { en: "Backend engineering", id: "Backend engineering" },
    body: {
      en: "Python/FastAPI services, REST APIs, asynchronous processing, microservices, authentication and role-based access control.",
      id: "Layanan Python/FastAPI, REST API, pemrosesan asinkron, microservices, autentikasi dan kontrol akses berbasis role.",
    },
  },
  {
    title: { en: "Data & ML engineering", id: "Data & ML engineering" },
    body: {
      en: "ETL/ELT pipelines, batch and streaming data, change-data-capture (CDC), ML pipelines from feature engineering to serving, and MLOps.",
      id: "Pipeline ETL/ELT, data batch dan streaming, change-data-capture (CDC), pipeline ML dari feature engineering hingga serving, dan MLOps.",
    },
  },
  {
    title: { en: "Cloud & deployment", id: "Cloud & deployment" },
    body: {
      en: "Google Cloud end-to-end (primary), AWS, and Tencent/Alibaba for regional workloads; Docker, Kubernetes, CI/CD, infrastructure-as-code, and observability.",
      id: "Google Cloud end-to-end (utama), AWS, dan Tencent/Alibaba untuk beban kerja regional; Docker, Kubernetes, CI/CD, infrastructure-as-code, dan observability.",
    },
  },
];

export const experience = [
  {
    role: { en: "Software Engineer — AI/ML & GenAI", id: "Software Engineer — AI/ML & GenAI" },
    org: "Freelance / Independent",
    note: { en: "concurrent with full-time roles", id: "berbarengan dengan peran full-time" },
    period: "Jun 2022 – Present",
    current: true,
    points: [
      {
        en: "Have delivered 20+ end-to-end AI/ML and backend projects for fintech, telco, and enterprise clients, from design through production deployment.",
        id: "Telah menyelesaikan 20+ proyek AI/ML dan backend end-to-end untuk klien fintech, telko, dan enterprise, dari desain hingga deployment produksi.",
      },
      {
        en: "Built and operate OprexDuit, my own personal-finance analytics SaaS (live in production, free, ~2,000 users) — Next.js/React frontend, secure backend with row-level security, and AI-powered spending analysis.",
        id: "Membangun dan mengoperasikan OprexDuit, SaaS analitik keuangan pribadi buatan sendiri (live di produksi, gratis, ~2.000 pengguna) — frontend Next.js/React, backend aman dengan row-level security, dan analisis pengeluaran bertenaga AI.",
      },
      {
        en: "Build LLM applications and automated agent workflows using RAG, Prompt Engineering, and n8n (with Vertex AI), for use cases such as customer chatbots, claims fraud detection, and natural-language data querying (NL2SQL).",
        id: "Membangun aplikasi LLM dan alur kerja agent terotomasi menggunakan RAG, Prompt Engineering, dan n8n (dengan Vertex AI), untuk kasus seperti chatbot pelanggan, deteksi fraud klaim, dan kueri data berbahasa natural (NL2SQL).",
      },
      {
        en: "Build Python/FastAPI backends for AI inference, data processing, and multi-source REST integration.",
        id: "Membangun backend Python/FastAPI untuk inferensi AI, pemrosesan data, dan integrasi REST multi-sumber.",
      },
      {
        en: "Deploy across multiple clouds — Google Cloud (primary, end-to-end), AWS, and Tencent Cloud / Alibaba Cloud for region-specific workloads — using Docker, Kubernetes, CI/CD, structured logging, and monitoring.",
        id: "Men-deploy di beberapa cloud — Google Cloud (utama, end-to-end), AWS, dan Tencent Cloud / Alibaba Cloud untuk beban kerja spesifik regional — menggunakan Docker, Kubernetes, CI/CD, structured logging, dan monitoring.",
      },
      {
        en: "Automate cross-system workflows with n8n, and use AI coding agents (Claude Code, Antigravity, GitHub Copilot) as part of the day-to-day development workflow.",
        id: "Mengotomasi alur kerja lintas sistem dengan n8n, dan memakai AI coding agent (Claude Code, Antigravity, GitHub Copilot) sebagai bagian dari alur pengembangan sehari-hari.",
      },
    ],
  },
  {
    role: { en: "Data Engineer — ETL", id: "Data Engineer — ETL" },
    org: "Alfagift",
    note: { en: "retail e-commerce", id: "ritel e-commerce" },
    period: "Aug 2025 – Apr 2026",
    points: [
      {
        en: "Automated data retention and cleanup across MongoDB, MySQL, and PostgreSQL via scheduled Python jobs.",
        id: "Mengotomasi retensi dan pembersihan data di MongoDB, MySQL, dan PostgreSQL via job Python terjadwal.",
      },
      {
        en: "Implemented automated database and service upgrades on Cloud SQL, Redis, and Solr using Terraform (IaC).",
        id: "Menerapkan upgrade database dan layanan otomatis pada Cloud SQL, Redis, dan Solr menggunakan Terraform (IaC).",
      },
      {
        en: "Built a cold-storage migration pipeline to GCS and BigQuery, reducing cloud storage cost by 20%.",
        id: "Membangun pipeline migrasi cold-storage ke GCS dan BigQuery, menurunkan biaya penyimpanan cloud sebesar 20%.",
      },
      {
        en: "Optimized query performance using EXPLAIN ANALYZE and indexing strategies to speed up slow-running queries.",
        id: "Mengoptimasi performa kueri menggunakan EXPLAIN ANALYZE dan strategi indexing untuk mempercepat kueri yang lambat.",
      },
      {
        en: "Developed monitoring dashboards and alerting for database and pipeline health (Grafana, Cloud Operations).",
        id: "Mengembangkan dashboard monitoring dan alerting untuk kesehatan database dan pipeline (Grafana, Cloud Operations).",
      },
    ],
  },
  {
    role: { en: "Machine Learning Engineer", id: "Machine Learning Engineer" },
    org: "Insignia (PT. Kreasi Media Asia) × Telkomsel",
    note: { en: "telco", id: "telko" },
    period: "Dec 2024 – Mar 2025",
    points: [
      {
        en: "Developed and deployed Generative AI pipelines on Vertex AI for PDF summarization and metadata extraction.",
        id: "Mengembangkan dan men-deploy pipeline Generative AI di Vertex AI untuk peringkasan PDF dan ekstraksi metadata.",
      },
      {
        en: "Built an AI web-scraping pipeline with OpenSearch and Gemini for structured content generation.",
        id: "Membangun pipeline web-scraping AI dengan OpenSearch dan Gemini untuk generasi konten terstruktur.",
      },
      {
        en: "Designed asynchronous AI workflows using AWS Lambda, S3, and GCP Cloud Functions; exposed ML services via REST APIs for enterprise integration.",
        id: "Merancang alur kerja AI asinkron menggunakan AWS Lambda, S3, dan GCP Cloud Functions; mengekspos layanan ML via REST API untuk integrasi enterprise.",
      },
      {
        en: "Applied MLOps with Vertex AI Pipelines, Docker, Kubernetes, and GitLab CI/CD.",
        id: "Menerapkan MLOps dengan Vertex AI Pipelines, Docker, Kubernetes, dan GitLab CI/CD.",
      },
    ],
  },
  {
    role: { en: "Data Engineer — Operations", id: "Data Engineer — Operations" },
    org: "Insignia (PT. Kreasi Media Asia) × Telkomsel",
    note: { en: "telco", id: "telko" },
    period: "Aug 2024 – Aug 2025",
    points: [
      {
        en: "Monitored and supported batch and streaming pipelines using Apache Airflow and AWS CloudWatch (L1/L2).",
        id: "Memantau dan mendukung pipeline batch dan streaming menggunakan Apache Airflow dan AWS CloudWatch (L1/L2).",
      },
      {
        en: "Optimized SQL and partitioning on PostgreSQL and Oracle to reduce data-warehouse cost.",
        id: "Mengoptimasi SQL dan partitioning pada PostgreSQL dan Oracle untuk menekan biaya data warehouse.",
      },
      {
        en: "Managed ETL deployments via GitLab CI/CD with version control and rollback support.",
        id: "Mengelola deployment ETL via GitLab CI/CD dengan version control dan dukungan rollback.",
      },
      {
        en: "Implemented data-quality checks and anomaly detection, reducing manual QA effort by 40%.",
        id: "Menerapkan pemeriksaan kualitas data dan deteksi anomali, mengurangi usaha QA manual sebesar 40%.",
      },
      {
        en: "Collaborated with DS/ML teams to automate pipelines and maintain data lineage.",
        id: "Berkolaborasi dengan tim DS/ML untuk mengotomasi pipeline dan menjaga data lineage.",
      },
    ],
  },
];

export const earlierExperience = [
  { role: { en: "Product Development (Contract)", id: "Product Development (Kontrak)" }, org: "FIF Group", note: { en: "fintech", id: "fintech" }, period: "Apr 2024 – Jul 2024" },
  { role: { en: "Product Development Intern", id: "Magang Product Development" }, org: "Adira Finance", note: { en: "fintech", id: "fintech" }, period: "Sep 2023 – Mar 2024" },
  { role: { en: "Data Analyst & Entry Intern", id: "Magang Data Analyst & Entry" }, org: "Bank Central Asia (BCA)", note: { en: "banking", id: "perbankan" }, period: "Dec 2022 – Sep 2023" },
];

export const earlierNote = {
  en: "Before moving into engineering, held HR roles in 2022 (PT Antarestar; PT Lindungi Hutan).",
  id: "Sebelum beralih ke engineering, sempat mengisi peran HR pada 2022 (PT Antarestar; PT Lindungi Hutan).",
};

export const projects = [
  {
    // Featured, REAL, live product (public). Links to the live site; no
    // representative mockup needed — the preview is a real screenshot.
    slug: "oprexduit",
    featured: true,
    live: true,
    url: "https://oprexduit.vercel.app",
    image: "/projects/oprexduit.png",
    title: "OprexDuit — Personal Finance Analytics SaaS",
    industry: { en: "SaaS · Personal Finance", id: "SaaS · Keuangan Pribadi" },
    metrics: [
      { value: "~2,000", label: { en: "users", id: "pengguna" } },
      { value: "Free", label: { en: "to use", id: "gratis" } },
      { value: "Live", label: { en: "in production", id: "di produksi" } },
    ],
    summary: {
      en: "My own SaaS — a secure personal-finance analytics workspace to track transactions, budgets, and monthly insights, with AI-powered spending analysis.",
      id: "SaaS buatan saya — workspace analitik keuangan pribadi yang aman untuk melacak transaksi, budget, dan insight bulanan, dengan analisis pengeluaran bertenaga AI.",
    },
    problem: {
      en: "Personal finances are scattered across apps and spreadsheets, making it hard to see spending, budgets, and trends in one secure place.",
      id: "Keuangan pribadi tersebar di banyak aplikasi dan spreadsheet, sehingga sulit melihat pengeluaran, budget, dan tren dalam satu tempat yang aman.",
    },
    built: {
      en: "A secure finance workspace with transaction tracking, budgets, monthly reports, asset management, financial planning, and an AI spending analysis (“Belanja AI”) — with row-level security and encrypted sessions.",
      id: "Workspace keuangan yang aman dengan pencatatan transaksi, budget, laporan bulanan, manajemen aset, perencanaan keuangan, dan analisis pengeluaran AI (“Belanja AI”) — dengan row-level security dan sesi terenkripsi.",
    },
    stack: ["Next.js", "React", "Tailwind", "Supabase", "PostgreSQL (RLS)", "Vercel"],
    outcome: {
      en: "Live in production and free to use, with around 2,000 users managing their finances from a single secure dashboard.",
      id: "Live di produksi dan gratis dipakai, dengan sekitar 2.000 pengguna mengelola keuangan dari satu dashboard yang aman.",
    },
  },
  {
    slug: "insurance-chatbot",
    title: "Insurance Chatbot — Registration & Claims Automation",
    industry: { en: "Insurance / Fintech", id: "Asuransi / Fintech" },
    summary: {
      en: "Conversational assistant that lets customers register policies and file claims through chat.",
      id: "Asisten percakapan yang memungkinkan pelanggan mendaftarkan polis dan mengajukan klaim lewat chat.",
    },
    problem: {
      en: "Policy registration and claims involve repetitive form-filling and policy lookups that are slow and support-heavy for routine cases.",
      id: "Pendaftaran polis dan klaim melibatkan pengisian formulir berulang dan pencarian polis yang lambat serta membebani tim support untuk kasus rutin.",
    },
    built: {
      en: "An end-to-end conversational AI that guides users through registration and claims, answers policy questions via retrieval over policy documents, and validates and persists submissions through backend APIs.",
      id: "AI percakapan end-to-end yang memandu pengguna melalui pendaftaran dan klaim, menjawab pertanyaan polis via retrieval atas dokumen polis, serta memvalidasi dan menyimpan pengajuan lewat API backend.",
    },
    stack: ["LLM + RAG", "n8n", "Python/FastAPI", "AWS Lambda & S3", "OpenSearch"],
    outcome: {
      en: "Automated routine registration and claims intake through chat, reducing manual handling for common cases; policy answers grounded in source documents via RAG.",
      id: "Mengotomasi pendaftaran rutin dan intake klaim lewat chat, mengurangi penanganan manual untuk kasus umum; jawaban polis berbasis dokumen sumber via RAG.",
    },
  },
  {
    slug: "claim-fraud-detection",
    title: "Claim Fraud Detection — ML Pipeline",
    industry: { en: "Insurance / Fintech", id: "Asuransi / Fintech" },
    summary: {
      en: "Machine-learning pipeline that scores insurance claims for fraud risk in real time.",
      id: "Pipeline machine learning yang menilai risiko fraud klaim asuransi secara real-time.",
    },
    problem: {
      en: "Manual fraud review is slow and inconsistent, and suspicious claims need to be surfaced early in the process.",
      id: "Review fraud manual lambat dan tidak konsisten, dan klaim mencurigakan perlu terdeteksi lebih awal dalam prosesnya.",
    },
    built: {
      en: "An end-to-end ML pipeline — feature engineering, model training and evaluation — exposed as a real-time scoring API, with monitoring to track model performance over time.",
      id: "Pipeline ML end-to-end — feature engineering, pelatihan dan evaluasi model — yang diekspos sebagai API scoring real-time, dengan monitoring untuk memantau performa model dari waktu ke waktu.",
    },
    stack: ["Python (scikit-learn)", "FastAPI inference API", "Model-performance monitoring"],
    outcome: {
      en: "Flagged high-risk claims for manual review in real time and integrated scoring into the claims workflow, letting reviewers focus on the riskiest cases.",
      id: "Menandai klaim berisiko tinggi untuk review manual secara real-time dan mengintegrasikan scoring ke alur klaim, sehingga reviewer fokus ke kasus paling berisiko.",
    },
  },
  {
    slug: "finance-analyzer",
    title: "Finance Analyzer — Automated Financial Insights",
    industry: { en: "Fintech", id: "Fintech" },
    summary: {
      en: "AI tool that ingests financial data and produces summaries, charts, and insights automatically.",
      id: "Alat AI yang menyerap data keuangan dan menghasilkan ringkasan, grafik, dan insight secara otomatis.",
    },
    problem: {
      en: "Financial analysis and reporting are manual and time-consuming, especially turning raw data into readable insights.",
      id: "Analisis dan pelaporan keuangan dikerjakan manual dan memakan waktu, terutama mengubah data mentah menjadi insight yang mudah dibaca.",
    },
    built: {
      en: "Data ingestion and processing pipelines with an LLM summarization layer, exposed through backend APIs, plus automated chart and insight generation.",
      id: "Pipeline ingesti dan pemrosesan data dengan lapisan peringkasan LLM, diekspos lewat API backend, plus generasi grafik dan insight otomatis.",
    },
    stack: ["Python/FastAPI", "Data processing pipelines", "LLM summarization", "Automated visualization"],
    outcome: {
      en: "Replaced manual spreadsheet analysis with automated summaries, charts, and insights generated directly from ingested data.",
      id: "Menggantikan analisis spreadsheet manual dengan ringkasan, grafik, dan insight otomatis yang dihasilkan langsung dari data yang diserap.",
    },
  },
  {
    slug: "telco-helpdesk-chatbot",
    title: "Telco Customer Helpdesk Chatbot",
    industry: { en: "Telco", id: "Telko" },
    summary: {
      en: "AI helpdesk that handles customer complaints and service requests.",
      id: "Helpdesk AI yang menangani keluhan pelanggan dan permintaan layanan.",
    },
    problem: {
      en: "A high volume of repetitive tier-1 customer queries and complaints strains support teams.",
      id: "Volume tinggi pertanyaan dan keluhan pelanggan tier-1 yang berulang membebani tim support.",
    },
    built: {
      en: "An AI helpdesk with LLM intent classification and automated ticket routing, integrated with internal ticketing and a knowledge base, and tuned for latency and scale.",
      id: "Helpdesk AI dengan klasifikasi intent LLM dan routing tiket otomatis, terintegrasi dengan sistem ticketing internal dan knowledge base, serta dioptimasi untuk latensi dan skala.",
    },
    stack: ["LLM intent classification", "OpenSearch knowledge base", "Internal ticketing integration", "AWS"],
    outcome: {
      en: "Routed and triaged tier-1 tickets automatically, reducing manual handling for common requests.",
      id: "Mengarahkan dan memilah tiket tier-1 secara otomatis, mengurangi penanganan manual untuk permintaan umum.",
    },
  },
  {
    slug: "ask-your-data",
    title: "Ask Your Data — NL2SQL AI Engine",
    industry: { en: "Enterprise", id: "Enterprise" },
    summary: {
      en: "Natural-language interface that turns business questions into validated SQL with charts.",
      id: "Antarmuka bahasa natural yang mengubah pertanyaan bisnis menjadi SQL tervalidasi beserta grafik.",
    },
    problem: {
      en: "Non-technical users cannot query databases directly and depend on analysts for every question.",
      id: "Pengguna non-teknis tidak bisa mengkueri database secara langsung dan bergantung pada analis untuk setiap pertanyaan.",
    },
    built: {
      en: "An NL2SQL system that converts natural-language questions into validated SQL, executes them securely via a backend, and auto-generates charts for business users.",
      id: "Sistem NL2SQL yang mengubah pertanyaan bahasa natural menjadi SQL tervalidasi, mengeksekusinya secara aman via backend, dan otomatis membuat grafik untuk pengguna bisnis.",
    },
    stack: ["RAG + query validation", "Python/FastAPI (secure execution)", "Auto-charting"],
    outcome: {
      en: "Enabled non-technical users to self-serve data questions in plain language without writing SQL; query validation improves the reliability of generated queries.",
      id: "Memungkinkan pengguna non-teknis menjawab pertanyaan data sendiri dalam bahasa sehari-hari tanpa menulis SQL; validasi kueri meningkatkan keandalan kueri yang dihasilkan.",
    },
  },
  {
    slug: "complaint-management",
    title: "Enterprise Complaint Management System",
    industry: { en: "Enterprise", id: "Enterprise" },
    summary: {
      en: "Fullstack web app for logging, routing, and analyzing complaints.",
      id: "Aplikasi web fullstack untuk mencatat, mengarahkan, dan menganalisis keluhan.",
    },
    problem: {
      en: "Complaints were scattered across channels with no central tracking or analytics.",
      id: "Keluhan tersebar di berbagai kanal tanpa pelacakan atau analitik terpusat.",
    },
    built: {
      en: "A fullstack application — FastAPI backend with PostgreSQL, authentication and role-based access, and a React dashboard with search and analytics for real-time visibility.",
      id: "Aplikasi fullstack — backend FastAPI dengan PostgreSQL, autentikasi dan akses berbasis role, serta dashboard React dengan pencarian dan analitik untuk visibilitas real-time.",
    },
    stack: ["Python/FastAPI", "Google Cloud Run", "PostgreSQL", "Firebase Auth", "React", "OpenSearch"],
    outcome: {
      en: "Centralized complaint intake, routing, and analytics in one app, giving teams real-time visibility into open cases.",
      id: "Memusatkan intake, routing, dan analitik keluhan dalam satu aplikasi, memberi tim visibilitas real-time atas kasus yang terbuka.",
    },
  },
  {
    slug: "internal-helpdesk-chatbot",
    title: "Internal Corporate Helpdesk Chatbot",
    industry: { en: "Enterprise", id: "Enterprise" },
    summary: {
      en: "Internal assistant for HR and operations requests and structured reporting.",
      id: "Asisten internal untuk permintaan HR dan operasional serta pelaporan terstruktur.",
    },
    problem: {
      en: "Employees repeatedly ask HR and operations the same questions, and requests and reporting are handled manually.",
      id: "Karyawan berulang kali menanyakan hal yang sama ke HR dan operasional, sementara permintaan dan pelaporan ditangani manual.",
    },
    built: {
      en: "An internal support chatbot orchestrated with prompt flows, with role-based access and indexed knowledge, automating common employee requests and structured reporting workflows.",
      id: "Chatbot dukungan internal yang diorkestrasi dengan prompt flow, dengan akses berbasis role dan knowledge terindeks, mengotomasi permintaan karyawan umum dan alur pelaporan terstruktur.",
    },
    stack: ["n8n (orchestration)", "Vertex AI", "Role-based access", "OpenSearch indexing"],
    outcome: {
      en: "Handled routine HR and operations requests end-to-end, reducing manual workload on internal teams.",
      id: "Menangani permintaan HR dan operasional rutin secara end-to-end, mengurangi beban kerja manual tim internal.",
    },
  },
  {
    slug: "hr-data-api",
    title: "HR & Employee Data Management API",
    industry: { en: "Enterprise", id: "Enterprise" },
    summary: {
      en: "Backend service for employee records and internal request management.",
      id: "Layanan backend untuk data karyawan dan manajemen permintaan internal.",
    },
    problem: {
      en: "Employee data and internal requests needed a reliable, validated, and queryable backend.",
      id: "Data karyawan dan permintaan internal membutuhkan backend yang andal, tervalidasi, dan bisa dikueri.",
    },
    built: {
      en: "A scalable backend with validated REST APIs for employee and request management, CI/CD deployment, and analytics and monitoring.",
      id: "Backend yang skalabel dengan REST API tervalidasi untuk manajemen karyawan dan permintaan, deployment CI/CD, serta analitik dan monitoring.",
    },
    stack: ["Python/FastAPI", "Google Cloud Run", "CI/CD", "BigQuery", "Cloud Operations"],
    outcome: {
      en: "Centralized employee records and internal-request handling behind validated APIs, with analytics for reporting.",
      id: "Memusatkan data karyawan dan penanganan permintaan internal di balik API tervalidasi, dengan analitik untuk pelaporan.",
    },
  },
  {
    // 9th project — REAL, from the dossier Education section (thesis + academic IoT
    // projects). Framed clearly as academic/research, not freelance.
    slug: "smart-parking-detection",
    title: "Smart Parking — Odd-Even License-Plate Detection",
    academic: true,
    industry: { en: "Academic / IoT & Computer Vision", id: "Akademik / IoT & Computer Vision" },
    summary: {
      en: "Undergraduate thesis: an automatic parking system that detects license plates and enforces odd-even rules using TensorFlow.",
      id: "Skripsi S1: sistem parkir otomatis yang mendeteksi pelat nomor dan menerapkan aturan ganjil-genap menggunakan TensorFlow.",
    },
    problem: {
      en: "Manual gate control and odd-even checks at parking entrances are slow and error-prone, and need to happen in real time as vehicles arrive.",
      id: "Kontrol palang manual dan pengecekan ganjil-genap di pintu masuk parkir lambat dan rawan kesalahan, serta harus terjadi real-time saat kendaraan datang.",
    },
    built: {
      en: "A computer-vision system that detects and reads vehicle license plates with a TensorFlow model, applies the odd-even rule against the date, and drives gate control — alongside academic IoT projects (RFID smart door lock, smart parking, heartbeat and garbage monitoring).",
      id: "Sistem computer vision yang mendeteksi dan membaca pelat nomor kendaraan dengan model TensorFlow, menerapkan aturan ganjil-genap berdasarkan tanggal, dan menggerakkan kontrol palang — berdampingan dengan proyek IoT akademik (RFID smart door lock, smart parking, monitoring detak jantung dan sampah).",
    },
    stack: ["TensorFlow", "Computer Vision", "Python", "IoT"],
    outcome: {
      en: "Demonstrated real-time plate detection and automated odd-even gate control as an end-to-end CV + IoT prototype; the basis of the bachelor's thesis (GPA 3.52).",
      id: "Mendemonstrasikan deteksi pelat real-time dan kontrol palang ganjil-genap otomatis sebagai prototipe CV + IoT end-to-end; menjadi dasar skripsi S1 (IPK 3,52).",
    },
  },
];

export const skills = [
  { group: { en: "Generative AI & LLM", id: "Generative AI & LLM" }, items: ["RAG", "Prompt Engineering", "Agent Workflows", "n8n", "MLOps", "LLM evaluation", "OpenAI GPT", "Anthropic Claude", "Google Gemini", "Vertex AI", "OpenSearch"] },
  { group: { en: "LLM Frameworks & RAG", id: "Framework LLM & RAG" }, items: ["LangChain", "LlamaIndex", "LangGraph", "Pydantic AI", "MCP", "pgvector", "Qdrant", "Langfuse", "Ragas", "vLLM", "Ollama"] },
  { group: { en: "AI-Assisted Development", id: "AI-Assisted Development" }, items: ["Claude Code", "Google Antigravity", "GitHub Copilot", "Cursor"] },
  { group: { en: "Machine Learning", id: "Machine Learning" }, items: ["pandas", "NumPy", "Polars", "scikit-learn", "XGBoost", "TensorFlow", "Keras", "PyTorch", "MLflow", "Vertex AI Pipelines"] },
  { group: { en: "Backend & APIs", id: "Backend & API" }, items: ["Python", "FastAPI", "REST APIs", "Async processing", "Microservices", "Pydantic", "SQLAlchemy", "Shell scripting", "C/C++"] },
  { group: { en: "Data Engineering", id: "Data Engineering" }, items: ["Apache Airflow", "dbt", "Databricks", "Spark / PySpark", "Data Fusion", "ETL/ELT", "Batch & streaming", "Data quality"] },
  { group: { en: "Streaming & CDC", id: "Streaming & CDC" }, items: ["Apache Kafka", "Redpanda", "Debezium", "Kafka Connect", "Schema Registry", "Apache Flink", "GCP Pub/Sub"] },
  { group: { en: "Databases", id: "Database" }, items: ["PostgreSQL (+ pgvector)", "MySQL", "Oracle", "SQL Server", "MongoDB", "Redis"] },
  { group: { en: "Cloud Platforms", id: "Platform Cloud" }, items: ["Google Cloud (primary)", "Cloud Run", "BigQuery", "Composer", "Vertex AI", "Cloud Functions", "GCS", "Firebase", "Cloud SQL", "AWS (Lambda, S3, CloudWatch, OpenSearch)", "Tencent Cloud", "Alibaba Cloud"] },
  { group: { en: "DevOps, CI/CD & IaC", id: "DevOps, CI/CD & IaC" }, items: ["Docker", "Kubernetes", "GitLab CI/CD", "GitHub Actions", "Azure DevOps", "Terraform"] },
  { group: { en: "Observability", id: "Observability" }, items: ["Grafana", "Datadog", "AWS CloudWatch", "Cloud Operations", "Structured logging"] },
  { group: { en: "BI & Visualization", id: "BI & Visualisasi" }, items: ["Tableau", "Power BI", "Looker Studio", "Excel"] },
];

export const education = {
  school: "Universitas Negeri Jakarta",
  degree: { en: "B.Eng., Automation Engineering Technology", id: "S.Tr., Teknologi Rekayasa Otomasi" },
  period: "2020 – 2024",
  points: [
    { en: "GPA: 3.52 / 4.00.", id: "IPK: 3,52 / 4,00." },
    { en: "Thesis: automatic parking system for odd-even license-plate detection using TensorFlow.", id: "Skripsi: sistem parkir otomatis untuk deteksi pelat nomor ganjil-genap menggunakan TensorFlow." },
    { en: "Academic projects: RFID smart door lock, smart parking system, heartbeat monitoring system, garbage-monitoring system.", id: "Proyek akademik: RFID smart door lock, sistem smart parking, sistem monitoring detak jantung, sistem monitoring sampah." },
  ],
};
