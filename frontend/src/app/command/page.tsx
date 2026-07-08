"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AIChatConsole from "@/components/command/AIChatConsole";

export default function CommandPage() {
  return (
    <DashboardLayout>
      <AIChatConsole />
    </DashboardLayout>
  );
}
