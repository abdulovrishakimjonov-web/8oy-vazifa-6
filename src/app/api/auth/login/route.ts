import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type LoginBody = { email: string; password: string };

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://admin-crm.onrender.com";

// URL ni to'g'ri yig'amiz (oxirida / bo'lsa ham muammo bo'lmasin)
const BACKEND_LOGIN_URL = `${BACKEND_URL.replace(/\/$/, "")}/api/auth/sign-in`;

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as LoginBody | null;

    if (!body?.email || !body?.password) {
      return NextResponse.json(
        { ok: false, message: "Email yoki parol yuborilmadi" },
        { status: 400 }
      );
    }

    const r = await fetch(BACKEND_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: body.email.trim(),
        password: body.password,
      }),
    });

    const data = await r.json().catch(() => ({}));

    if (!r.ok) {
      return NextResponse.json(
        {
          ok: false,
          status: r.status,
          message: (data as any)?.message || (data as any)?.error || "Login xato",
        },
        { status: r.status }
      );
    }

    const access = (data as any)?.access_token || (data as any)?.token;
    if (!access) {
      return NextResponse.json(
        { ok: false, message: "Token topilmadi (access_token/token)" },
        { status: 500 }
      );
    }

    (await cookies()).set("access_token", access, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 kun
    });

    if ((data as any)?.refresh_token) {
      (await cookies()).set("refresh_token", (data as any).refresh_token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 kun
      });
    }

    return NextResponse.json({ ok: true, user: (data as any)?.user ?? null });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, message: e?.message || "Server xatolik" },
      { status: 500 }
    );
  }
}