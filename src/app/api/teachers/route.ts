import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 1, fullName: "Ustoz A", subject: "Frontend" },
      { id: 2, fullName: "Ustoz B", subject: "Backend" },
    ],
  });
}
