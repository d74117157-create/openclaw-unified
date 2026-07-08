"use client";
import { useEffect, useState } from "react";
import { Activity, Bot, Wallet, Plug } from "lucide-react";

interface HealthData {
  status: string;
  backend?: { status: string; version: string };
}

export default function DashboardOverview() {
  const [health, setHealth] = useState<HealthData | null>(null);

  useEffect(() => {
    fetch("/api/system/health").then(r => r.json()).then(setHealth).catch(() => setHealth({ status: "error" }));
  }, []);

  const cards = [
    { title: "System Status", value: health?.status === "ok" ? "Online" : "Degraded", icon: Activity, color: health?.status === "ok" ? "text-green-400" : "text-yellow-400" },
    { title: "Active Agents", value: "5", icon: Bot, color: "text-purple-400" },
    { title: "Monthly Revenue", value: "$0.00", icon: Wallet, color: "text-cyan-400" },
    { title: "Integrations", value: "3 Active", icon: Plug, color: "text-green-400" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map(({ title, value, icon: Icon, color }) => (
          <div key={title} className="bg-dark-800 border border-dark-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{title}</span>
              <Icon size={18} className={color} />
            </div>
            <div className="text-xl font-bold">{value}</div>
          </div>
        ))}
      </div>
      <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Welcome to OpenClaw</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          Your AI-powered digital empire command center is now operational. Navigate through the sidebar
          to manage agents, monitor bots, track revenue, and configure integrations. All systems are
          connected and ready for scale.
        </p>
        <div className="mt-4 flex gap-3">
          <a href="/command" className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded text-sm font-medium hover:opacity-90 transition-opacity">
            Open Command Center
          </a>
          <a href="/agents" className="px-4 py-2 bg-dark-700 rounded text-sm text-gray-300 hover:bg-dark-600 transition-colors">
            Manage Agents
          </a>
        </div>
      </div>
    </div>
  );
}
