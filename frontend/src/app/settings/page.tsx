"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="space-y-4 max-w-lg">
          <div className="bg-dark-800 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Theme</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-dark-600 rounded text-sm">Dark</button>
              <button className="px-3 py-1 bg-dark-700 rounded text-sm text-gray-500">Light</button>
            </div>
          </div>
          <div className="bg-dark-800 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Notifications</h3>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked className="rounded" />
              Enable push notifications
            </label>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
