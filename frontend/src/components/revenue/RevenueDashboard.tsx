"use client";
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, DollarSign, BarChart3 } from "lucide-react";

interface RevenueData {
  daily: number;
  weekly: number;
  monthly: number;
  mrr_estimate: number;
  by_source: Record<string, number>;
  trend_percent: number;
}

const COLORS = ["#00f0ff", "#a855f7", "#22c55e", "#f59e0b", "#ef4444"];

export default function RevenueDashboard() {
  const [data, setData] = useState<RevenueData | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/revenue/summary").then(r => r.json()).then(setData);
    fetch("/api/revenue/chart?days=30").then(r => r.json()).then(d => {
      if (Array.isArray(d) && d.length > 0) setChartData(d);
      else {
        // Generate sample data
        const sample = Array.from({ length: 30 }, (_, i) => ({
          date: `Day ${i + 1}`,
          revenue: Math.floor(Math.random() * 500) + 100
        }));
        setChartData(sample);
      }
    });
  }, []);

  const pieData = data ? Object.entries(data.by_source).map(([name, value]) => ({ name, value })) : [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Revenue Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Today", value: data?.daily ?? 0, icon: DollarSign },
          { label: "This Week", value: data?.weekly ?? 0, icon: BarChart3 },
          { label: "This Month", value: data?.monthly ?? 0, icon: TrendingUp },
          { label: "MRR Estimate", value: data?.mrr_estimate ?? 0, icon: DollarSign },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-dark-800 border border-dark-600 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={16} className="text-accent-cyan" />
              <span className="text-sm text-gray-400">{label}</span>
            </div>
            <p className="text-xl font-bold">${value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-800 border border-dark-600 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-4 text-gray-300">Revenue Trend (30 Days)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #252540", borderRadius: "6px" }} />
              <Area type="monotone" dataKey="revenue" stroke="#00f0ff" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-4 text-gray-300">Revenue by Source</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #252540", borderRadius: "6px" }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-gray-500 text-sm">No data yet</div>
          )}
          <div className="mt-3 space-y-1">
            {pieData.map((s, i) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-gray-400 capitalize">{s.name}:</span>
                <span className="text-gray-300">${s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
