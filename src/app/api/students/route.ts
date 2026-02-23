import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 1, fullName: "Student 1", phone: "+998 90 000 00 01" },
      { id: 2, fullName: "Student 2", phone: "+998 90 000 00 02" },
      { id: 3, fullName: "Student 3", phone: "+998 90 000 00 03" },
    ],
  });
}
