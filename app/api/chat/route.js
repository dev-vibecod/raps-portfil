import { NextResponse } from "next/server";
import { buildKnowledge, SYSTEM_PROMPT } from "@/lib/aiKnowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

export async function POST(req) {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "AI is not configured." }, { status: 503 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Sanitize: keep only user/assistant turns, cap count and length.
  const incoming = Array.isArray(body?.messages) ? body.messages : [];
  const history = incoming
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return NextResponse.json({ error: "No question." }, { status: 400 });
  }

  const messages = [
    { role: "system", content: `${SYSTEM_PROMPT}\n\n# KNOWLEDGE BASE\n${buildKnowledge()}` },
    ...history,
  ];

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.3,
        max_completion_tokens: 1024,
        top_p: 1,
        reasoning_effort: "low",
        stream: false,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Groq error", res.status, detail.slice(0, 300));
      return NextResponse.json({ error: "AI request failed." }, { status: 502 });
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content?.trim();
    if (!content) {
      return NextResponse.json({ content: "Maaf, saya belum bisa menjawab itu. Coba tanyakan tentang pengalaman, proyek, atau jasa Rafif." });
    }
    return NextResponse.json({ content });
  } catch (e) {
    console.error("Chat route error", e);
    return NextResponse.json({ error: "AI request failed." }, { status: 500 });
  }
}
