import {
  SiPython, SiFastapi, SiPostgresql, SiDocker, SiKubernetes, SiGooglecloud,
  SiTensorflow, SiPytorch, SiScikitlearn, SiReact, SiNextdotjs, SiApachekafka,
  SiApacheairflow, SiRedis, SiMongodb, SiTerraform, SiLangchain, SiOpenai,
  SiClaude, SiGooglegemini, SiPandas, SiNumpy, SiGrafana, SiGooglebigquery,
  SiFirebase, SiApachespark, SiHuggingface, SiGitlab,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

// Brand colors; dark logos use a light tint so they read on the dark UI.
const LIGHT = "#e7e9f5";

// Curated marquee set (all grounded in the dossier stack).
export const TECHS = [
  { Icon: SiPython, name: "Python", color: "#3776AB" },
  { Icon: SiFastapi, name: "FastAPI", color: "#009688" },
  { Icon: SiGooglecloud, name: "Google Cloud", color: "#4285F4" },
  { Icon: FaAws, name: "AWS", color: "#FF9900" },
  { Icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { Icon: SiDocker, name: "Docker", color: "#2496ED" },
  { Icon: SiKubernetes, name: "Kubernetes", color: "#326CE5" },
  { Icon: SiTensorflow, name: "TensorFlow", color: "#FF6F00" },
  { Icon: SiPytorch, name: "PyTorch", color: "#EE4C2C" },
  { Icon: SiScikitlearn, name: "scikit-learn", color: "#F7931E" },
  { Icon: SiLangchain, name: "LangChain", color: LIGHT },
  { Icon: SiOpenai, name: "OpenAI", color: LIGHT },
  { Icon: SiClaude, name: "Claude", color: "#D97757" },
  { Icon: SiGooglegemini, name: "Gemini", color: "#8E75F8" },
  { Icon: SiReact, name: "React", color: "#61DAFB" },
  { Icon: SiNextdotjs, name: "Next.js", color: LIGHT },
  { Icon: SiApachekafka, name: "Kafka", color: LIGHT },
  { Icon: SiApacheairflow, name: "Airflow", color: "#017CEE" },
  { Icon: SiApachespark, name: "Spark", color: "#E25A1C" },
  { Icon: SiRedis, name: "Redis", color: "#FF4438" },
  { Icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { Icon: SiGooglebigquery, name: "BigQuery", color: "#669DF6" },
  { Icon: SiTerraform, name: "Terraform", color: "#7B42BC" },
  { Icon: SiGrafana, name: "Grafana", color: "#F46800" },
  { Icon: SiHuggingface, name: "Hugging Face", color: "#FFD21E" },
  { Icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
];

// Keyword → icon, for decorating skill chips. First match wins.
const RULES = [
  [/fastapi/i, SiFastapi, "#009688"],
  [/python/i, SiPython, "#3776AB"],
  [/postgre/i, SiPostgresql, "#4169E1"],
  [/docker/i, SiDocker, "#2496ED"],
  [/kubernetes/i, SiKubernetes, "#326CE5"],
  [/google cloud|cloud run|bigquery|gcs|composer|cloud functions|cloud sql|vertex/i, SiGooglecloud, "#4285F4"],
  [/\baws\b|lambda|cloudwatch|amazon/i, FaAws, "#FF9900"],
  [/tensorflow/i, SiTensorflow, "#FF6F00"],
  [/pytorch/i, SiPytorch, "#EE4C2C"],
  [/scikit/i, SiScikitlearn, "#F7931E"],
  [/keras/i, SiTensorflow, "#FF6F00"],
  [/langchain|langgraph/i, SiLangchain, LIGHT],
  [/openai|gpt/i, SiOpenai, LIGHT],
  [/claude|anthropic/i, SiClaude, "#D97757"],
  [/gemini/i, SiGooglegemini, "#8E75F8"],
  [/react/i, SiReact, "#61DAFB"],
  [/next\.?js/i, SiNextdotjs, LIGHT],
  [/kafka/i, SiApachekafka, LIGHT],
  [/airflow/i, SiApacheairflow, "#017CEE"],
  [/spark|pyspark/i, SiApachespark, "#E25A1C"],
  [/redis/i, SiRedis, "#FF4438"],
  [/mongo/i, SiMongodb, "#47A248"],
  [/terraform/i, SiTerraform, "#7B42BC"],
  [/grafana/i, SiGrafana, "#F46800"],
  [/firebase/i, SiFirebase, "#FFCA28"],
  [/gitlab/i, SiGitlab, "#FC6D26"],
  [/pandas/i, SiPandas, LIGHT],
  [/numpy/i, SiNumpy, "#4DABCF"],
  [/ollama|hugging/i, SiHuggingface, "#FFD21E"],
];

export function getTechIcon(label) {
  for (const [re, Icon, color] of RULES) {
    if (re.test(label)) return { Icon, color };
  }
  return null;
}
