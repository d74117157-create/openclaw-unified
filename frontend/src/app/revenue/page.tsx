"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import RevenueDashboard from "@/components/revenue/RevenueDashboard";

export default function RevenuePage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <RevenueDashboard />
      </div>
    </DashboardLayout>
  );
}
