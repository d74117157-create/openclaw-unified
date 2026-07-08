"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useEffect, useState } from "react";

interface Agent {
  id: string; name: string; role: string; status: string; model: string; description: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agents`).then(r => r.json()).then(setAgents);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">AI Agents</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map(agent => (
            <div key={agent.id} className="bg-dark-800 border border-dark-600 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                  {agent.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold">{agent.name}</h3>
                  <span className="text-xs text-accent-green">{agent.status}</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-2">{agent.role}</p>
              <p className="text-xs text-gray-500">{agent.description}</p>
              <span className="inline-block mt-3 text-xs bg-dark-700 px-2 py-1 rounded">{agent.model}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
