"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, ArrowUp, Sparkles } from "lucide-react";

export default function ChatWidget({ dict }) {
  const t = dict.chat;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // {role, content}
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading, open]);

  async function send(text) {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    const next = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      const isStream = res.ok && res.headers.get("content-type")?.includes("text/plain");
      if (isStream && res.body) {
        // Append an empty assistant bubble, then fill it as chunks arrive.
        setMessages([...next, { role: "assistant", content: "" }]);
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          const snapshot = acc;
          setMessages([...next, { role: "assistant", content: snapshot }]);
        }
        if (!acc.trim()) setMessages([...next, { role: "assistant", content: t.error }]);
      } else {
        const data = await res.json().catch(() => ({}));
        setMessages([...next, { role: "assistant", content: data.content || data.error || t.error }]);
      }
    } catch {
      setMessages([...next, { role: "assistant", content: t.error }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="no-print">
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t.title}
        aria-expanded={open}
        aria-controls="chat-panel"
        className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-iris-500 text-ink-900 transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X size={22} aria-hidden /> : <MessageCircle size={22} aria-hidden />}
      </button>

      {/* Panel */}
      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label={t.title}
          className="glass fixed bottom-24 right-5 z-[60] flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl shadow-card"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-line bg-veil px-4 py-3.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-iris-500/20 text-iris-400 ring-1 ring-iris-500/40">
              <Sparkles size={16} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{t.title}</p>
              <p className="truncate text-2xs text-mist/70">{t.disclaimer}</p>
            </div>
          </div>

          {/* Messages */}
          {/* Replies stream in a token at a time. Without a live region a
              screen-reader user gets silence and has to hunt for the answer. */}
          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl border border-line bg-ink-600 px-3.5 py-2.5 text-sm leading-relaxed text-mist">
                {t.greeting}
              </div>
            </div>

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {t.suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-iris-500/30 bg-iris-500/10 px-3 py-1.5 text-xs text-iris-300 transition-colors hover:bg-iris-500/20"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-iris-500 font-medium text-ink-900" : "border border-line bg-ink-600 text-mist"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl border border-line bg-ink-600 px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-iris-400" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-center gap-2 border-t border-line bg-veil p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              {t.placeholder}
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 rounded-full border border-line bg-ink-700 px-4 py-2.5 text-sm text-white placeholder:text-mist/60 focus:border-iris-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-iris-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-iris-500 text-ink-900 transition-colors hover:bg-iris-400 disabled:opacity-40"
            >
              <ArrowUp size={18} aria-hidden />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
