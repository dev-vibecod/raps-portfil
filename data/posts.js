// ---------------------------------------------------------------------------
// Blog posts, data-driven and bilingual ({ id, en } prose, shared metadata).
// Educational/SEO content tied to the services offered — general market
// guidance, no invented client stories or fabricated numbers about Rafif.
// Rendered by app/[lang]/blog. Resolve prose with localize().
// ---------------------------------------------------------------------------

export const posts = [
  {
    slug: "biaya-pembuatan-website-aplikasi",
    date: "2026-06-15",
    readMinutes: 7,
    tags: ["Website", "Aplikasi", "Budget"],
    title: {
      id: "Berapa Biaya Pembuatan Website & Aplikasi? Panduan Lengkap 2026",
      en: "How Much Does a Website or App Cost to Build? A 2026 Guide",
    },
    excerpt: {
      id: "Faktor apa saja yang menentukan biaya pembuatan website dan aplikasi — dari landing page sederhana sampai sistem manajemen dengan AI — plus cara menyusun budget yang realistis.",
      en: "What actually drives the cost of building a website or application — from a simple landing page to an AI-powered management system — and how to set a realistic budget.",
    },
    keywords: ["biaya pembuatan website", "biaya pembuatan aplikasi", "harga jasa website", "estimasi biaya aplikasi", "jasa pembuatan website"],
    sections: [
      {
        h: { id: "Tidak ada satu harga — yang ada adalah ruang lingkup", en: "There is no single price — there is scope" },
        body: [
          {
            id: "Pertanyaan “berapa biaya bikin website?” mirip dengan “berapa harga sebuah kendaraan?” — jawabannya tergantung apakah yang Anda butuhkan sepeda atau truk. Yang benar-benar menentukan biaya adalah ruang lingkup: berapa banyak halaman/fitur, apakah perlu login dan database, integrasi apa saja, dan seberapa custom desainnya.",
            en: "Asking “how much does a website cost?” is like asking “how much is a vehicle?” — it depends on whether you need a bicycle or a truck. What really drives cost is scope: how many pages/features, whether you need auth and a database, which integrations, and how custom the design is.",
          },
          {
            id: "Karena itu, langkah pertama yang baik bukan meminta harga, melainkan menuliskan brief singkat: masalah yang ingin diselesaikan, siapa penggunanya, dan 5–10 fitur inti. Dari brief itu, developer yang berpengalaman bisa memberi estimasi yang jujur.",
            en: "So the best first step isn't asking for a price — it's writing a short brief: the problem to solve, who the users are, and the 5–10 core features. From that, an experienced developer can give you an honest estimate.",
          },
        ],
      },
      {
        h: { id: "Tingkatan umum proyek web & aplikasi", en: "Common tiers of web & app projects" },
        body: [
          {
            id: "Secara umum proyek terbagi dalam beberapa tingkatan. (1) Landing page / company profile: beberapa halaman statis, fokus pada desain, kecepatan, dan SEO — pengerjaan hitungan hari sampai 1–2 minggu. (2) Website dinamis dengan CMS/admin: konten bisa dikelola sendiri, ada form, dan integrasi ringan. (3) Aplikasi web / sistem manajemen: login multi-role, database, dashboard, laporan — kompleksitas dan biaya naik signifikan karena ada logika bisnis. (4) Sistem dengan AI/integrasi lanjutan: chatbot berbasis dokumen (RAG), analitik otomatis, atau integrasi banyak sistem — butuh keahlian khusus di backend dan LLM.",
            en: "Projects generally fall into tiers. (1) Landing page / company profile: a few static pages focused on design, speed, and SEO — days to 1–2 weeks of work. (2) Dynamic website with a CMS/admin: self-managed content, forms, light integrations. (3) Web app / management system: multi-role auth, database, dashboards, reporting — cost rises significantly because there is real business logic. (4) AI/advanced-integration systems: document-grounded chatbots (RAG), automated analytics, or multi-system integrations — these need specialised backend and LLM expertise.",
          },
          {
            id: "Semakin tinggi tingkatannya, semakin besar porsi biaya yang pindah dari “tampilan” ke “arsitektur”: keamanan, validasi data, skalabilitas, dan monitoring. Di sinilah perbedaan antara aplikasi yang sekadar jalan dan aplikasi yang bisa diandalkan di produksi.",
            en: "The higher the tier, the more of the budget shifts from “looks” to “architecture”: security, data validation, scalability, and monitoring. That is the difference between an app that merely runs and one you can rely on in production.",
          },
        ],
      },
      {
        h: { id: "Faktor yang paling memengaruhi biaya", en: "The factors that move the price most" },
        body: [
          {
            id: "Dari pengalaman mengerjakan 20+ proyek end-to-end, lima faktor ini paling menentukan: (1) jumlah dan kompleksitas fitur — terutama yang melibatkan role/izin dan alur persetujuan; (2) integrasi ke sistem lain (payment, WhatsApp, ERP, API internal); (3) kebutuhan desain custom vs pakai sistem desain yang efisien; (4) kebutuhan data & AI — pipeline data dan fitur LLM menambah lapisan kerja tersendiri; (5) target skala — 100 pengguna internal vs ribuan pengguna publik menuntut arsitektur berbeda.",
            en: "From experience delivering 20+ end-to-end projects, five factors matter most: (1) feature count and complexity — especially roles/permissions and approval flows; (2) integrations with other systems (payments, WhatsApp, ERPs, internal APIs); (3) fully custom design vs an efficient design system; (4) data & AI needs — data pipelines and LLM features add their own layer of work; (5) target scale — 100 internal users vs thousands of public users demand different architectures.",
          },
        ],
      },
      {
        h: { id: "Biaya yang sering terlupakan", en: "The costs people forget" },
        body: [
          {
            id: "Selain biaya pembangunan, anggarkan juga: domain (± ratusan ribu rupiah/tahun), hosting/cloud (banyak proyek kecil bisa mulai gratis di Vercel atau murah di VPS), serta pemeliharaan — update keamanan, backup, dan perbaikan kecil. Sistem yang memakai AI juga punya biaya pemakaian API yang sebanding dengan trafik.",
            en: "Beyond the build, budget for: a domain (tens of USD per year), hosting/cloud (many small projects start free on Vercel or cheap on a VPS), and maintenance — security updates, backups, small fixes. AI-powered systems also carry API usage costs that scale with traffic.",
          },
          {
            id: "Tips menghemat yang sehat: mulai dari MVP dengan fitur inti saja, pakai komponen dan layanan managed yang matang, dan hindari membangun fitur “nanti mungkin perlu”. Menambah fitur setelah produk terbukti dipakai selalu lebih murah daripada membangun semuanya di awal.",
            en: "Healthy ways to save: start with an MVP of core features only, lean on mature managed services and components, and avoid building “maybe later” features. Adding features after the product proves itself is always cheaper than building everything upfront.",
          },
        ],
      },
      {
        h: { id: "Cara meminta penawaran yang akurat", en: "How to get an accurate quote" },
        body: [
          {
            id: "Kirimkan brief yang memuat: tujuan bisnis, pengguna, daftar fitur inti, contoh produk/desain yang disukai, integrasi yang dibutuhkan, dan target waktu. Dengan itu, developer bisa memberi estimasi ruang lingkup + waktu + biaya yang bisa dipertanggungjawabkan — bukan angka asal. Saya sendiri selalu memulai dari sesi discovery singkat gratis untuk memetakan kebutuhan sebelum bicara angka.",
            en: "Send a brief covering: the business goal, the users, the core feature list, examples of products/designs you like, required integrations, and your timeline. With that, a developer can give a defensible scope + time + cost estimate instead of a random number. I always start with a short free discovery session to map the requirements before talking numbers.",
          },
        ],
      },
    ],
  },
  {
    slug: "chatbot-ai-untuk-bisnis",
    date: "2026-06-22",
    readMinutes: 6,
    tags: ["AI", "Chatbot", "Otomasi"],
    title: {
      id: "Chatbot AI untuk Bisnis: Kapan Benar-Benar Perlu, dan Bagaimana Memulai",
      en: "AI Chatbots for Business: When You Actually Need One, and How to Start",
    },
    excerpt: {
      id: "Tidak semua bisnis butuh chatbot AI — tapi untuk kasus yang tepat, dampaknya besar. Panduan jujur menilai kebutuhan, memilih pendekatan (RAG, agent, otomasi n8n), dan menghindari kesalahan umum.",
      en: "Not every business needs an AI chatbot — but for the right use case the impact is real. An honest guide to assessing the need, choosing an approach (RAG, agents, n8n automation), and avoiding common mistakes.",
    },
    keywords: ["chatbot AI untuk bisnis", "jasa pembuatan chatbot", "chatbot whatsapp bisnis", "RAG chatbot", "otomasi AI n8n"],
    sections: [
      {
        h: { id: "Sinyal bahwa bisnis Anda siap memakai chatbot AI", en: "Signals your business is ready for an AI chatbot" },
        body: [
          {
            id: "Chatbot AI paling berdampak ketika ada pola ini: tim Anda menjawab pertanyaan yang sama berulang-ulang (jam operasional, status pesanan, kebijakan, cara klaim), volume chat tinggi di jam tertentu, dan jawabannya sebenarnya sudah ada di dokumen atau sistem Anda. Dari pengalaman membangun chatbot untuk asuransi, telko, dan internal perusahaan — kasus “tier-1 berulang” inilah yang otomasinya paling menguntungkan.",
            en: "AI chatbots pay off most when this pattern exists: your team answers the same questions repeatedly (opening hours, order status, policies, claim procedures), chat volume spikes at certain hours, and the answers already live in your documents or systems. From building chatbots for insurance, telco, and corporate internal use — that repetitive “tier-1” traffic is where automation pays off most.",
          },
          {
            id: "Sebaliknya, kalau pertanyaan pelanggan Anda hampir selalu unik, sensitif, atau bernilai transaksi besar, manusia tetap harus di depan — chatbot cukup jadi penyaring dan pengumpul konteks awal.",
            en: "Conversely, if your customers' questions are almost always unique, sensitive, or high-stakes, humans should stay in front — the chatbot's job is just to triage and collect context first.",
          },
        ],
      },
      {
        h: { id: "RAG: cara chatbot menjawab dari data Anda (bukan mengarang)", en: "RAG: how a chatbot answers from your data (not make things up)" },
        body: [
          {
            id: "Kelemahan chatbot AI mentah adalah halusinasi — menjawab dengan percaya diri padahal salah. Solusinya adalah RAG (Retrieval-Augmented Generation): dokumen Anda (SOP, katalog, kebijakan) diindeks, lalu setiap pertanyaan dijawab berdasarkan potongan dokumen yang relevan, lengkap dengan sumbernya. Hasilnya: jawaban yang bisa diaudit dan dipercaya.",
            en: "The weakness of a raw AI chatbot is hallucination — confidently wrong answers. The fix is RAG (Retrieval-Augmented Generation): your documents (SOPs, catalogues, policies) are indexed, and every question is answered from the relevant document passages, with sources. The result: answers you can audit and trust.",
          },
          {
            id: "Praktik penting lain: pembatasan cakupan (chatbot hanya menjawab topik bisnis Anda), validasi input terstruktur untuk transaksi (form, bukan teks bebas), dan eskalasi mulus ke manusia ketika keyakinan model rendah.",
            en: "Other practices that matter: scope restriction (the bot only answers your business topics), structured input for transactions (forms, not free text), and smooth human escalation when the model's confidence is low.",
          },
        ],
      },
      {
        h: { id: "Otomasi di belakang layar dengan n8n", en: "Behind-the-scenes automation with n8n" },
        body: [
          {
            id: "Chatbot hanyalah wajah depan. Nilai sebenarnya sering ada di alur kerja di belakangnya: membuat tiket otomatis, memperbarui spreadsheet/CRM, mengirim notifikasi ke tim, atau menyusun laporan harian. Untuk ini saya banyak memakai n8n — platform otomasi yang menghubungkan chatbot, API internal, WhatsApp, email, dan database dalam satu alur yang bisa diaudit, tanpa vendor lock-in yang mahal.",
            en: "The chatbot is just the front. The real value is often in the workflows behind it: auto-creating tickets, updating spreadsheets/CRMs, notifying teams, or compiling daily reports. For this I use n8n heavily — an automation platform that wires the chatbot, internal APIs, WhatsApp, email, and databases into one auditable flow, without expensive vendor lock-in.",
          },
        ],
      },
      {
        h: { id: "Kesalahan umum yang membuat proyek chatbot gagal", en: "Common mistakes that sink chatbot projects" },
        body: [
          {
            id: "(1) Langsung ingin “bisa jawab semua” — cakupan terlalu luas membuat kualitas rendah di semua topik; mulailah dari 5–10 intent tersering. (2) Dokumen sumber tidak dirapikan — RAG hanya sebaik data yang diindeks. (3) Tidak ada jalur eskalasi ke manusia. (4) Tidak mengukur — tanpa log dan evaluasi, Anda tidak tahu bot menjawab benar atau tidak. (5) Memilih platform mahal sebelum kebutuhan terbukti — mulai kecil, ukur, baru skalakan.",
            en: "(1) Trying to “answer everything” on day one — over-broad scope means mediocre quality everywhere; start with your 5–10 most frequent intents. (2) Messy source documents — RAG is only as good as the indexed data. (3) No human escalation path. (4) No measurement — without logs and evaluation you can't tell whether the bot answers correctly. (5) Buying an expensive platform before the need is proven — start small, measure, then scale.",
          },
        ],
      },
      {
        h: { id: "Bagaimana memulai", en: "How to start" },
        body: [
          {
            id: "Mulailah dari satu kasus dengan volume tertinggi (misalnya pertanyaan status pesanan atau kebijakan klaim), kumpulkan dokumen sumbernya, dan bangun versi pertama yang cakupannya sempit tapi dalam. Dalam beberapa minggu Anda sudah bisa mengukur dampaknya. Kalau Anda ingin mendiskusikan kasus spesifik bisnis Anda — chatbot pelanggan, asisten internal, atau otomasi n8n — silakan hubungi saya; sesi diskusi awal selalu gratis.",
            en: "Start with your single highest-volume case (say, order-status or claims-policy questions), gather its source documents, and build a first version that is narrow but deep. Within weeks you can measure the impact. If you'd like to discuss your specific case — a customer chatbot, an internal assistant, or n8n automation — reach out; the initial discovery chat is always free.",
          },
        ],
      },
    ],
  },
];

export const postSlugs = posts.map((p) => p.slug);
