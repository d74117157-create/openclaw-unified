"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function LogsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">System Logs</h1>
        <div className="bg-dark-800 rounded-lg p-4 font-mono text-xs text-gray-400">
          <p>2025-01-01 00:00:01 [INFO] OpenClaw Backend started</p>
          <p>2025-01-01 00:00:02 [INFO] Connected to Supabase</p>
          <p>2025-01-01 00:00:03 [INFO] All agents loaded successfully</p>
          <p>2025-01-01 00:00:04 [INFO] Bot fleet online</p>
          <p>2025-01-01 00:00:05 [INFO] Listening on port 8000</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
