import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 1, title: "Frontend", price: 1200000 },
      { id: 2, title: "Backend", price: 1500000 },
      { id: 3, title: "Design", price: 1000000 },
    ],
  });
}
