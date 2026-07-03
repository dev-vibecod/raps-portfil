import { NextResponse } from "next/server";
import { buildKnowledge, SYSTEM_PROMPT } from "@/lib/aiKnowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

// Simple in-memory per-IP rate limit (per serverless instance — a pragmatic
// spam brake, not a hard guarantee): max 10 requests per 5 minutes.
const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQ = 10;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_REQ) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear(); // memory backstop
  return false;
}

export async function POST(req) {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "AI is not configured." }, { status: 503 });
  }

  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Coba lagi beberapa menit lagi." },
      { status: 429 }
    );
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
        stream: true,
      }),
    });

    if (!res.ok || !res.body) {
      const detail = await res.text().catch(() => "");
      console.error("Groq error", res.status, detail.slice(0, 300));
      return NextResponse.json({ error: "AI request failed." }, { status: 502 });
    }

    // Re-emit Groq's SSE stream as plain text chunks (assistant content only).
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let buffer = "";

    const stream = new ReadableStream({
      async start(controller) {
        const reader = res.body.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              const data = line.replace(/^data: ?/, "").trim();
              if (!data || data === "[DONE]") continue;
              try {
                const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
                if (delta) controller.enqueue(encoder.encode(delta));
              } catch {
                /* ignore malformed keep-alives */
              }
            }
          }
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("Chat route error", e);
    return NextResponse.json({ error: "AI request failed." }, { status: 500 });
  }
}
