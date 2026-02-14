import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiFetch } from "../../../lib/api";

type LoginBody = { email: string; password: string };

const BACKEND_LOGIN_URL = "https://admin-crm.onrender.com/api/auth/sign-in";

export async function POST(req: Request) {
  const body = (await req.json()) as LoginBody;

  const result = await apiFetch<{
    access_token?: string;
    token?: string;
    refresh_token?: string;
    user?: any;
  }>(BACKEND_LOGIN_URL, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const access = result.access_token || result.token;
  if (!access) {
    return NextResponse.json(
      { ok: false, message: "Token topilmadi (access_token/token)" },
      { status: 500 },
    );
  }

  (await cookies()).set("access_token", access, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  if (result.refresh_token) {
    (await cookies()).set("refresh_token", result.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return NextResponse.json({ ok: true, user: result.user ?? null });
}
