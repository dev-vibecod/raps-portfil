// ---------------------------------------------------------------------------
// ILLUSTRATIVE project detail content, keyed by project slug.
//
// IMPORTANT: Unlike data/content.js (which is transcribed verbatim from the
// dossier), the material here is a REPRESENTATIVE RECONSTRUCTION. The real
// products and repositories are private, so the frontend mockups, API
// endpoints, data models, and architecture below are plausible illustrations
// built to match the stack and purpose described in the dossier — not the
// actual production systems. Every detail page surfaces this clearly.
//
// Shapes:
//   mockup: { type: 'chat'|'dashboard'|'query', url, data }
//   detail: { overview, frontend{blurb,features[]}, backend{blurb,endpoints[],entities[],notes[]},
//             architecture{blurb,flow[],layers[]}, decisions[] }
// ---------------------------------------------------------------------------

export const projectDetails = {
  // =========================================================================
  "insurance-chatbot": {
    mockup: {
      type: "chat",
      url: "app.policyassist.ai/chat",
      data: {
        initials: "PA",
        app: "PolicyAssist",
        subtitle: "Insurance assistant · online",
        inputPlaceholder: "Ask about a policy or start a claim…",
        messages: [
          { from: "bot", text: "Hi! I can help you register a policy or file a claim. What would you like to do?" },
          { from: "user", text: "File a claim for my car policy" },
          { from: "bot", text: "Found policy AUTO-4821. Please confirm the incident details below." },
          {
            card: {
              title: "Claim details",
              fields: [
                { label: "Incident date", value: "12 Jun 2026" },
                { label: "Damage type", value: "Front bumper · collision" },
              ],
              button: "Submit claim",
            },
          },
          { from: "bot", text: "Claim CLM-20517 submitted. Your deductible for this policy is IDR 500,000.", source: "Policy_AUTO_terms.pdf" },
        ],
      },
    },
    detail: {
      overview:
        "A conversational assistant that walks customers through policy registration and claims filing in plain chat, grounding every policy answer in the customer's actual documents through retrieval-augmented generation.",
      frontend: {
        blurb:
          "A focused single-thread chat surface embeddable in web and mobile. The model drives the flow but collects structured data through inline form cards, so submissions stay validated.",
        features: [
          "Guided registration & claims flows with inline form cards",
          "RAG answers with cited source documents",
          "Typing/streaming responses and quick-reply suggestions",
          "Resumable sessions and human-handoff fallback",
        ],
      },
      backend: {
        blurb:
          "A Python/FastAPI service orchestrates the LLM, retrieval, and persistence. Documents are chunked and indexed in OpenSearch; submissions are validated with Pydantic before being persisted via downstream APIs.",
        endpoints: [
          { method: "POST", path: "/v1/chat/messages", desc: "Send a user turn, stream assistant reply" },
          { method: "POST", path: "/v1/claims", desc: "Validate & persist a claim submission" },
          { method: "POST", path: "/v1/policies/register", desc: "Register a new policy from collected fields" },
          { method: "GET", path: "/v1/policies/{policyId}", desc: "Fetch policy details for grounding" },
          { method: "POST", path: "/v1/rag/search", desc: "Semantic search over policy documents" },
        ],
        entities: [
          { name: "Conversation", fields: ["id", "customerId", "state", "messages[]"] },
          { name: "Claim", fields: ["id", "policyId", "incidentDate", "type", "status", "documents[]"] },
          { name: "PolicyDocChunk", fields: ["id", "policyId", "text", "embedding", "sourceFile"] },
        ],
        notes: [
          "Dify orchestrates prompt flows and tool calls",
          "AWS Lambda for async document ingestion, S3 for uploads",
          "OpenSearch for semantic search and conversation logging",
        ],
      },
      architecture: {
        blurb:
          "User turns hit a stateless FastAPI gateway, which calls the Dify-orchestrated LLM. Retrieval is served from OpenSearch; document ingestion runs asynchronously on Lambda.",
        flow: ["Chat client", "FastAPI gateway", "Dify (LLM + tools)", "OpenSearch RAG", "Claims / Policy APIs"],
        layers: [
          { name: "Experience", items: ["Embeddable chat UI", "Form cards"] },
          { name: "Orchestration", items: ["Dify prompt flows", "Tool calling", "Validation"] },
          { name: "Retrieval & data", items: ["OpenSearch index", "S3 documents", "Policy/Claims store"] },
          { name: "Async", items: ["Lambda ingestion", "Chunk + embed pipeline"] },
        ],
      },
      decisions: [
        "RAG over policy PDFs keeps answers grounded and auditable, avoiding hallucinated coverage terms.",
        "Structured form cards instead of free-text parsing make submissions reliable and validatable.",
        "Stateless API + externalized session state so the service scales horizontally.",
      ],
    },
  },

  // =========================================================================
  "claim-fraud-detection": {
    mockup: {
      type: "dashboard",
      url: "fraud-ops.internal/queue",
      data: {
        initials: "FD",
        app: "Fraud Review Queue",
        subtitle: "Real-time claim risk scoring",
        kpis: [
          { label: "Scored today", value: "1,284" },
          { label: "Flagged", value: "73", delta: "5.7% of volume", tone: "warn" },
          { label: "Avg. latency", value: "142 ms", tone: "good" },
          { label: "Model AUC", value: "0.91", tone: "acc" },
        ],
        chart: { title: "Risk score distribution", bars: [20, 34, 48, 62, 80, 64, 42, 28, 18, 12] },
        table: {
          title: "Top flagged claims",
          rows: [
            { label: "CLM-20517", status: "High" },
            { label: "CLM-20488", status: "High" },
            { label: "CLM-20461", status: "Medium" },
            { label: "CLM-20452", status: "Medium" },
            { label: "CLM-20440", status: "Low" },
          ],
        },
      },
    },
    detail: {
      overview:
        "An end-to-end ML pipeline that scores incoming insurance claims for fraud risk in real time, surfacing the riskiest cases to human reviewers while letting low-risk claims flow through automatically.",
      frontend: {
        blurb:
          "An internal review console for the fraud team: a live queue ordered by risk, a score-distribution view, and per-claim explanations so analysts can act on the riskiest cases first.",
        features: [
          "Live risk-ranked review queue",
          "Per-claim feature contributions (explainability)",
          "Score distribution & model-health widgets",
          "Reviewer disposition feeds back as labels",
        ],
      },
      backend: {
        blurb:
          "A FastAPI inference service wraps a scikit-learn model behind a low-latency scoring endpoint. Feature engineering is shared between training and serving to avoid skew; predictions and outcomes are logged for monitoring.",
        endpoints: [
          { method: "POST", path: "/v1/score", desc: "Score a claim, return risk + reason codes" },
          { method: "POST", path: "/v1/score/batch", desc: "Batch scoring for backfills" },
          { method: "GET", path: "/v1/claims/flagged", desc: "Risk-ranked review queue" },
          { method: "POST", path: "/v1/feedback", desc: "Record reviewer disposition as a label" },
          { method: "GET", path: "/v1/model/metrics", desc: "Live performance & drift metrics" },
        ],
        entities: [
          { name: "ClaimFeatures", fields: ["claimId", "amount", "tenure", "priorClaims", "...derived"] },
          { name: "Prediction", fields: ["claimId", "riskScore", "band", "reasonCodes[]", "modelVersion"] },
          { name: "ReviewLabel", fields: ["claimId", "reviewerId", "isFraud", "decidedAt"] },
        ],
        notes: [
          "scikit-learn pipeline (preprocess + model) serialized per version",
          "Shared feature module for train/serve parity",
          "Prediction & outcome logging for drift detection",
        ],
      },
      architecture: {
        blurb:
          "Claims enter the scoring API, pass through the shared feature pipeline and model, and are routed by risk band. A monitoring loop compares predictions to reviewer outcomes and raises drift alerts that trigger retraining.",
        flow: ["Incoming claim", "FastAPI scoring API", "Feature pipeline", "Fraud model", "Risk routing"],
        layers: [
          { name: "Serving", items: ["FastAPI inference", "Reason codes", "Risk routing"] },
          { name: "Modeling", items: ["Feature engineering", "scikit-learn model", "Train/eval"] },
          { name: "Monitoring", items: ["Prediction logs", "Drift detection", "Retrain trigger"] },
        ],
      },
      decisions: [
        "A single shared feature module for training and serving eliminates train/serve skew.",
        "Risk bands (not just a raw score) keep the reviewer workflow simple and actionable.",
        "Capturing reviewer dispositions closes the loop for continuous retraining.",
      ],
    },
  },

  // =========================================================================
  "finance-analyzer": {
    mockup: {
      type: "dashboard",
      url: "app.finanalyzer.io/overview",
      data: {
        initials: "FA",
        app: "Finance Analyzer",
        subtitle: "Automated financial insights",
        kpis: [
          { label: "Revenue", value: "$1.84M", delta: "+12.4% MoM", tone: "good" },
          { label: "Expenses", value: "$1.12M", delta: "+3.1% MoM", tone: "warn" },
          { label: "Net margin", value: "39.1%", delta: "+2.0 pts", tone: "good" },
          { label: "Runway", value: "18 mo", tone: "acc" },
        ],
        chart: { title: "Monthly cash flow", bars: [40, 55, 48, 70, 62, 82, 74, 95, 88, 100] },
        table: {
          title: "AI insights",
          rows: [
            { label: "Revenue up, led by enterprise", value: "▲" },
            { label: "Vendor costs main expense driver", value: "•" },
            { label: "Best margin quarter to date", value: "▲" },
            { label: "Review Q3 marketing ROI", value: "!" },
          ],
        },
      },
    },
    detail: {
      overview:
        "An AI tool that ingests raw financial data and turns it into readable summaries, charts, and insights automatically — replacing manual spreadsheet analysis with a generated narrative over the numbers.",
      frontend: {
        blurb:
          "A reporting dashboard with KPI tiles, trend charts, and an AI-written insight panel. Users upload or connect a data source and get a narrated breakdown without touching a spreadsheet.",
        features: [
          "KPI tiles with period-over-period deltas",
          "Auto-generated charts from ingested data",
          "LLM-written insight narrative with callouts",
          "Exportable report snapshots",
        ],
      },
      backend: {
        blurb:
          "Ingestion and processing pipelines normalize incoming data, compute metrics, and pass aggregates to an LLM summarization layer. Backend APIs expose both the metrics and the generated narrative.",
        endpoints: [
          { method: "POST", path: "/v1/ingest", desc: "Upload / connect a financial dataset" },
          { method: "GET", path: "/v1/metrics", desc: "Computed KPIs & time series" },
          { method: "POST", path: "/v1/insights/generate", desc: "LLM summary over aggregates" },
          { method: "GET", path: "/v1/charts/{metric}", desc: "Chart-ready series for a metric" },
          { method: "GET", path: "/v1/reports/{id}", desc: "Fetch a saved report snapshot" },
        ],
        entities: [
          { name: "Dataset", fields: ["id", "source", "period", "rowCount", "status"] },
          { name: "Metric", fields: ["key", "value", "delta", "period"] },
          { name: "Insight", fields: ["id", "datasetId", "text", "severity", "metricRefs[]"] },
        ],
        notes: [
          "Pipeline normalizes & aggregates before the LLM step",
          "LLM only sees aggregates, never raw rows — cheaper & safer",
          "Automated visualization layer generates chart specs",
        ],
      },
      architecture: {
        blurb:
          "Raw data is ingested and processed into metrics; the summarization layer prompts an LLM over those aggregates to produce insights, which are served alongside chart specs to the dashboard.",
        flow: ["Data source", "Ingestion pipeline", "Metric aggregation", "LLM summarization", "Dashboard + charts"],
        layers: [
          { name: "Ingestion", items: ["Upload / connectors", "Normalization", "Validation"] },
          { name: "Processing", items: ["Metric computation", "Aggregation", "Chart specs"] },
          { name: "Intelligence", items: ["LLM summarization", "Insight ranking"] },
        ],
      },
      decisions: [
        "Feeding the LLM only aggregates (not raw rows) cuts cost and avoids leaking sensitive detail.",
        "Deterministic metric computation in code; the LLM only narrates — keeps numbers trustworthy.",
        "Chart specs generated server-side so the frontend stays thin.",
      ],
    },
  },

  // =========================================================================
  "telco-helpdesk-chatbot": {
    mockup: {
      type: "chat",
      url: "care.telco.id/assistant",
      data: {
        initials: "TC",
        app: "Telco Care Assistant",
        subtitle: "Customer helpdesk · online",
        inputPlaceholder: "Describe your issue…",
        messages: [
          { from: "bot", text: "Hi! I can help with billing, data packages, or report a service issue. What's going on?" },
          { from: "user", text: "My internet has been down since this morning" },
          { from: "bot", text: "Sorry about that. I've detected an outage in your area (cell BKS-14). I've opened ticket TKT-88231 and routed it to network ops.", source: "kb/outage-handling" },
          { from: "bot", text: "Estimated restoration is 3 hours. Want SMS updates on this ticket?" },
          { from: "user", text: "Yes please" },
        ],
      },
    },
    detail: {
      overview:
        "An AI helpdesk that handles high-volume tier-1 customer complaints and service requests — classifying intent, answering from a knowledge base, and routing tickets automatically, all tuned for latency and scale.",
      frontend: {
        blurb:
          "A customer-facing chat widget across web and app. It resolves common requests inline and, when needed, opens and tracks a ticket without the customer leaving the conversation.",
        features: [
          "Intent-aware replies with quick actions",
          "Inline ticket creation & status tracking",
          "Knowledge-base answers for tier-1 queries",
          "Seamless escalation to a human agent",
        ],
      },
      backend: {
        blurb:
          "An LLM classifies intent and either answers from the OpenSearch knowledge base or routes a ticket into the internal ticketing system. The service is tuned for concurrency and low latency under load.",
        endpoints: [
          { method: "POST", path: "/v1/assistant/turn", desc: "Classify intent & generate response" },
          { method: "POST", path: "/v1/tickets", desc: "Create & route a ticket" },
          { method: "GET", path: "/v1/tickets/{id}", desc: "Ticket status for tracking" },
          { method: "POST", path: "/v1/kb/search", desc: "Search the knowledge base" },
          { method: "POST", path: "/v1/escalate", desc: "Hand off to a live agent" },
        ],
        entities: [
          { name: "Intent", fields: ["label", "confidence", "entities{}"] },
          { name: "Ticket", fields: ["id", "category", "priority", "queue", "status"] },
          { name: "KBArticle", fields: ["id", "title", "body", "embedding", "tags[]"] },
        ],
        notes: [
          "LLM intent classification with confidence thresholds",
          "OpenSearch knowledge base for grounded answers",
          "Routing rules map intents → ticketing queues (AWS)",
        ],
      },
      architecture: {
        blurb:
          "Each message is classified; FAQ-type intents are answered from the knowledge base, complaints are routed into ticketing, and low-confidence or complex cases escalate to a human agent.",
        flow: ["Customer message", "Intent classification", "KB answer / ticket routing", "Internal ticketing", "Reply / escalation"],
        layers: [
          { name: "Understanding", items: ["Intent classification", "Entity extraction", "Confidence gating"] },
          { name: "Resolution", items: ["KB retrieval", "Ticket routing rules", "Escalation"] },
          { name: "Scale", items: ["Async workers", "Latency tuning", "AWS integration"] },
        ],
      },
      decisions: [
        "Confidence thresholds decide answer-vs-route-vs-escalate, keeping automation safe.",
        "Routing rules are declarative (intent → queue) so ops can tune them without code changes.",
        "Tuned for concurrency since tier-1 volume is bursty and latency-sensitive.",
      ],
    },
  },

  // =========================================================================
  "ask-your-data": {
    mockup: {
      type: "query",
      url: "ask.yourdata.app",
      data: {
        app: "Ask Your Data",
        subtitle: "Natural language → validated SQL → charts",
        query: "Show monthly revenue by region for 2024",
        sql: [
          "SELECT region,",
          "       DATE_TRUNC('month', order_date) AS month,",
          "       SUM(amount) AS revenue",
          "FROM   orders",
          "WHERE  EXTRACT(YEAR FROM order_date) = 2024",
          "GROUP  BY region, month",
          "ORDER  BY month;",
        ],
        result: {
          title: "Revenue by region",
          rows: [
            { label: "APAC", value: "$1.5M", pct: 80 },
            { label: "EMEA", value: "$1.2M", pct: 64 },
            { label: "NA", value: "$1.9M", pct: 100 },
            { label: "LATAM", value: "$0.8M", pct: 42 },
          ],
        },
      },
    },
    detail: {
      overview:
        "A natural-language interface that turns business questions into validated SQL, executes it securely, and auto-generates charts — letting non-technical users self-serve data without depending on analysts.",
      frontend: {
        blurb:
          "An ask-anything bar over the company's data. Users type a question; the app shows the generated SQL (with a validation badge for transparency) and renders the result as a chart.",
        features: [
          "Plain-language question box with suggestions",
          "Transparent, read-only generated SQL",
          "Validation badge before any execution",
          "Auto-charting of results + export",
        ],
      },
      backend: {
        blurb:
          "A FastAPI service grounds the schema via RAG, generates SQL, and runs it through a validation gate (read-only, allow-listed tables, row limits) before executing against the warehouse with a least-privilege connection.",
        endpoints: [
          { method: "POST", path: "/v1/ask", desc: "NL question → candidate SQL" },
          { method: "POST", path: "/v1/sql/validate", desc: "Static checks: read-only, scope, limits" },
          { method: "POST", path: "/v1/sql/execute", desc: "Run validated SQL (least-privilege)" },
          { method: "POST", path: "/v1/charts/suggest", desc: "Pick a chart for the result shape" },
          { method: "GET", path: "/v1/schema", desc: "Indexed schema for grounding" },
        ],
        entities: [
          { name: "Question", fields: ["id", "text", "userId", "generatedSql", "status"] },
          { name: "SchemaDoc", fields: ["table", "columns[]", "description", "embedding"] },
          { name: "QueryResult", fields: ["questionId", "columns[]", "rows[]", "chartType"] },
        ],
        notes: [
          "RAG over schema docs grounds generation in real tables",
          "Validation gate: read-only, allow-list, mandatory LIMIT",
          "Execution uses a least-privilege, read-only DB role",
        ],
      },
      architecture: {
        blurb:
          "A question is grounded against indexed schema, translated to SQL, validated by a static gate, then executed under a read-only role. Results flow to an auto-charting step before returning to the user.",
        flow: ["NL question", "Schema-grounded generation", "Validation gate", "Secure execution", "Auto-chart"],
        layers: [
          { name: "Generation", items: ["Schema RAG", "SQL synthesis", "Few-shot examples"] },
          { name: "Safety", items: ["Read-only check", "Table allow-list", "Row limits"] },
          { name: "Delivery", items: ["Least-privilege execution", "Chart suggestion"] },
        ],
      },
      decisions: [
        "A hard validation gate (read-only, allow-list, limits) is the safety boundary — the LLM never executes directly.",
        "Showing the generated SQL builds user trust and makes results auditable.",
        "Least-privilege DB role means even a bad query can't mutate or over-read data.",
      ],
    },
  },

  // =========================================================================
  "complaint-management": {
    mockup: {
      type: "dashboard",
      url: "app.complaints.gov-corp.id",
      data: {
        initials: "CM",
        app: "Complaint Management",
        subtitle: "Centralized intake, routing & analytics",
        kpis: [
          { label: "Open", value: "42", tone: "warn" },
          { label: "In progress", value: "18", tone: "acc" },
          { label: "Resolved", value: "311", tone: "good" },
          { label: "Avg. resolution", value: "1.4 d" },
        ],
        chart: { title: "Complaints by channel", bars: [70, 90, 55, 40, 30] },
        table: {
          title: "Recent complaints",
          rows: [
            { label: "#10231 · Billing", status: "Open" },
            { label: "#10230 · App crash", status: "In progress" },
            { label: "#10229 · Delivery", status: "Resolved" },
            { label: "#10228 · Refund", status: "Open" },
            { label: "#10227 · Access", status: "Resolved" },
          ],
        },
      },
    },
    detail: {
      overview:
        "A fullstack web app that centralizes complaint logging, routing, and analytics — pulling complaints scattered across channels into one place with real-time visibility for the teams handling them.",
      frontend: {
        blurb:
          "A React dashboard with role-based views: intake forms, a searchable/filterable complaint table with status workflow, and analytics on volume, channel mix, and resolution time.",
        features: [
          "Searchable, filterable complaint table",
          "Status workflow & assignment",
          "Role-based access (agent / supervisor / admin)",
          "Analytics: volume, channels, resolution time",
        ],
      },
      backend: {
        blurb:
          "A FastAPI backend over PostgreSQL with Firebase Authentication and role-based access control. OpenSearch powers search and analytics; the whole thing is deployed on Google Cloud Run.",
        endpoints: [
          { method: "POST", path: "/v1/complaints", desc: "Create a complaint (any channel)" },
          { method: "GET", path: "/v1/complaints", desc: "Search / filter / paginate" },
          { method: "PATCH", path: "/v1/complaints/{id}", desc: "Update status / assignee" },
          { method: "GET", path: "/v1/analytics/summary", desc: "Volume, channels, resolution time" },
          { method: "POST", path: "/v1/auth/verify", desc: "Verify Firebase token → role" },
        ],
        entities: [
          { name: "Complaint", fields: ["id", "subject", "channel", "status", "assigneeId", "createdAt"] },
          { name: "User", fields: ["id", "email", "role", "team"] },
          { name: "AuditEvent", fields: ["complaintId", "actorId", "action", "at"] },
        ],
        notes: [
          "PostgreSQL system of record; OpenSearch for search/analytics",
          "Firebase Auth + RBAC on every endpoint",
          "Deployed on Google Cloud Run with CI/CD",
        ],
      },
      architecture: {
        blurb:
          "Complaints from multiple channels land in the FastAPI backend on Cloud Run, persist to PostgreSQL, and are indexed into OpenSearch for the React dashboard's search and analytics views.",
        flow: ["Multi-channel intake", "FastAPI (Cloud Run)", "PostgreSQL", "OpenSearch index", "React dashboard"],
        layers: [
          { name: "Frontend", items: ["React dashboard", "RBAC views", "Analytics"] },
          { name: "API", items: ["FastAPI", "Firebase Auth", "Validation"] },
          { name: "Data", items: ["PostgreSQL", "OpenSearch", "Audit log"] },
        ],
      },
      decisions: [
        "PostgreSQL as the system of record, OpenSearch as a derived index — search never compromises consistency.",
        "RBAC enforced server-side on every endpoint, not just hidden in the UI.",
        "Cloud Run keeps ops light: scale-to-zero, managed TLS, simple CI/CD.",
      ],
    },
  },

  // =========================================================================
  "internal-helpdesk-chatbot": {
    mockup: {
      type: "chat",
      url: "intranet.corp/helpdesk",
      data: {
        initials: "HR",
        app: "Internal Helpdesk",
        subtitle: "HR & Ops assistant · online",
        inputPlaceholder: "Ask HR or Ops a question…",
        messages: [
          { from: "bot", text: "Hi! I can help with leave, payroll, IT requests, and company policies. What do you need?" },
          { from: "user", text: "How many annual leave days do I have left?" },
          { from: "bot", text: "You have 8 of 12 annual leave days remaining for 2026. Want me to file a leave request?", source: "hr/leave-policy-2026" },
          { from: "user", text: "Yes, 14-15 July please" },
          { from: "bot", text: "Leave request LR-3092 for 14-15 Jul submitted to your manager for approval." },
        ],
      },
    },
    detail: {
      overview:
        "An internal assistant that handles repetitive HR and operations requests and structured reporting — orchestrated with prompt flows, with role-based access and indexed company knowledge.",
      frontend: {
        blurb:
          "An intranet chat assistant for employees. It answers policy questions from indexed knowledge and completes common requests (leave, IT, reimbursements) through structured flows scoped by the employee's role.",
        features: [
          "Policy Q&A from indexed knowledge",
          "Structured request flows (leave, IT, reimbursement)",
          "Role-scoped answers & actions",
          "Structured reporting / export for ops",
        ],
      },
      backend: {
        blurb:
          "Dify orchestrates prompt flows and tool calls on top of Vertex AI. Role-based access gates what each employee can see and do; company knowledge is indexed in OpenSearch.",
        endpoints: [
          { method: "POST", path: "/v1/assistant/ask", desc: "Answer a question via prompt flow" },
          { method: "POST", path: "/v1/requests", desc: "File a structured request (leave/IT/…)" },
          { method: "GET", path: "/v1/requests/{id}", desc: "Request status" },
          { method: "POST", path: "/v1/kb/search", desc: "Search indexed company knowledge" },
          { method: "GET", path: "/v1/reports/{type}", desc: "Generate a structured report" },
        ],
        entities: [
          { name: "Employee", fields: ["id", "name", "role", "department", "managerId"] },
          { name: "Request", fields: ["id", "type", "payload{}", "status", "approverId"] },
          { name: "KnowledgeDoc", fields: ["id", "title", "body", "audience", "embedding"] },
        ],
        notes: [
          "Vertex AI as the model backbone",
          "Dify for orchestration & prompt flows",
          "Role-based access + OpenSearch knowledge index",
        ],
      },
      architecture: {
        blurb:
          "An employee request is checked against role-based access, answered via Dify-orchestrated prompt flows on Vertex AI (grounded in OpenSearch knowledge), and either resolved directly or filed as a structured request.",
        flow: ["Employee", "RBAC check", "Dify prompt flow (Vertex AI)", "OpenSearch knowledge", "Resolve / file request"],
        layers: [
          { name: "Access", items: ["Role-based access", "Audience scoping"] },
          { name: "Orchestration", items: ["Dify prompt flows", "Vertex AI", "Tool calls"] },
          { name: "Knowledge", items: ["OpenSearch index", "Structured reporting"] },
        ],
      },
      decisions: [
        "Role-based access scopes both answers and actions — employees only see what they should.",
        "Prompt flows (not a single mega-prompt) keep each request type predictable and maintainable.",
        "Structured requests produce clean records for downstream reporting.",
      ],
    },
  },

  // =========================================================================
  "hr-data-api": {
    mockup: {
      type: "dashboard",
      url: "admin.hr-platform.corp",
      data: {
        initials: "HR",
        app: "HR Data Console",
        subtitle: "Employee records & request management",
        kpis: [
          { label: "Employees", value: "1,240" },
          { label: "Open requests", value: "37", tone: "warn" },
          { label: "API uptime", value: "99.9%", tone: "good" },
          { label: "p95 latency", value: "86 ms", tone: "acc" },
        ],
        chart: { title: "Requests per week", bars: [50, 62, 48, 70, 65, 80, 72, 90] },
        table: {
          title: "Recent records",
          rows: [
            { label: "E-1042 · A. Putra", status: "Active" },
            { label: "E-1041 · R. Sari", status: "Active" },
            { label: "REQ-3092 · Leave", status: "Pending" },
            { label: "E-1039 · D. Nugroho", status: "Active" },
            { label: "REQ-3088 · Transfer", status: "Pending" },
          ],
        },
      },
    },
    detail: {
      overview:
        "A backend service for employee records and internal request management — validated REST APIs with CI/CD deployment, analytics, and monitoring, giving downstream apps a reliable, queryable source of truth.",
      frontend: {
        blurb:
          "An admin console (illustrative) over the API: searchable employee records, a request inbox with approvals, and operational widgets for API health — the kind of thin UI such a backend powers.",
        features: [
          "Searchable employee directory",
          "Request inbox with approval workflow",
          "API health & latency widgets",
          "Analytics powered by BigQuery",
        ],
      },
      backend: {
        blurb:
          "A Python/FastAPI service with strong Pydantic validation on every request and response. Deployed on Google Cloud Run via CI/CD, with analytics streamed to BigQuery and monitoring through Cloud Operations.",
        endpoints: [
          { method: "GET", path: "/v1/employees", desc: "List / search employees" },
          { method: "POST", path: "/v1/employees", desc: "Create a validated employee record" },
          { method: "PATCH", path: "/v1/employees/{id}", desc: "Update employee fields" },
          { method: "POST", path: "/v1/requests", desc: "Submit an internal request" },
          { method: "GET", path: "/v1/health", desc: "Liveness / readiness probe" },
        ],
        entities: [
          { name: "Employee", fields: ["id", "name", "email", "department", "status", "startDate"] },
          { name: "Request", fields: ["id", "type", "employeeId", "status", "createdAt"] },
          { name: "AuditLog", fields: ["entity", "entityId", "action", "actor", "at"] },
        ],
        notes: [
          "Strict Pydantic models for request & response validation",
          "Google Cloud Run + CI/CD (build, test, deploy)",
          "BigQuery analytics + Cloud Operations monitoring",
        ],
      },
      architecture: {
        blurb:
          "Clients call the validated FastAPI service on Cloud Run; records persist to the operational database, analytics stream to BigQuery, and Cloud Operations watches health while CI/CD ships changes.",
        flow: ["Client / internal app", "FastAPI (validated)", "Cloud Run", "Database", "BigQuery analytics"],
        layers: [
          { name: "API", items: ["FastAPI", "Pydantic validation", "REST contracts"] },
          { name: "Platform", items: ["Cloud Run", "CI/CD pipeline", "Health probes"] },
          { name: "Insight", items: ["BigQuery analytics", "Cloud Operations monitoring"] },
        ],
      },
      decisions: [
        "Strong typed validation on both requests and responses keeps the contract honest for every consumer.",
        "Streaming analytics to BigQuery keeps the operational DB lean and the reporting flexible.",
        "Health probes + Cloud Operations make the service safe to run unattended.",
      ],
    },
  },
};
