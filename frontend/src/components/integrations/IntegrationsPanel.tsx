"use client";
import { useEffect, useState } from "react";
import { Plug, CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: string;
  health: string;
  description: string;
  latency_ms: number;
  docs_url?: string;
}

export default function IntegrationsPanel() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [testing, setTesting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/integrations").then(r => r.json()).then(d => setIntegrations(Array.isArray(d) ? d : []));
  }, []);

  const testIntegration = async (id: string) => {
    setTesting(id);
    try {
      const resp = await fetch(`/api/integrations/${id}/test`, { method: "POST" });
      const result = await resp.json();
      alert(result.ok ? `Integration healthy (${result.latency_ms}ms)` : "Integration test failed");
    } catch {
      alert("Test failed - backend unreachable");
    }
    setTesting(null);
  };

  const getIcon = (slug: string) => {
    return <Plug size={18} />;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Integrations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map(integ => (
          <div key={integ.id} className="bg-dark-800 border border-dark-600 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-accent-cyan">{getIcon(integ.slug)}</div>
                <div>
                  <h3 className="font-semibold text-sm">{integ.name}</h3>
                  <span className="text-[10px] text-gray-500 uppercase">{integ.category}</span>
                </div>
              </div>
              {integ.status === "connected" ? (
                <CheckCircle size={16} className="text-green-400" />
              ) : (
                <XCircle size={16} className="text-red-400" />
              )}
            </div>
            <p className="text-xs text-gray-500 mb-3">{integ.description}</p>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] px-2 py-0.5 rounded ${
                integ.health === "healthy" ? "bg-green-900/50 text-green-400" : "bg-yellow-900/50 text-yellow-400"
              }`}>{integ.health}</span>
              <span className="text-[10px] text-gray-500">{integ.latency_ms}ms</span>
            </div>
            <button onClick={() => testIntegration(integ.id)} disabled={testing === integ.id}
              className="mt-3 w-full py-1.5 bg-dark-700 hover:bg-dark-600 rounded text-xs text-gray-300 transition-colors flex items-center justify-center gap-1 disabled:opacity-50">
              <RefreshCw size={12} className={testing === integ.id ? "animate-spin" : ""} />
              {testing === integ.id ? "Testing..." : "Test Connection"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
