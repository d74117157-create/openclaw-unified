"use client";
import { useEffect, useState } from "react";
import { Bot, MessageCircle, Radio } from "lucide-react";

interface BotData {
  id: string;
  name: string;
  platform: string;
  status: string;
  username?: string;
  client_id?: string;
}

export default function BotGrid() {
  const [bots, setBots] = useState<BotData[]>([]);
  useEffect(() => {
    fetch("/api/bots").then(r => r.json()).then(setBots).catch(() => {});
  }, []);

  const getIcon = (platform: string) => {
    if (platform === "discord") return <MessageCircle size={18} />;
    if (platform === "slack") return <Radio size={18} />;
    return <Bot size={18} />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bots.map(bot => (
        <div key={bot.id} className="bg-dark-800 border border-dark-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="text-accent-cyan">{getIcon(bot.platform)}</div>
              <h3 className="font-semibold text-sm">{bot.name}</h3>
            </div>
            <span className={`w-2 h-2 rounded-full ${bot.status === "online" ? "bg-green-500" : "bg-gray-500"}`} />
          </div>
          <div className="space-y-1 text-xs text-gray-500">
            <p>Platform: <span className="text-gray-400 capitalize">{bot.platform}</span></p>
            {bot.username && <p>Handle: <span className="text-gray-400">{bot.username}</span></p>}
            {bot.client_id && <p>Client ID: <span className="text-gray-400">{bot.client_id}</span></p>}
          </div>
          <div className="mt-3 flex gap-2">
            <span className="text-[10px] px-2 py-0.5 bg-dark-700 rounded text-gray-400">{bot.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
