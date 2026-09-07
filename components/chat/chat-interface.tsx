"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bot, Send, Map, Utensils, PlaneTakeoff, Building2, Luggage, Bus, Info, Sparkles } from "lucide-react";
import { AIRPORT_CONFIG, QUICK_PROMPTS } from "@/lib/airport-config";
import { getDemoReply } from "@/lib/chat-service";

interface MessageItem {
  id: string;
  sender: "user" | "bot";
  text: string;
}

function replyFor(userText: string) {
  return getDemoReply(userText).text;
}

export function ChatInterface() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "bot-welcome",
      sender: "bot",
      text: `Halo! Saya ${AIRPORT_CONFIG.brandName}. Bagaimana saya bisa membantu perjalanan Anda di ${AIRPORT_CONFIG.name} (${AIRPORT_CONFIG.code}) hari ini?`,
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  function sendMessage(userText: string) {
    const text = userText.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, sender: "user", text }]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, sender: "bot", text: replyFor(text) },
      ]);
      setIsTyping(false);
    }, 700);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  const showSuggestions = messages.length === 1 && !isTyping;

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-8 md:px-12 py-6 flex flex-col gap-6 max-w-[840px] mx-auto w-full pb-32">
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <Link href="/flights" className="shrink-0 glass-chip px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-cyan-300 flex items-center gap-2">
            <PlaneTakeoff className="size-4 text-[#00d2ff]" />
            Jadwal Penerbangan
          </Link>
          <Link href="/facilities" className="shrink-0 glass-chip px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-cyan-300 flex items-center gap-2">
            <Building2 className="size-4 text-[#00d2ff]" />
            Fasilitas & Denah
          </Link>
          <Link href="/baggage" className="shrink-0 glass-chip px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-cyan-300 flex items-center gap-2">
            <Luggage className="size-4 text-[#00d2ff]" />
            Layanan Bagasi
          </Link>
          <Link href="/transport" className="shrink-0 glass-chip px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-cyan-300 flex items-center gap-2">
            <Bus className="size-4 text-[#00d2ff]" />
            Transportasi & Taksi
          </Link>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3.5 w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-300 shadow-[0_0_12px_rgba(0,210,255,0.25)]">
                <Bot className="size-5" />
              </div>
            )}
            <div
              className={`max-w-[82%] sm:max-w-[75%] p-4 sm:p-5 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "chat-bubble-user text-white rounded-tr-none font-medium"
                  : "chat-bubble-bot text-slate-100 rounded-tl-none shadow-xl border border-white/10"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-white/10">
                  <Sparkles className="size-3.5 text-[#00d2ff]" />
                  <span className="font-semibold text-xs text-cyan-300 tracking-wide">{AIRPORT_CONFIG.brandName}</span>
                  <span className="text-[10px] text-slate-400 font-mono ml-auto">{AIRPORT_CONFIG.code} · Data demo</span>
                </div>
              )}
              <p>{msg.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3.5 w-full">
            <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-300">
              <Bot className="size-5" />
            </div>
            <div className="chat-bubble-bot px-5 py-4 rounded-2xl rounded-tl-none border border-white/10">
              <p className="sr-only">Asisten sedang mengetik</p>
              <span className="flex items-center gap-1.5" aria-hidden>
                <span className="size-1.5 rounded-full bg-cyan-300 animate-bounce" />
                <span className="size-1.5 rounded-full bg-cyan-300 animate-bounce [animation-delay:120ms]" />
                <span className="size-1.5 rounded-full bg-cyan-300 animate-bounce [animation-delay:240ms]" />
              </span>
            </div>
          </div>
        )}

        {showSuggestions && (
          <div className="flex items-start gap-3.5 max-w-[88%] sm:max-w-[78%] mt-2">
            <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-300 shadow-[0_0_10px_rgba(0,210,255,0.2)]">
              <Sparkles className="size-5" />
            </div>
            <div className="glass-panel rounded-2xl p-5 w-full shadow-2xl border border-white/10">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">Saran berikutnya</span>
                <Info className="size-4 text-slate-400" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/facilities"
                  className="p-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-400/40 transition-all group flex flex-col gap-1.5 cursor-pointer"
                >
                  <Map className="size-5 text-[#00d2ff] group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-sm text-white group-hover:text-cyan-300 transition-colors">Lihat denah terminal</p>
                  <p className="text-xs text-slate-400">Denah lantai, gate & lounge {AIRPORT_CONFIG.code}</p>
                </Link>
                <Link
                  href="/facilities"
                  className="p-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-400/40 transition-all group flex flex-col gap-1.5 cursor-pointer"
                >
                  <Utensils className="size-5 text-[#00d2ff] group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-sm text-white group-hover:text-cyan-300 transition-colors">Cari tempat makan</p>
                  <p className="text-xs text-slate-400">Kuliner khas Manado & kedai kopi</p>
                </Link>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-cyan-500/20 text-xs text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/30 transition-all cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="mobile-search-bar glass-header fixed bottom-[72px] lg:bottom-0 left-0 lg:left-[320px] right-0 p-4 z-30 bg-[#0A0F1C]/80 backdrop-blur-xl border-t border-white/10">
        <form onSubmit={handleSubmit} className="max-w-[800px] mx-auto">
          <div className="relative flex items-center">
            <input
              aria-label="Tulis pertanyaan untuk asisten bandara"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              placeholder={`Tanyakan informasi, penerbangan, atau gate ${AIRPORT_CONFIG.code}...`}
              className="w-full glass-input rounded-full py-3.5 pl-5 pr-14 text-sm text-white focus:outline-none placeholder:text-slate-400 disabled:opacity-60"
            />
            <button
              type="submit"
              aria-label="Kirim pesan"
              disabled={isTyping || !input.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-[#0A0F1C] rounded-full flex items-center justify-center hover:opacity-90 transition-all shadow-[0_0_12px_rgba(0,210,255,0.3)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="size-4.5" />
            </button>
          </div>
          <p className="text-center text-[11px] text-slate-400 mt-2 font-mono">
            {AIRPORT_CONFIG.brandName} · Data contoh. Verifikasi jadwal dengan pengumuman di terminal.
          </p>
        </form>
      </div>
    </div>
  );
}
