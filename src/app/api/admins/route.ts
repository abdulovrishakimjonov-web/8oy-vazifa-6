import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 1, fullName: "Admin One", email: "admin1@example.com" },
      { id: 2, fullName: "Admin Two", email: "admin2@example.com" },
    ],
  });
}
