// ---------------------------------------------------------------------------
// ILLUSTRATIVE project detail content, keyed by slug. REPRESENTATIVE
// RECONSTRUCTION — the real products/repos are private, so mockups, endpoints,
// data models, and architecture are plausible illustrations matching the
// dossier's stack and purpose, not the actual systems.
//
// Bilingual prose fields are { id, en } (resolve with localize()). Shared:
// endpoint method/path, entities, architecture flow/layers, mockup data.
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
          { card: { title: "Claim details", fields: [{ label: "Incident date", value: "12 Jun 2026" }, { label: "Damage type", value: "Front bumper · collision" }], button: "Submit claim" } },
          { from: "bot", text: "Claim CLM-20517 submitted. Your deductible for this policy is IDR 500,000.", source: "Policy_AUTO_terms.pdf" },
        ],
      },
    },
    detail: {
      overview: {
        en: "A conversational assistant that walks customers through policy registration and claims filing in plain chat, grounding every policy answer in the customer's actual documents through retrieval-augmented generation.",
        id: "Asisten percakapan yang memandu pelanggan melalui pendaftaran polis dan pengajuan klaim lewat chat biasa, dengan setiap jawaban polis berbasis dokumen asli pelanggan melalui retrieval-augmented generation.",
      },
      frontend: {
        blurb: {
          en: "A focused single-thread chat surface embeddable in web and mobile. The model drives the flow but collects structured data through inline form cards, so submissions stay validated.",
          id: "Antarmuka chat satu thread yang fokus, bisa disematkan di web dan mobile. Model mengarahkan alur namun mengumpulkan data terstruktur lewat kartu formulir inline, sehingga pengajuan tetap tervalidasi.",
        },
        features: {
          en: ["Guided registration & claims flows with inline form cards", "RAG answers with cited source documents", "Typing/streaming responses and quick-reply suggestions", "Resumable sessions and human-handoff fallback"],
          id: ["Alur pendaftaran & klaim terpandu dengan kartu formulir inline", "Jawaban RAG dengan kutipan dokumen sumber", "Respons streaming dan saran balasan cepat", "Sesi yang bisa dilanjutkan dan fallback ke agen manusia"],
        },
      },
      backend: {
        blurb: {
          en: "A Python/FastAPI service orchestrates the LLM, retrieval, and persistence. Documents are chunked and indexed in OpenSearch; submissions are validated with Pydantic before being persisted via downstream APIs.",
          id: "Layanan Python/FastAPI mengorkestrasi LLM, retrieval, dan penyimpanan. Dokumen dipecah dan diindeks di OpenSearch; pengajuan divalidasi dengan Pydantic sebelum disimpan via API hilir.",
        },
        endpoints: [
          { method: "POST", path: "/v1/chat/messages", desc: { en: "Send a user turn, stream assistant reply", id: "Kirim giliran pengguna, stream balasan asisten" } },
          { method: "POST", path: "/v1/claims", desc: { en: "Validate & persist a claim submission", id: "Validasi & simpan pengajuan klaim" } },
          { method: "POST", path: "/v1/policies/register", desc: { en: "Register a new policy from collected fields", id: "Daftarkan polis baru dari field terkumpul" } },
          { method: "GET", path: "/v1/policies/{policyId}", desc: { en: "Fetch policy details for grounding", id: "Ambil detail polis untuk grounding" } },
          { method: "POST", path: "/v1/rag/search", desc: { en: "Semantic search over policy documents", id: "Pencarian semantik atas dokumen polis" } },
        ],
        entities: [
          { name: "Conversation", fields: ["id", "customerId", "state", "messages[]"] },
          { name: "Claim", fields: ["id", "policyId", "incidentDate", "type", "status", "documents[]"] },
          { name: "PolicyDocChunk", fields: ["id", "policyId", "text", "embedding", "sourceFile"] },
        ],
        notes: {
          en: ["Dify orchestrates prompt flows and tool calls", "AWS Lambda for async document ingestion, S3 for uploads", "OpenSearch for semantic search and conversation logging"],
          id: ["Dify mengorkestrasi prompt flow dan tool call", "AWS Lambda untuk ingesti dokumen asinkron, S3 untuk upload", "OpenSearch untuk pencarian semantik dan logging percakapan"],
        },
      },
      architecture: {
        blurb: {
          en: "User turns hit a stateless FastAPI gateway, which calls the Dify-orchestrated LLM. Retrieval is served from OpenSearch; document ingestion runs asynchronously on Lambda.",
          id: "Giliran pengguna masuk ke gateway FastAPI stateless, yang memanggil LLM yang diorkestrasi Dify. Retrieval dilayani dari OpenSearch; ingesti dokumen berjalan asinkron di Lambda.",
        },
        flow: ["Chat client", "FastAPI gateway", "Dify (LLM + tools)", "OpenSearch RAG", "Claims / Policy APIs"],
        layers: [
          { name: "Experience", items: ["Embeddable chat UI", "Form cards"] },
          { name: "Orchestration", items: ["Dify prompt flows", "Tool calling", "Validation"] },
          { name: "Retrieval & data", items: ["OpenSearch index", "S3 documents", "Policy/Claims store"] },
          { name: "Async", items: ["Lambda ingestion", "Chunk + embed pipeline"] },
        ],
      },
      decisions: {
        en: ["RAG over policy PDFs keeps answers grounded and auditable, avoiding hallucinated coverage terms.", "Structured form cards instead of free-text parsing make submissions reliable and validatable.", "Stateless API + externalized session state so the service scales horizontally."],
        id: ["RAG atas PDF polis menjaga jawaban tetap berbasis sumber dan dapat diaudit, menghindari halusinasi soal cakupan polis.", "Kartu formulir terstruktur (bukan parsing teks bebas) membuat pengajuan andal dan bisa divalidasi.", "API stateless + state sesi yang dieksternalkan agar layanan skalabel horizontal."],
      },
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
        table: { title: "Top flagged claims", rows: [{ label: "CLM-20517", status: "High" }, { label: "CLM-20488", status: "High" }, { label: "CLM-20461", status: "Medium" }, { label: "CLM-20452", status: "Medium" }, { label: "CLM-20440", status: "Low" }] },
      },
    },
    detail: {
      overview: {
        en: "An end-to-end ML pipeline that scores incoming insurance claims for fraud risk in real time, surfacing the riskiest cases to human reviewers while letting low-risk claims flow through automatically.",
        id: "Pipeline ML end-to-end yang menilai risiko fraud klaim asuransi yang masuk secara real-time, menonjolkan kasus paling berisiko ke reviewer manusia sambil membiarkan klaim berisiko rendah lewat otomatis.",
      },
      frontend: {
        blurb: {
          en: "An internal review console for the fraud team: a live queue ordered by risk, a score-distribution view, and per-claim explanations so analysts can act on the riskiest cases first.",
          id: "Konsol review internal untuk tim fraud: antrean live terurut berdasarkan risiko, tampilan distribusi skor, dan penjelasan per klaim agar analis menindak kasus paling berisiko lebih dulu.",
        },
        features: {
          en: ["Live risk-ranked review queue", "Per-claim feature contributions (explainability)", "Score distribution & model-health widgets", "Reviewer disposition feeds back as labels"],
          id: ["Antrean review live terurut risiko", "Kontribusi fitur per klaim (explainability)", "Widget distribusi skor & kesehatan model", "Keputusan reviewer kembali menjadi label"],
        },
      },
      backend: {
        blurb: {
          en: "A FastAPI inference service wraps a scikit-learn model behind a low-latency scoring endpoint. Feature engineering is shared between training and serving to avoid skew; predictions and outcomes are logged for monitoring.",
          id: "Layanan inferensi FastAPI membungkus model scikit-learn di balik endpoint scoring berlatensi rendah. Feature engineering dipakai bersama antara training dan serving untuk menghindari skew; prediksi dan hasil dicatat untuk monitoring.",
        },
        endpoints: [
          { method: "POST", path: "/v1/score", desc: { en: "Score a claim, return risk + reason codes", id: "Skor sebuah klaim, kembalikan risiko + reason code" } },
          { method: "POST", path: "/v1/score/batch", desc: { en: "Batch scoring for backfills", id: "Scoring batch untuk backfill" } },
          { method: "GET", path: "/v1/claims/flagged", desc: { en: "Risk-ranked review queue", id: "Antrean review terurut risiko" } },
          { method: "POST", path: "/v1/feedback", desc: { en: "Record reviewer disposition as a label", id: "Catat keputusan reviewer sebagai label" } },
          { method: "GET", path: "/v1/model/metrics", desc: { en: "Live performance & drift metrics", id: "Metrik performa & drift live" } },
        ],
        entities: [
          { name: "ClaimFeatures", fields: ["claimId", "amount", "tenure", "priorClaims", "...derived"] },
          { name: "Prediction", fields: ["claimId", "riskScore", "band", "reasonCodes[]", "modelVersion"] },
          { name: "ReviewLabel", fields: ["claimId", "reviewerId", "isFraud", "decidedAt"] },
        ],
        notes: {
          en: ["scikit-learn pipeline (preprocess + model) serialized per version", "Shared feature module for train/serve parity", "Prediction & outcome logging for drift detection"],
          id: ["Pipeline scikit-learn (preprocess + model) diserialisasi per versi", "Modul fitur bersama untuk paritas train/serve", "Logging prediksi & hasil untuk deteksi drift"],
        },
      },
      architecture: {
        blurb: {
          en: "Claims enter the scoring API, pass through the shared feature pipeline and model, and are routed by risk band. A monitoring loop compares predictions to reviewer outcomes and raises drift alerts that trigger retraining.",
          id: "Klaim masuk ke API scoring, melewati pipeline fitur bersama dan model, lalu dirutekan berdasarkan band risiko. Loop monitoring membandingkan prediksi dengan hasil reviewer dan memunculkan alert drift yang memicu retraining.",
        },
        flow: ["Incoming claim", "FastAPI scoring API", "Feature pipeline", "Fraud model", "Risk routing"],
        layers: [
          { name: "Serving", items: ["FastAPI inference", "Reason codes", "Risk routing"] },
          { name: "Modeling", items: ["Feature engineering", "scikit-learn model", "Train/eval"] },
          { name: "Monitoring", items: ["Prediction logs", "Drift detection", "Retrain trigger"] },
        ],
      },
      decisions: {
        en: ["A single shared feature module for training and serving eliminates train/serve skew.", "Risk bands (not just a raw score) keep the reviewer workflow simple and actionable.", "Capturing reviewer dispositions closes the loop for continuous retraining."],
        id: ["Satu modul fitur bersama untuk training dan serving menghilangkan train/serve skew.", "Band risiko (bukan sekadar skor mentah) membuat alur reviewer sederhana dan actionable.", "Menangkap keputusan reviewer menutup loop untuk retraining berkelanjutan."],
      },
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
        table: { title: "AI insights", rows: [{ label: "Revenue up, led by enterprise", value: "▲" }, { label: "Vendor costs main expense driver", value: "•" }, { label: "Best margin quarter to date", value: "▲" }, { label: "Review Q3 marketing ROI", value: "!" }] },
      },
    },
    detail: {
      overview: {
        en: "An AI tool that ingests raw financial data and turns it into readable summaries, charts, and insights automatically — replacing manual spreadsheet analysis with a generated narrative over the numbers.",
        id: "Alat AI yang menyerap data keuangan mentah dan otomatis mengubahnya menjadi ringkasan, grafik, dan insight yang mudah dibaca — menggantikan analisis spreadsheet manual dengan narasi yang dihasilkan dari angka-angka.",
      },
      frontend: {
        blurb: {
          en: "A reporting dashboard with KPI tiles, trend charts, and an AI-written insight panel. Users upload or connect a data source and get a narrated breakdown without touching a spreadsheet.",
          id: "Dashboard pelaporan dengan tile KPI, grafik tren, dan panel insight tulisan AI. Pengguna mengunggah atau menghubungkan sumber data dan mendapat uraian bernarasi tanpa menyentuh spreadsheet.",
        },
        features: {
          en: ["KPI tiles with period-over-period deltas", "Auto-generated charts from ingested data", "LLM-written insight narrative with callouts", "Exportable report snapshots"],
          id: ["Tile KPI dengan delta antar periode", "Grafik otomatis dari data yang diserap", "Narasi insight tulisan LLM dengan callout", "Snapshot laporan yang bisa diekspor"],
        },
      },
      backend: {
        blurb: {
          en: "Ingestion and processing pipelines normalize incoming data, compute metrics, and pass aggregates to an LLM summarization layer. Backend APIs expose both the metrics and the generated narrative.",
          id: "Pipeline ingesti dan pemrosesan menormalkan data masuk, menghitung metrik, dan meneruskan agregat ke lapisan peringkasan LLM. API backend mengekspos metrik dan narasi yang dihasilkan.",
        },
        endpoints: [
          { method: "POST", path: "/v1/ingest", desc: { en: "Upload / connect a financial dataset", id: "Unggah / hubungkan dataset keuangan" } },
          { method: "GET", path: "/v1/metrics", desc: { en: "Computed KPIs & time series", id: "KPI terhitung & deret waktu" } },
          { method: "POST", path: "/v1/insights/generate", desc: { en: "LLM summary over aggregates", id: "Ringkasan LLM atas agregat" } },
          { method: "GET", path: "/v1/charts/{metric}", desc: { en: "Chart-ready series for a metric", id: "Deret siap-grafik untuk sebuah metrik" } },
          { method: "GET", path: "/v1/reports/{id}", desc: { en: "Fetch a saved report snapshot", id: "Ambil snapshot laporan tersimpan" } },
        ],
        entities: [
          { name: "Dataset", fields: ["id", "source", "period", "rowCount", "status"] },
          { name: "Metric", fields: ["key", "value", "delta", "period"] },
          { name: "Insight", fields: ["id", "datasetId", "text", "severity", "metricRefs[]"] },
        ],
        notes: {
          en: ["Pipeline normalizes & aggregates before the LLM step", "LLM only sees aggregates, never raw rows — cheaper & safer", "Automated visualization layer generates chart specs"],
          id: ["Pipeline menormalkan & mengagregasi sebelum tahap LLM", "LLM hanya melihat agregat, bukan baris mentah — lebih murah & aman", "Lapisan visualisasi otomatis menghasilkan spesifikasi grafik"],
        },
      },
      architecture: {
        blurb: {
          en: "Raw data is ingested and processed into metrics; the summarization layer prompts an LLM over those aggregates to produce insights, which are served alongside chart specs to the dashboard.",
          id: "Data mentah diserap dan diproses menjadi metrik; lapisan peringkasan mem-prompt LLM atas agregat tersebut untuk menghasilkan insight, yang disajikan bersama spesifikasi grafik ke dashboard.",
        },
        flow: ["Data source", "Ingestion pipeline", "Metric aggregation", "LLM summarization", "Dashboard + charts"],
        layers: [
          { name: "Ingestion", items: ["Upload / connectors", "Normalization", "Validation"] },
          { name: "Processing", items: ["Metric computation", "Aggregation", "Chart specs"] },
          { name: "Intelligence", items: ["LLM summarization", "Insight ranking"] },
        ],
      },
      decisions: {
        en: ["Feeding the LLM only aggregates (not raw rows) cuts cost and avoids leaking sensitive detail.", "Deterministic metric computation in code; the LLM only narrates — keeps numbers trustworthy.", "Chart specs generated server-side so the frontend stays thin."],
        id: ["Memberi LLM hanya agregat (bukan baris mentah) menekan biaya dan menghindari bocornya detail sensitif.", "Perhitungan metrik deterministik di kode; LLM hanya menarasikan — menjaga angka tetap tepercaya.", "Spesifikasi grafik dibuat di server agar frontend tetap ringan."],
      },
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
          { from: "bot", text: "Sorry about that. I've detected an outage in your area (cell BKS-14) and opened ticket TKT-88231, routed to network ops.", source: "kb/outage-handling" },
          { from: "bot", text: "Estimated restoration is 3 hours. Want SMS updates on this ticket?" },
          { from: "user", text: "Yes please" },
        ],
      },
    },
    detail: {
      overview: {
        en: "An AI helpdesk that handles high-volume tier-1 customer complaints and service requests — classifying intent, answering from a knowledge base, and routing tickets automatically, all tuned for latency and scale.",
        id: "Helpdesk AI yang menangani keluhan dan permintaan layanan pelanggan tier-1 bervolume tinggi — mengklasifikasi intent, menjawab dari knowledge base, dan merutekan tiket otomatis, semuanya dioptimasi untuk latensi dan skala.",
      },
      frontend: {
        blurb: {
          en: "A customer-facing chat widget across web and app. It resolves common requests inline and, when needed, opens and tracks a ticket without the customer leaving the conversation.",
          id: "Widget chat menghadap pelanggan di web dan aplikasi. Ia menyelesaikan permintaan umum secara inline dan, bila perlu, membuka serta melacak tiket tanpa pelanggan meninggalkan percakapan.",
        },
        features: {
          en: ["Intent-aware replies with quick actions", "Inline ticket creation & status tracking", "Knowledge-base answers for tier-1 queries", "Seamless escalation to a human agent"],
          id: ["Balasan sadar-intent dengan aksi cepat", "Pembuatan tiket inline & pelacakan status", "Jawaban knowledge base untuk pertanyaan tier-1", "Eskalasi mulus ke agen manusia"],
        },
      },
      backend: {
        blurb: {
          en: "An LLM classifies intent and either answers from the OpenSearch knowledge base or routes a ticket into the internal ticketing system. The service is tuned for concurrency and low latency under load.",
          id: "LLM mengklasifikasi intent lalu menjawab dari knowledge base OpenSearch atau merutekan tiket ke sistem ticketing internal. Layanan dioptimasi untuk konkurensi dan latensi rendah di bawah beban.",
        },
        endpoints: [
          { method: "POST", path: "/v1/assistant/turn", desc: { en: "Classify intent & generate response", id: "Klasifikasi intent & hasilkan respons" } },
          { method: "POST", path: "/v1/tickets", desc: { en: "Create & route a ticket", id: "Buat & rutekan tiket" } },
          { method: "GET", path: "/v1/tickets/{id}", desc: { en: "Ticket status for tracking", id: "Status tiket untuk pelacakan" } },
          { method: "POST", path: "/v1/kb/search", desc: { en: "Search the knowledge base", id: "Cari di knowledge base" } },
          { method: "POST", path: "/v1/escalate", desc: { en: "Hand off to a live agent", id: "Alihkan ke agen langsung" } },
        ],
        entities: [
          { name: "Intent", fields: ["label", "confidence", "entities{}"] },
          { name: "Ticket", fields: ["id", "category", "priority", "queue", "status"] },
          { name: "KBArticle", fields: ["id", "title", "body", "embedding", "tags[]"] },
        ],
        notes: {
          en: ["LLM intent classification with confidence thresholds", "OpenSearch knowledge base for grounded answers", "Routing rules map intents → ticketing queues (AWS)"],
          id: ["Klasifikasi intent LLM dengan ambang confidence", "Knowledge base OpenSearch untuk jawaban berbasis sumber", "Aturan routing memetakan intent → antrean ticketing (AWS)"],
        },
      },
      architecture: {
        blurb: {
          en: "Each message is classified; FAQ-type intents are answered from the knowledge base, complaints are routed into ticketing, and low-confidence or complex cases escalate to a human agent.",
          id: "Setiap pesan diklasifikasi; intent tipe FAQ dijawab dari knowledge base, keluhan dirutekan ke ticketing, dan kasus ber-confidence rendah atau kompleks dieskalasi ke agen manusia.",
        },
        flow: ["Customer message", "Intent classification", "KB answer / ticket routing", "Internal ticketing", "Reply / escalation"],
        layers: [
          { name: "Understanding", items: ["Intent classification", "Entity extraction", "Confidence gating"] },
          { name: "Resolution", items: ["KB retrieval", "Ticket routing rules", "Escalation"] },
          { name: "Scale", items: ["Async workers", "Latency tuning", "AWS integration"] },
        ],
      },
      decisions: {
        en: ["Confidence thresholds decide answer-vs-route-vs-escalate, keeping automation safe.", "Routing rules are declarative (intent → queue) so ops can tune them without code changes.", "Tuned for concurrency since tier-1 volume is bursty and latency-sensitive."],
        id: ["Ambang confidence menentukan jawab-vs-rutekan-vs-eskalasi, menjaga otomasi tetap aman.", "Aturan routing bersifat deklaratif (intent → antrean) sehingga ops bisa menyetelnya tanpa ubah kode.", "Dioptimasi untuk konkurensi karena volume tier-1 bersifat bursty dan sensitif latensi."],
      },
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
        sql: ["SELECT region,", "       DATE_TRUNC('month', order_date) AS month,", "       SUM(amount) AS revenue", "FROM   orders", "WHERE  EXTRACT(YEAR FROM order_date) = 2024", "GROUP  BY region, month", "ORDER  BY month;"],
        result: { title: "Revenue by region", rows: [{ label: "APAC", value: "$1.5M", pct: 80 }, { label: "EMEA", value: "$1.2M", pct: 64 }, { label: "NA", value: "$1.9M", pct: 100 }, { label: "LATAM", value: "$0.8M", pct: 42 }] },
      },
    },
    detail: {
      overview: {
        en: "A natural-language interface that turns business questions into validated SQL, executes it securely, and auto-generates charts — letting non-technical users self-serve data without depending on analysts.",
        id: "Antarmuka bahasa natural yang mengubah pertanyaan bisnis menjadi SQL tervalidasi, mengeksekusinya secara aman, dan otomatis membuat grafik — memungkinkan pengguna non-teknis melayani diri sendiri tanpa bergantung pada analis.",
      },
      frontend: {
        blurb: {
          en: "An ask-anything bar over the company's data. Users type a question; the app shows the generated SQL (with a validation badge for transparency) and renders the result as a chart.",
          id: "Bilah tanya-apa-saja di atas data perusahaan. Pengguna mengetik pertanyaan; aplikasi menampilkan SQL yang dihasilkan (dengan badge validasi untuk transparansi) dan merender hasilnya sebagai grafik.",
        },
        features: {
          en: ["Plain-language question box with suggestions", "Transparent, read-only generated SQL", "Validation badge before any execution", "Auto-charting of results + export"],
          id: ["Kotak pertanyaan bahasa sehari-hari dengan saran", "SQL yang dihasilkan transparan dan read-only", "Badge validasi sebelum eksekusi apa pun", "Auto-charting hasil + ekspor"],
        },
      },
      backend: {
        blurb: {
          en: "A FastAPI service grounds the schema via RAG, generates SQL, and runs it through a validation gate (read-only, allow-listed tables, row limits) before executing against the warehouse with a least-privilege connection.",
          id: "Layanan FastAPI mem-grounding skema via RAG, menghasilkan SQL, dan melewatkannya melalui gerbang validasi (read-only, tabel allow-list, batas baris) sebelum dieksekusi ke warehouse dengan koneksi least-privilege.",
        },
        endpoints: [
          { method: "POST", path: "/v1/ask", desc: { en: "NL question → candidate SQL", id: "Pertanyaan NL → kandidat SQL" } },
          { method: "POST", path: "/v1/sql/validate", desc: { en: "Static checks: read-only, scope, limits", id: "Cek statis: read-only, cakupan, batas" } },
          { method: "POST", path: "/v1/sql/execute", desc: { en: "Run validated SQL (least-privilege)", id: "Jalankan SQL tervalidasi (least-privilege)" } },
          { method: "POST", path: "/v1/charts/suggest", desc: { en: "Pick a chart for the result shape", id: "Pilih grafik sesuai bentuk hasil" } },
          { method: "GET", path: "/v1/schema", desc: { en: "Indexed schema for grounding", id: "Skema terindeks untuk grounding" } },
        ],
        entities: [
          { name: "Question", fields: ["id", "text", "userId", "generatedSql", "status"] },
          { name: "SchemaDoc", fields: ["table", "columns[]", "description", "embedding"] },
          { name: "QueryResult", fields: ["questionId", "columns[]", "rows[]", "chartType"] },
        ],
        notes: {
          en: ["RAG over schema docs grounds generation in real tables", "Validation gate: read-only, allow-list, mandatory LIMIT", "Execution uses a least-privilege, read-only DB role"],
          id: ["RAG atas dokumen skema mendasarkan generasi pada tabel nyata", "Gerbang validasi: read-only, allow-list, LIMIT wajib", "Eksekusi memakai role DB read-only least-privilege"],
        },
      },
      architecture: {
        blurb: {
          en: "A question is grounded against indexed schema, translated to SQL, validated by a static gate, then executed under a read-only role. Results flow to an auto-charting step before returning to the user.",
          id: "Pertanyaan di-grounding terhadap skema terindeks, diterjemahkan ke SQL, divalidasi oleh gerbang statis, lalu dieksekusi dengan role read-only. Hasil mengalir ke tahap auto-charting sebelum kembali ke pengguna.",
        },
        flow: ["NL question", "Schema-grounded generation", "Validation gate", "Secure execution", "Auto-chart"],
        layers: [
          { name: "Generation", items: ["Schema RAG", "SQL synthesis", "Few-shot examples"] },
          { name: "Safety", items: ["Read-only check", "Table allow-list", "Row limits"] },
          { name: "Delivery", items: ["Least-privilege execution", "Chart suggestion"] },
        ],
      },
      decisions: {
        en: ["A hard validation gate (read-only, allow-list, limits) is the safety boundary — the LLM never executes directly.", "Showing the generated SQL builds user trust and makes results auditable.", "Least-privilege DB role means even a bad query can't mutate or over-read data."],
        id: ["Gerbang validasi tegas (read-only, allow-list, batas) adalah batas keamanan — LLM tidak pernah mengeksekusi langsung.", "Menampilkan SQL yang dihasilkan membangun kepercayaan pengguna dan membuat hasil dapat diaudit.", "Role DB least-privilege berarti kueri buruk pun tidak bisa mengubah atau membaca data berlebihan."],
      },
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
        table: { title: "Recent complaints", rows: [{ label: "#10231 · Billing", status: "Open" }, { label: "#10230 · App crash", status: "In progress" }, { label: "#10229 · Delivery", status: "Resolved" }, { label: "#10228 · Refund", status: "Open" }, { label: "#10227 · Access", status: "Resolved" }] },
      },
    },
    detail: {
      overview: {
        en: "A fullstack web app that centralizes complaint logging, routing, and analytics — pulling complaints scattered across channels into one place with real-time visibility for the teams handling them.",
        id: "Aplikasi web fullstack yang memusatkan pencatatan, routing, dan analitik keluhan — menarik keluhan yang tersebar di berbagai kanal ke satu tempat dengan visibilitas real-time bagi tim yang menanganinya.",
      },
      frontend: {
        blurb: {
          en: "A React dashboard with role-based views: intake forms, a searchable/filterable complaint table with status workflow, and analytics on volume, channel mix, and resolution time.",
          id: "Dashboard React dengan tampilan berbasis role: formulir intake, tabel keluhan yang bisa dicari/difilter dengan alur status, dan analitik volume, komposisi kanal, dan waktu penyelesaian.",
        },
        features: {
          en: ["Searchable, filterable complaint table", "Status workflow & assignment", "Role-based access (agent / supervisor / admin)", "Analytics: volume, channels, resolution time"],
          id: ["Tabel keluhan yang bisa dicari & difilter", "Alur status & penugasan", "Akses berbasis role (agen / supervisor / admin)", "Analitik: volume, kanal, waktu penyelesaian"],
        },
      },
      backend: {
        blurb: {
          en: "A FastAPI backend over PostgreSQL with Firebase Authentication and role-based access control. OpenSearch powers search and analytics; the whole thing is deployed on Google Cloud Run.",
          id: "Backend FastAPI di atas PostgreSQL dengan Firebase Authentication dan kontrol akses berbasis role. OpenSearch menjalankan pencarian dan analitik; semuanya di-deploy di Google Cloud Run.",
        },
        endpoints: [
          { method: "POST", path: "/v1/complaints", desc: { en: "Create a complaint (any channel)", id: "Buat keluhan (kanal apa pun)" } },
          { method: "GET", path: "/v1/complaints", desc: { en: "Search / filter / paginate", id: "Cari / filter / paginasi" } },
          { method: "PATCH", path: "/v1/complaints/{id}", desc: { en: "Update status / assignee", id: "Perbarui status / penanggung jawab" } },
          { method: "GET", path: "/v1/analytics/summary", desc: { en: "Volume, channels, resolution time", id: "Volume, kanal, waktu penyelesaian" } },
          { method: "POST", path: "/v1/auth/verify", desc: { en: "Verify Firebase token → role", id: "Verifikasi token Firebase → role" } },
        ],
        entities: [
          { name: "Complaint", fields: ["id", "subject", "channel", "status", "assigneeId", "createdAt"] },
          { name: "User", fields: ["id", "email", "role", "team"] },
          { name: "AuditEvent", fields: ["complaintId", "actorId", "action", "at"] },
        ],
        notes: {
          en: ["PostgreSQL system of record; OpenSearch for search/analytics", "Firebase Auth + RBAC on every endpoint", "Deployed on Google Cloud Run with CI/CD"],
          id: ["PostgreSQL sebagai system of record; OpenSearch untuk pencarian/analitik", "Firebase Auth + RBAC di setiap endpoint", "Di-deploy di Google Cloud Run dengan CI/CD"],
        },
      },
      architecture: {
        blurb: {
          en: "Complaints from multiple channels land in the FastAPI backend on Cloud Run, persist to PostgreSQL, and are indexed into OpenSearch for the React dashboard's search and analytics views.",
          id: "Keluhan dari berbagai kanal masuk ke backend FastAPI di Cloud Run, disimpan ke PostgreSQL, dan diindeks ke OpenSearch untuk tampilan pencarian dan analitik dashboard React.",
        },
        flow: ["Multi-channel intake", "FastAPI (Cloud Run)", "PostgreSQL", "OpenSearch index", "React dashboard"],
        layers: [
          { name: "Frontend", items: ["React dashboard", "RBAC views", "Analytics"] },
          { name: "API", items: ["FastAPI", "Firebase Auth", "Validation"] },
          { name: "Data", items: ["PostgreSQL", "OpenSearch", "Audit log"] },
        ],
      },
      decisions: {
        en: ["PostgreSQL as the system of record, OpenSearch as a derived index — search never compromises consistency.", "RBAC enforced server-side on every endpoint, not just hidden in the UI.", "Cloud Run keeps ops light: scale-to-zero, managed TLS, simple CI/CD."],
        id: ["PostgreSQL sebagai system of record, OpenSearch sebagai indeks turunan — pencarian tak mengorbankan konsistensi.", "RBAC ditegakkan di sisi server pada setiap endpoint, bukan sekadar disembunyikan di UI.", "Cloud Run menjaga ops tetap ringan: scale-to-zero, TLS terkelola, CI/CD sederhana."],
      },
    },
  },

  // =========================================================================
  "internal-helpdesk-chatbot": {
    mockup: {
      type: "chat",
      url: "intranet.corp/helpdesk",
      data: {
        initials: "IH",
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
      overview: {
        en: "An internal assistant that handles repetitive HR and operations requests and structured reporting — orchestrated with prompt flows, with role-based access and indexed company knowledge.",
        id: "Asisten internal yang menangani permintaan HR dan operasional berulang serta pelaporan terstruktur — diorkestrasi dengan prompt flow, dengan akses berbasis role dan knowledge perusahaan terindeks.",
      },
      frontend: {
        blurb: {
          en: "An intranet chat assistant for employees. It answers policy questions from indexed knowledge and completes common requests (leave, IT, reimbursements) through structured flows scoped by the employee's role.",
          id: "Asisten chat intranet untuk karyawan. Ia menjawab pertanyaan kebijakan dari knowledge terindeks dan menyelesaikan permintaan umum (cuti, IT, reimbursement) melalui alur terstruktur yang dibatasi role karyawan.",
        },
        features: {
          en: ["Policy Q&A from indexed knowledge", "Structured request flows (leave, IT, reimbursement)", "Role-scoped answers & actions", "Structured reporting / export for ops"],
          id: ["Tanya-jawab kebijakan dari knowledge terindeks", "Alur permintaan terstruktur (cuti, IT, reimbursement)", "Jawaban & aksi sesuai role", "Pelaporan terstruktur / ekspor untuk ops"],
        },
      },
      backend: {
        blurb: {
          en: "Dify orchestrates prompt flows and tool calls on top of Vertex AI. Role-based access gates what each employee can see and do; company knowledge is indexed in OpenSearch.",
          id: "Dify mengorkestrasi prompt flow dan tool call di atas Vertex AI. Akses berbasis role membatasi apa yang bisa dilihat dan dilakukan tiap karyawan; knowledge perusahaan diindeks di OpenSearch.",
        },
        endpoints: [
          { method: "POST", path: "/v1/assistant/ask", desc: { en: "Answer a question via prompt flow", id: "Jawab pertanyaan via prompt flow" } },
          { method: "POST", path: "/v1/requests", desc: { en: "File a structured request (leave/IT/…)", id: "Ajukan permintaan terstruktur (cuti/IT/…)" } },
          { method: "GET", path: "/v1/requests/{id}", desc: { en: "Request status", id: "Status permintaan" } },
          { method: "POST", path: "/v1/kb/search", desc: { en: "Search indexed company knowledge", id: "Cari knowledge perusahaan terindeks" } },
          { method: "GET", path: "/v1/reports/{type}", desc: { en: "Generate a structured report", id: "Hasilkan laporan terstruktur" } },
        ],
        entities: [
          { name: "Employee", fields: ["id", "name", "role", "department", "managerId"] },
          { name: "Request", fields: ["id", "type", "payload{}", "status", "approverId"] },
          { name: "KnowledgeDoc", fields: ["id", "title", "body", "audience", "embedding"] },
        ],
        notes: {
          en: ["Vertex AI as the model backbone", "Dify for orchestration & prompt flows", "Role-based access + OpenSearch knowledge index"],
          id: ["Vertex AI sebagai tulang punggung model", "Dify untuk orkestrasi & prompt flow", "Akses berbasis role + indeks knowledge OpenSearch"],
        },
      },
      architecture: {
        blurb: {
          en: "An employee request is checked against role-based access, answered via Dify-orchestrated prompt flows on Vertex AI (grounded in OpenSearch knowledge), and either resolved directly or filed as a structured request.",
          id: "Permintaan karyawan diperiksa terhadap akses berbasis role, dijawab via prompt flow yang diorkestrasi Dify di Vertex AI (berbasis knowledge OpenSearch), lalu diselesaikan langsung atau diajukan sebagai permintaan terstruktur.",
        },
        flow: ["Employee", "RBAC check", "Dify prompt flow (Vertex AI)", "OpenSearch knowledge", "Resolve / file request"],
        layers: [
          { name: "Access", items: ["Role-based access", "Audience scoping"] },
          { name: "Orchestration", items: ["Dify prompt flows", "Vertex AI", "Tool calls"] },
          { name: "Knowledge", items: ["OpenSearch index", "Structured reporting"] },
        ],
      },
      decisions: {
        en: ["Role-based access scopes both answers and actions — employees only see what they should.", "Prompt flows (not a single mega-prompt) keep each request type predictable and maintainable.", "Structured requests produce clean records for downstream reporting."],
        id: ["Akses berbasis role membatasi jawaban dan aksi — karyawan hanya melihat yang seharusnya.", "Prompt flow (bukan satu mega-prompt) menjaga tiap tipe permintaan tetap terprediksi dan mudah dirawat.", "Permintaan terstruktur menghasilkan rekaman rapi untuk pelaporan hilir."],
      },
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
        table: { title: "Recent records", rows: [{ label: "E-1042 · A. Putra", status: "Active" }, { label: "E-1041 · R. Sari", status: "Active" }, { label: "REQ-3092 · Leave", status: "Pending" }, { label: "E-1039 · D. Nugroho", status: "Active" }, { label: "REQ-3088 · Transfer", status: "Pending" }] },
      },
    },
    detail: {
      overview: {
        en: "A backend service for employee records and internal request management — validated REST APIs with CI/CD deployment, analytics, and monitoring, giving downstream apps a reliable, queryable source of truth.",
        id: "Layanan backend untuk data karyawan dan manajemen permintaan internal — REST API tervalidasi dengan deployment CI/CD, analitik, dan monitoring, memberi aplikasi hilir sumber kebenaran yang andal dan bisa dikueri.",
      },
      frontend: {
        blurb: {
          en: "An admin console (illustrative) over the API: searchable employee records, a request inbox with approvals, and operational widgets for API health — the kind of thin UI such a backend powers.",
          id: "Konsol admin (ilustratif) di atas API: data karyawan yang bisa dicari, inbox permintaan dengan persetujuan, dan widget operasional untuk kesehatan API — jenis UI ringan yang ditenagai backend semacam ini.",
        },
        features: {
          en: ["Searchable employee directory", "Request inbox with approval workflow", "API health & latency widgets", "Analytics powered by BigQuery"],
          id: ["Direktori karyawan yang bisa dicari", "Inbox permintaan dengan alur persetujuan", "Widget kesehatan & latensi API", "Analitik ditenagai BigQuery"],
        },
      },
      backend: {
        blurb: {
          en: "A Python/FastAPI service with strong Pydantic validation on every request and response. Deployed on Google Cloud Run via CI/CD, with analytics streamed to BigQuery and monitoring through Cloud Operations.",
          id: "Layanan Python/FastAPI dengan validasi Pydantic kuat pada setiap request dan response. Di-deploy di Google Cloud Run via CI/CD, dengan analitik dialirkan ke BigQuery dan monitoring lewat Cloud Operations.",
        },
        endpoints: [
          { method: "GET", path: "/v1/employees", desc: { en: "List / search employees", id: "Daftar / cari karyawan" } },
          { method: "POST", path: "/v1/employees", desc: { en: "Create a validated employee record", id: "Buat data karyawan tervalidasi" } },
          { method: "PATCH", path: "/v1/employees/{id}", desc: { en: "Update employee fields", id: "Perbarui field karyawan" } },
          { method: "POST", path: "/v1/requests", desc: { en: "Submit an internal request", id: "Ajukan permintaan internal" } },
          { method: "GET", path: "/v1/health", desc: { en: "Liveness / readiness probe", id: "Probe liveness / readiness" } },
        ],
        entities: [
          { name: "Employee", fields: ["id", "name", "email", "department", "status", "startDate"] },
          { name: "Request", fields: ["id", "type", "employeeId", "status", "createdAt"] },
          { name: "AuditLog", fields: ["entity", "entityId", "action", "actor", "at"] },
        ],
        notes: {
          en: ["Strict Pydantic models for request & response validation", "Google Cloud Run + CI/CD (build, test, deploy)", "BigQuery analytics + Cloud Operations monitoring"],
          id: ["Model Pydantic ketat untuk validasi request & response", "Google Cloud Run + CI/CD (build, test, deploy)", "Analitik BigQuery + monitoring Cloud Operations"],
        },
      },
      architecture: {
        blurb: {
          en: "Clients call the validated FastAPI service on Cloud Run; records persist to the operational database, analytics stream to BigQuery, and Cloud Operations watches health while CI/CD ships changes.",
          id: "Klien memanggil layanan FastAPI tervalidasi di Cloud Run; data disimpan ke database operasional, analitik dialirkan ke BigQuery, dan Cloud Operations memantau kesehatan sementara CI/CD merilis perubahan.",
        },
        flow: ["Client / internal app", "FastAPI (validated)", "Cloud Run", "Database", "BigQuery analytics"],
        layers: [
          { name: "API", items: ["FastAPI", "Pydantic validation", "REST contracts"] },
          { name: "Platform", items: ["Cloud Run", "CI/CD pipeline", "Health probes"] },
          { name: "Insight", items: ["BigQuery analytics", "Cloud Operations monitoring"] },
        ],
      },
      decisions: {
        en: ["Strong typed validation on both requests and responses keeps the contract honest for every consumer.", "Streaming analytics to BigQuery keeps the operational DB lean and the reporting flexible.", "Health probes + Cloud Operations make the service safe to run unattended."],
        id: ["Validasi bertipe kuat pada request dan response menjaga kontrak tetap jujur untuk setiap konsumen.", "Mengalirkan analitik ke BigQuery menjaga DB operasional tetap ramping dan pelaporan fleksibel.", "Probe kesehatan + Cloud Operations membuat layanan aman berjalan tanpa pengawasan."],
      },
    },
  },

  // =========================================================================
  "smart-parking-detection": {
    mockup: {
      type: "detection",
      url: "parking-cam.local/monitor",
      data: {
        initials: "SP",
        app: "Smart Parking — Plate Detection",
        subtitle: "Odd-even gate control · live",
        camLabel: "Gate camera · live",
        detected: "B 1234 CDE",
        confidence: "98.6%",
        rule: "Even date · even plate → ALLOW",
        gate: "OPEN",
        log: [
          { plate: "B 1234 CDE", time: "08:42:10", parity: "Even", action: "Allow" },
          { plate: "D 5678 KL", time: "08:41:55", parity: "Even", action: "Allow" },
          { plate: "B 9012 ZX", time: "08:41:30", parity: "Odd", action: "Deny" },
          { plate: "F 3344 QP", time: "08:41:02", parity: "Even", action: "Allow" },
        ],
        accuracy: "97%",
      },
    },
    detail: {
      overview: {
        en: "Undergraduate thesis: an automatic parking system that detects and reads vehicle license plates in real time with a TensorFlow model, applies Jakarta's odd-even rule against the date, and controls the entry gate — built alongside a set of academic IoT projects.",
        id: "Skripsi S1: sistem parkir otomatis yang mendeteksi dan membaca pelat nomor kendaraan secara real-time dengan model TensorFlow, menerapkan aturan ganjil-genap berdasarkan tanggal, dan mengendalikan palang masuk — dibangun berdampingan dengan sejumlah proyek IoT akademik.",
      },
      frontend: {
        blurb: {
          en: "An operator monitor showing the live gate camera, the detected plate with confidence, the odd-even decision, gate status, and a rolling detection log — the kind of dashboard such a system surfaces.",
          id: "Monitor operator yang menampilkan kamera palang live, pelat terdeteksi beserta confidence, keputusan ganjil-genap, status palang, dan log deteksi berjalan — jenis dashboard yang ditampilkan sistem semacam ini.",
        },
        features: {
          en: ["Live camera with detected-plate overlay", "Odd-even decision against the current date", "Real-time gate / device status", "Rolling detection log with parity & action"],
          id: ["Kamera live dengan overlay pelat terdeteksi", "Keputusan ganjil-genap terhadap tanggal saat ini", "Status palang / perangkat real-time", "Log deteksi berjalan dengan paritas & aksi"],
        },
      },
      backend: {
        blurb: {
          en: "An edge service runs the TensorFlow detection + OCR model on the camera feed, applies the odd-even rule, and drives the gate controller. A small REST API exposes detections and device status for the monitor.",
          id: "Layanan edge menjalankan model deteksi TensorFlow + OCR pada umpan kamera, menerapkan aturan ganjil-genap, dan menggerakkan kontroler palang. REST API kecil mengekspos deteksi dan status perangkat untuk monitor.",
        },
        endpoints: [
          { method: "POST", path: "/v1/detect", desc: { en: "Run detection + OCR on a frame", id: "Jalankan deteksi + OCR pada satu frame" } },
          { method: "GET", path: "/v1/detections", desc: { en: "Recent plate detections", id: "Deteksi pelat terbaru" } },
          { method: "POST", path: "/v1/gate", desc: { en: "Open / close the gate", id: "Buka / tutup palang" } },
          { method: "GET", path: "/v1/device/status", desc: { en: "Camera & gate device health", id: "Kesehatan perangkat kamera & palang" } },
        ],
        entities: [
          { name: "Detection", fields: ["id", "plate", "confidence", "parity", "ts"] },
          { name: "GateEvent", fields: ["detectionId", "action", "reason", "ts"] },
          { name: "Device", fields: ["id", "type", "status", "lastSeen"] },
        ],
        notes: {
          en: ["TensorFlow detection + OCR for plate reading", "Odd-even rule evaluated against the date on-device", "Edge inference near the camera for low latency"],
          id: ["Deteksi TensorFlow + OCR untuk pembacaan pelat", "Aturan ganjil-genap dievaluasi terhadap tanggal di perangkat", "Inferensi edge dekat kamera untuk latensi rendah"],
        },
      },
      architecture: {
        blurb: {
          en: "The gate camera streams frames to an edge device running the TensorFlow detection + OCR model. The recognized plate is checked against the odd-even rule for the date, and the result drives the gate controller while every event is logged.",
          id: "Kamera palang mengalirkan frame ke perangkat edge yang menjalankan model deteksi TensorFlow + OCR. Pelat yang dikenali dicek terhadap aturan ganjil-genap untuk tanggal tersebut, dan hasilnya menggerakkan kontroler palang sementara setiap kejadian dicatat.",
        },
        flow: ["Gate camera", "TF detection + OCR", "Odd-even rule", "Gate controller", "Detection log"],
        layers: [
          { name: "Vision", items: ["Frame capture", "Plate detection", "OCR / read"] },
          { name: "Logic", items: ["Odd-even rule", "Allow / deny decision"] },
          { name: "Device & IoT", items: ["Gate controller", "RFID / sensors", "Event logging"] },
        ],
      },
      decisions: {
        en: ["On-device (edge) inference keeps gate decisions fast and works even without a stable network.", "The odd-even rule is a deterministic check layered on top of the model — the model only reads the plate.", "Part of a broader academic IoT portfolio (RFID lock, sensors), reused as building blocks."],
        id: ["Inferensi di perangkat (edge) menjaga keputusan palang tetap cepat dan tetap jalan meski jaringan tidak stabil.", "Aturan ganjil-genap adalah pengecekan deterministik di atas model — model hanya membaca pelat.", "Bagian dari portofolio IoT akademik yang lebih luas (kunci RFID, sensor), dipakai ulang sebagai building block."],
      },
    },
  },
};
