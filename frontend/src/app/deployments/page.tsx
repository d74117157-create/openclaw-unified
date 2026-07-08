"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useEffect, useState } from "react";

interface Deployment {
  id: string; name: string; platform: string; status: string; url: string; last_deploy: string;
}

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deployments`).then(r => r.json()).then(setDeployments);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Deployments</h1>
        <div className="space-y-4">
          {deployments.map(d => (
            <div key={d.id} className="bg-dark-800 border border-dark-600 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{d.name}</h3>
                <span className="text-xs text-gray-500">{d.platform}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded ${d.status === 'live' ? 'bg-green-900 text-green-400' : 'bg-yellow-900 text-yellow-400'}`}>{d.status}</span>
                <a href={d.url} target="_blank" rel="noopener" className="text-xs text-accent-cyan hover:underline">Open →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
