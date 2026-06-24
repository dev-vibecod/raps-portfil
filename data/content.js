// ---------------------------------------------------------------------------
// Single source of content for the portfolio.
// Every value here is transcribed verbatim from
// Rafif_Ayyassar_Portfolio_Dossier.pdf. Do not invent or inflate.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Rafif Ayyassar Wicaksono",
  role: "Backend & AI/ML Engineer",
  location: "Bekasi, Indonesia",
  phone: "(+62) 813-9557-6836",
  email: "Rafifwicaksono03@gmail.com",
  linkedin: "https://linkedin.com/in/rafifayyassarwicaksono",
  // Hero pitch — option 1 from the dossier's "NOTES FOR THE WEB PORTFOLIO".
  tagline:
    "Backend & AI/ML engineer building production LLM, data, and backend systems — end-to-end on Google Cloud.",
  taglineAlt:
    "I design and ship AI products end-to-end: RAG chatbots, ML pipelines, and FastAPI backends, deployed and operated in the cloud.",
  note: "Code repositories currently private; live demos available on request.",
};

export const about = {
  paragraphs: [
    "I am a backend and AI/ML engineer with 3+ years of professional experience (since 2022), working across fintech, telco, and enterprise. Over the last two years my focus has shifted to building and deploying Generative AI and backend systems — turning real business problems into working products rather than prototypes.",
    "I design and ship products end-to-end: LLM/RAG applications, machine-learning pipelines, and Python/FastAPI backends, deployed and operated in production. I work primarily on Google Cloud with full end-to-end deployment, and also build on AWS and — for region-specific workloads — Tencent Cloud and Alibaba Cloud. To date I have delivered 20+ freelance projects, most of them owned solo from requirements through deployment.",
    "I tend to operate in solo or small-team setups, lean toward open-source and lightweight, VPS-friendly tooling, and care about the unglamorous parts — reliability, monitoring, and cost. I am comfortable owning the full lifecycle: gathering requirements, designing the architecture, building, testing, deploying, and keeping things running.",
  ],
  // Qualitative facts from the dossier — not invented metrics.
  highlights: [
    { value: "3+", label: "Years experience (since 2022)" },
    { value: "20+", label: "Freelance projects delivered" },
    { value: "4", label: "Clouds: GCP · AWS · Tencent · Alibaba" },
    { value: "E2E", label: "Owned solo, requirements → production" },
  ],
};

export const coreExpertise = [
  {
    title: "Generative AI & LLM applications",
    body: "RAG systems, customer and internal chatbots, agent workflows, natural-language-to-SQL (NL2SQL), prompt engineering, and LLM evaluation.",
  },
  {
    title: "Backend engineering",
    body: "Python/FastAPI services, REST APIs, asynchronous processing, microservices, authentication and role-based access control.",
  },
  {
    title: "Data & ML engineering",
    body: "ETL/ELT pipelines, batch and streaming data, change-data-capture (CDC), ML pipelines from feature engineering to serving, and MLOps.",
  },
  {
    title: "Cloud & deployment",
    body: "Google Cloud end-to-end (primary), AWS, and Tencent/Alibaba for regional workloads; Docker, Kubernetes, CI/CD, infrastructure-as-code, and observability.",
  },
];

export const experience = [
  {
    role: "Software Engineer — AI/ML & GenAI",
    org: "Freelance / Independent",
    note: "concurrent with full-time roles",
    period: "Jun 2022 – Present",
    current: true,
    points: [
      "Have delivered 20+ end-to-end AI/ML and backend projects for fintech, telco, and enterprise clients, from design through production deployment.",
      "Build LLM applications using RAG, Prompt Engineering, and agent workflows on Vertex AI and Dify.ai, for use cases such as customer chatbots, claims fraud detection, and natural-language data querying (NL2SQL).",
      "Build Python/FastAPI backends for AI inference, data processing, and multi-source REST integration.",
      "Deploy across multiple clouds — Google Cloud (primary, end-to-end), AWS, and Tencent Cloud / Alibaba Cloud for region-specific workloads — using Docker, Kubernetes, CI/CD, structured logging, and monitoring.",
      "Automate cross-system workflows with n8n, and use AI coding agents (Claude Code, Antigravity, GitHub Copilot) as part of the day-to-day development workflow.",
    ],
  },
  {
    role: "Data Engineer — ETL",
    org: "Alfagift",
    note: "retail e-commerce",
    period: "Aug 2025 – Apr 2026",
    points: [
      "Automated data retention and cleanup across MongoDB, MySQL, and PostgreSQL via scheduled Python jobs.",
      "Implemented automated database and service upgrades on Cloud SQL, Redis, and Solr using Terraform (IaC).",
      "Built a cold-storage migration pipeline to GCS and BigQuery, reducing cloud storage cost by 20%.",
      "Optimized query performance using EXPLAIN ANALYZE and indexing strategies to speed up slow-running queries.",
      "Developed monitoring dashboards and alerting for database and pipeline health (Grafana, Cloud Operations).",
    ],
  },
  {
    role: "Machine Learning Engineer",
    org: "Insignia (PT. Kreasi Media Asia) × Telkomsel",
    note: "telco",
    period: "Dec 2024 – Mar 2025",
    points: [
      "Developed and deployed Generative AI pipelines on Vertex AI for PDF summarization and metadata extraction.",
      "Built an AI web-scraping pipeline with OpenSearch and Gemini for structured content generation.",
      "Designed asynchronous AI workflows using AWS Lambda, S3, and GCP Cloud Functions; exposed ML services via REST APIs for enterprise integration.",
      "Applied MLOps with Vertex AI Pipelines, Docker, Kubernetes, and GitLab CI/CD.",
    ],
  },
  {
    role: "Data Engineer — Operations",
    org: "Insignia (PT. Kreasi Media Asia) × Telkomsel",
    note: "telco",
    period: "Aug 2024 – Aug 2025",
    points: [
      "Monitored and supported batch and streaming pipelines using Apache Airflow and AWS CloudWatch (L1/L2).",
      "Optimized SQL and partitioning on PostgreSQL and Oracle to reduce data-warehouse cost.",
      "Managed ETL deployments via GitLab CI/CD with version control and rollback support.",
      "Implemented data-quality checks and anomaly detection, reducing manual QA effort by 40%.",
      "Collaborated with DS/ML teams to automate pipelines and maintain data lineage.",
    ],
  },
];

export const earlierExperience = [
  {
    role: "Product Development (Contract)",
    org: "FIF Group",
    note: "fintech",
    period: "Apr 2024 – Jul 2024",
  },
  {
    role: "Product Development Intern",
    org: "Adira Finance",
    note: "fintech",
    period: "Sep 2023 – Mar 2024",
  },
  {
    role: "Data Analyst & Entry Intern",
    org: "Bank Central Asia (BCA)",
    note: "banking",
    period: "Dec 2022 – Sep 2023",
  },
];

export const earlierNote =
  "Before moving into engineering, held HR roles in 2022 (PT Antarestar; PT Lindungi Hutan).";

// ---------------------------------------------------------------------------
// Projects. `asset` describes the dummy Figma visual planned for each.
// `preview` points to the screenshot exported into /public once made.
// ---------------------------------------------------------------------------
export const projects = [
  {
    slug: "insurance-chatbot",
    title: "Insurance Chatbot — Registration & Claims Automation",
    industry: "Insurance / Fintech",
    summary:
      "Conversational assistant that lets customers register policies and file claims through chat.",
    problem:
      "Policy registration and claims involve repetitive form-filling and policy lookups that are slow and support-heavy for routine cases.",
    built:
      "An end-to-end conversational AI that guides users through registration and claims, answers policy questions via retrieval over policy documents, and validates and persists submissions through backend APIs.",
    stack: ["LLM + RAG (Dify)", "Python/FastAPI", "AWS Lambda & S3", "OpenSearch"],
    outcome:
      "Automated routine registration and claims intake through chat, reducing manual handling for common cases; policy answers grounded in source documents via RAG.",
    assetType: "Chat UI mockup",
    preview: "/previews/insurance-chatbot.png",
  },
  {
    slug: "claim-fraud-detection",
    title: "Claim Fraud Detection — ML Pipeline",
    industry: "Insurance / Fintech",
    summary:
      "Machine-learning pipeline that scores insurance claims for fraud risk in real time.",
    problem:
      "Manual fraud review is slow and inconsistent, and suspicious claims need to be surfaced early in the process.",
    built:
      "An end-to-end ML pipeline — feature engineering, model training and evaluation — exposed as a real-time scoring API, with monitoring to track model performance over time.",
    stack: ["Python (scikit-learn)", "FastAPI inference API", "Model-performance monitoring"],
    outcome:
      "Flagged high-risk claims for manual review in real time and integrated scoring into the claims workflow, letting reviewers focus on the riskiest cases.",
    assetType: "Architecture / pipeline diagram",
    preview: "/previews/claim-fraud-detection.png",
  },
  {
    slug: "finance-analyzer",
    title: "Finance Analyzer — Automated Financial Insights",
    industry: "Fintech",
    summary:
      "AI tool that ingests financial data and produces summaries, charts, and insights automatically.",
    problem:
      "Financial analysis and reporting are manual and time-consuming, especially turning raw data into readable insights.",
    built:
      "Data ingestion and processing pipelines with an LLM summarization layer, exposed through backend APIs, plus automated chart and insight generation.",
    stack: ["Python/FastAPI", "Data processing pipelines", "LLM summarization", "Automated visualization"],
    outcome:
      "Replaced manual spreadsheet analysis with automated summaries, charts, and insights generated directly from ingested data.",
    assetType: "Dashboard UI mockup",
    preview: "/previews/finance-analyzer.png",
  },
  {
    slug: "telco-helpdesk-chatbot",
    title: "Telco Customer Helpdesk Chatbot",
    industry: "Telco",
    summary: "AI helpdesk that handles customer complaints and service requests.",
    problem:
      "A high volume of repetitive tier-1 customer queries and complaints strains support teams.",
    built:
      "An AI helpdesk with LLM intent classification and automated ticket routing, integrated with internal ticketing and a knowledge base, and tuned for latency and scale.",
    stack: ["LLM intent classification", "OpenSearch knowledge base", "Internal ticketing integration", "AWS"],
    outcome:
      "Routed and triaged tier-1 tickets automatically, reducing manual handling for common requests.",
    assetType: "Workflow diagram",
    preview: "/previews/telco-helpdesk-chatbot.png",
  },
  {
    slug: "ask-your-data",
    title: "Ask Your Data — NL2SQL AI Engine",
    industry: "Enterprise",
    summary:
      "Natural-language interface that turns business questions into validated SQL with charts.",
    problem:
      "Non-technical users cannot query databases directly and depend on analysts for every question.",
    built:
      "An NL2SQL system that converts natural-language questions into validated SQL, executes them securely via a backend, and auto-generates charts for business users.",
    stack: ["RAG + query validation", "Python/FastAPI (secure execution)", "Auto-charting"],
    outcome:
      "Enabled non-technical users to self-serve data questions in plain language without writing SQL; query validation improves the reliability of generated queries.",
    assetType: "UI mockup (NL → SQL → chart)",
    preview: "/previews/ask-your-data.png",
  },
  {
    slug: "complaint-management",
    title: "Enterprise Complaint Management System",
    industry: "Enterprise",
    summary: "Fullstack web app for logging, routing, and analyzing complaints.",
    problem:
      "Complaints were scattered across channels with no central tracking or analytics.",
    built:
      "A fullstack application — FastAPI backend with PostgreSQL, authentication and role-based access, and a React dashboard with search and analytics for real-time visibility.",
    stack: ["Python/FastAPI", "Google Cloud Run", "PostgreSQL", "Firebase Auth", "React", "OpenSearch"],
    outcome:
      "Centralized complaint intake, routing, and analytics in one app, giving teams real-time visibility into open cases.",
    assetType: "Dashboard UI mockup",
    preview: "/previews/complaint-management.png",
  },
  {
    slug: "internal-helpdesk-chatbot",
    title: "Internal Corporate Helpdesk Chatbot",
    industry: "Enterprise",
    summary: "Internal assistant for HR and operations requests and structured reporting.",
    problem:
      "Employees repeatedly ask HR and operations the same questions, and requests and reporting are handled manually.",
    built:
      "An internal support chatbot orchestrated with prompt flows, with role-based access and indexed knowledge, automating common employee requests and structured reporting workflows.",
    stack: ["Vertex AI", "Dify (orchestration)", "Role-based access", "OpenSearch indexing"],
    outcome:
      "Handled routine HR and operations requests end-to-end, reducing manual workload on internal teams.",
    assetType: "Architecture diagram",
    preview: "/previews/internal-helpdesk-chatbot.png",
  },
  {
    slug: "hr-data-api",
    title: "HR & Employee Data Management API",
    industry: "Enterprise",
    summary: "Backend service for employee records and internal request management.",
    problem:
      "Employee data and internal requests needed a reliable, validated, and queryable backend.",
    built:
      "A scalable backend with validated REST APIs for employee and request management, CI/CD deployment, and analytics and monitoring.",
    stack: ["Python/FastAPI", "Google Cloud Run", "CI/CD", "BigQuery", "Cloud Operations"],
    outcome:
      "Centralized employee records and internal-request handling behind validated APIs, with analytics for reporting.",
    assetType: "Architecture diagram",
    preview: "/previews/hr-data-api.png",
  },
];

export const skills = [
  {
    group: "Generative AI & LLM",
    items: ["RAG", "Prompt Engineering", "Agent Workflows", "MLOps", "LLM evaluation", "OpenAI GPT", "Anthropic Claude", "Google Gemini", "Vertex AI", "Dify.ai", "n8n", "OpenSearch"],
  },
  {
    group: "LLM Frameworks & RAG",
    items: ["LangChain", "LlamaIndex", "LangGraph", "Pydantic AI", "MCP", "pgvector", "Qdrant", "Langfuse", "Ragas", "vLLM", "Ollama"],
  },
  {
    group: "AI-Assisted Development",
    items: ["Claude Code", "Google Antigravity", "GitHub Copilot", "Cursor"],
  },
  {
    group: "Machine Learning",
    items: ["pandas", "NumPy", "Polars", "scikit-learn", "XGBoost", "TensorFlow", "Keras", "PyTorch", "MLflow", "Vertex AI Pipelines"],
  },
  {
    group: "Backend & APIs",
    items: ["Python", "FastAPI", "REST APIs", "Async processing", "Microservices", "Pydantic", "SQLAlchemy", "Shell scripting", "C/C++"],
  },
  {
    group: "Data Engineering",
    items: ["Apache Airflow", "dbt", "Databricks", "Spark / PySpark", "Data Fusion", "ETL/ELT", "Batch & streaming", "Data quality"],
  },
  {
    group: "Streaming & CDC",
    items: ["Apache Kafka", "Redpanda", "Debezium", "Kafka Connect", "Schema Registry", "Apache Flink", "GCP Pub/Sub"],
  },
  {
    group: "Databases",
    items: ["PostgreSQL (+ pgvector)", "MySQL", "Oracle", "SQL Server", "MongoDB", "Redis"],
  },
  {
    group: "Cloud Platforms",
    items: ["Google Cloud (primary)", "Cloud Run", "BigQuery", "Composer", "Vertex AI", "Cloud Functions", "GCS", "Firebase", "Cloud SQL", "AWS (Lambda, S3, CloudWatch, OpenSearch)", "Tencent Cloud", "Alibaba Cloud"],
  },
  {
    group: "DevOps, CI/CD & IaC",
    items: ["Docker", "Kubernetes", "GitLab CI/CD", "GitHub Actions", "Azure DevOps", "Terraform"],
  },
  {
    group: "Observability",
    items: ["Grafana", "Datadog", "AWS CloudWatch", "Cloud Operations", "Structured logging"],
  },
  {
    group: "BI & Visualization",
    items: ["Tableau", "Power BI", "Looker Studio", "Excel"],
  },
];

export const education = {
  school: "Universitas Negeri Jakarta",
  degree: "B.Eng., Automation Engineering Technology",
  period: "2020 – 2024",
  points: [
    "GPA: 3.52 / 4.00.",
    "Thesis: automatic parking system for odd-even license-plate detection using TensorFlow.",
    "Academic projects: RFID smart door lock, smart parking system, heartbeat monitoring system, garbage-monitoring system.",
  ],
};

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
