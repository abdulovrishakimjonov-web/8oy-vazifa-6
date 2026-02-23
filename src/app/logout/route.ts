import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  (await cookies()).set("access_token", "", { path: "/", maxAge: 0 });
  (await cookies()).set("refresh_token", "", { path: "/", maxAge: 0 });

  const url = new URL(req.url);
  url.pathname = "/login";
  url.search = "";
  return NextResponse.redirect(url);
}
