import { cookies } from "next/headers";

/**
 * Server-side helper to call the real backend with Authorization from HttpOnly cookie.
 */
export async function backendFetch(path: string, init?: RequestInit) {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!base) throw new Error("NEXT_PUBLIC_BACKEND_URL missing");

  const token = (await cookies()).get("access_token")?.value;

  const url = path.startsWith("http") ? path : `${base}${path}`;

  return fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });
}
