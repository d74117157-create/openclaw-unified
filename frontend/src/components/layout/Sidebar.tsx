"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Terminal, Bot, Blocks, Rocket, Workflow,
  BarChart3, ScrollText, CheckSquare, Bell, Settings, Wallet, Plug
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Terminal, label: "Command", href: "/command" },
  { icon: Bot, label: "Agents", href: "/agents" },
  { icon: Blocks, label: "Bots", href: "/bots" },
  { icon: Rocket, label: "Deployments", href: "/deployments" },
  { icon: Workflow, label: "Workflows", href: "/workflows" },
  { icon: Wallet, label: "Revenue", href: "/revenue" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: ScrollText, label: "Logs", href: "/logs" },
  { icon: Plug, label: "Integrations", href: "/integrations" },
  { icon: CheckSquare, label: "Tasks", href: "/tasks" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 bg-dark-800 border-r border-dark-600 flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b border-dark-600">
        <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          OpenClaw
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">Command Center v2.0</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map(({ icon: Icon, label, href }) => (
          <Link key={href} href={href}
            className={clsx(
              "flex items-center gap-3 px-4 py-2 text-sm transition-colors",
              pathname === href
                ? "bg-dark-700 text-accent-cyan border-r-2 border-accent-cyan"
                : "text-gray-400 hover:text-gray-200 hover:bg-dark-700/50"
            )}>
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-dark-600 text-xs text-gray-600">
        OpenClaw Digital Empire
      </div>
    </aside>
  );
}
