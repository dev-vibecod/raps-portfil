// The stack, grouped by domain, as plain text.
//
// This replaces the old `lib/techIcons.js`, which imported 31 brand icons from
// `react-icons` and served two things: a 27-logo marquee (54 inline SVGs, 116 KB
// — 30% of the home page document) and a logo on each of 93 skill chips
// (~150 KB on /about). Both were bytes spent on decoration: the marquee moved
// too fast to read, and 93 small brand colours fought every other decision on
// the page. As text this file is ~1 KB and drops the `react-icons` dependency.
export const TECH_GROUPS = [
  {
    label: "AI / LLM",
    items: ["RAG", "LangChain", "OpenAI", "Claude", "Gemini", "Hugging Face", "n8n"],
  },
  {
    label: "Backend",
    items: ["Python", "FastAPI", "PostgreSQL", "Redis", "MongoDB", "Supabase"],
  },
  {
    label: "Data",
    items: ["Airflow", "Kafka", "Spark", "BigQuery", "Pandas", "NumPy"],
  },
  {
    label: "ML",
    items: ["TensorFlow", "PyTorch", "scikit-learn"],
  },
  {
    label: "Cloud / Ops",
    items: ["Google Cloud", "AWS", "Docker", "Kubernetes", "Terraform", "Grafana"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js"],
  },
];
