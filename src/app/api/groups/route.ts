import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 1, name: "Frontend-01", course: "Frontend" },
      { id: 2, name: "Backend-02", course: "Backend" },
    ],
  });
}
