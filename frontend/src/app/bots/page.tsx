"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BotGrid from "@/components/bots/BotGrid";

export default function BotsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Bot Fleet</h1>
        <BotGrid />
      </div>
    </DashboardLayout>
  );
}
