"use client";
import { useEffect, useState } from "react";

interface RevenueSummary {
  daily: number;
  weekly: number;
  monthly: number;
  mrr_estimate: number;
  by_source: Record<string, number>;
  trend_percent: number;
}

export function useRevenue() {
  const [data, setData] = useState<RevenueSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/revenue/summary")
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
