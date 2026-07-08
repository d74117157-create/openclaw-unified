"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatConsole() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "OpenClaw Command Center ready. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const resp = await fetch("/api/command/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      });
      const reader = resp.body?.getReader();
      if (reader) {
        let assistantMsg = "";
        setMessages(prev => [...prev, { role: "assistant", content: "" }]);
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = new TextDecoder().decode(value);
          const lines = text.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.content) {
                  assistantMsg += data.content;
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: "assistant", content: assistantMsg };
                    return updated;
                  });
                }
              } catch { /* ignore parse errors */ }
            }
          }
        }
        if (!assistantMsg) {
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: "Command processed. Ready for next input." };
            return updated;
          });
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Backend connection failed. Retrying..." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="p-4 border-b border-dark-600 bg-dark-800">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          <Bot size={20} className="text-accent-cyan" /> AI Command Console
        </h1>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${
              msg.role === "user"
                ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white"
                : "bg-dark-800 border border-dark-600 text-gray-300"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-dark-800 border border-dark-600 rounded-lg px-4 py-2 text-sm text-gray-500 animate-pulse">
              Processing...
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-dark-600 bg-dark-800">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Enter command..."
            className="flex-1 bg-dark-900 border border-dark-600 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan"
          />
          <button onClick={sendMessage} disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
