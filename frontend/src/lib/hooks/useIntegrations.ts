"use client";
import { useEffect, useState } from "react";

interface Integration {
  id: string;
  name: string;
  slug: string;
  status: string;
  health: string;
}

export function useIntegrations() {
  const [data, setData] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/integrations")
      .then(r => r.json())
      .then(d => setData(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
