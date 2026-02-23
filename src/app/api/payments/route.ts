import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 1, student: "Student 1", amount: 1200000, status: "paid" },
      { id: 2, student: "Student 2", amount: 600000, status: "partial" },
    ],
  });
}
