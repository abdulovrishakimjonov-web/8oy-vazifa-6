import { NextResponse } from "next/server";
import { backendFetch } from "../../_utils/backend";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false, message: "Body JSON emas" }, { status: 400 });
  }

  const r = await backendFetch("/api/student/create-student", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
