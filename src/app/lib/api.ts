export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export async function apiFetch<T>(pathOrUrl: string, options: RequestInit = {}): Promise<T> {
  const isFullUrl = /^https?:\/\//i.test(pathOrUrl);
  const url = isFullUrl ? pathOrUrl : `${API_BASE}${pathOrUrl}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data?.message || data?.error || "Request failed";
    throw new Error(message);
  }

  return data as T;
}
