const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const resp = await fetch(`${API_BASE}${path}`, options);
  if (!resp.ok) throw new Error(`API error: ${resp.status}`);
  return resp.json();
}
