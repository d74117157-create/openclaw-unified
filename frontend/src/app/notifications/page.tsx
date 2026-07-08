"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        <div className="text-gray-500 text-sm">No new notifications.</div>
      </div>
    </DashboardLayout>
  );
}
