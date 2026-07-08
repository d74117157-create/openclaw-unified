"use client";
import { Bell, User } from "lucide-react";

export default function TopBar() {
  return (
    <header className="h-14 bg-dark-800 border-b border-dark-600 flex items-center justify-between px-6">
      <div className="text-sm text-gray-400">
        <span className="text-accent-green">●</span> Backend Online
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-red rounded-full text-[10px] flex items-center justify-center">0</span>
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <User size={14} />
          </div>
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
}
