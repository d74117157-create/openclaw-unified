"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import IntegrationsPanel from "@/components/integrations/IntegrationsPanel";

export default function IntegrationsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <IntegrationsPanel />
      </div>
    </DashboardLayout>
  );
}
