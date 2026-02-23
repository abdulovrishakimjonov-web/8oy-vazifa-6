export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  const data = await r.json().catch(() => ({}));

  if (!r.ok) {
    const msg =
      (data && (data.message || data.error || data.detail)) ||
      `HTTP ${r.status}`;
    throw new Error(msg);
  }

  return data as T;
}