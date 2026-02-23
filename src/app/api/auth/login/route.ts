import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type LoginBody = { email: string; password: string };

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://admin-crm.onrender.com";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as LoginBody | null;

    if (!body?.email || !body?.password) {
      return NextResponse.json(
        { ok: false, message: "Email yoki parol yuborilmadi" },
        { status: 400 }
      );
    }

    const r = await fetch(`${BACKEND_URL}/api/auth/sign-in`, {
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

    const data = await r.json().catch(() => ({} as any));

    if (!r.ok) {
      return NextResponse.json(
        {
          ok: false,
          status: r.status,
          message: data?.message || data?.error || "Login xato",
        },
        { status: r.status }
      );
    }

    const access = data?.access_token || data?.token;
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

    if (data?.refresh_token) {
      (await cookies()).set("refresh_token", data.refresh_token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return NextResponse.json({ ok: true, user: data?.user ?? null });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, message: e?.message || "Server xatolik" },
      { status: 500 }
    );
  }
}
