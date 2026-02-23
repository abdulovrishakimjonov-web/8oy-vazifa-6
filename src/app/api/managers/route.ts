import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 1, fullName: "Olim Olimov", email: "manager1@example.com" },
      { id: 2, fullName: "Dilshod Karimov", email: "manager2@example.com" },
      { id: 3, fullName: "Malika Aliyeva", email: "manager3@example.com" },
    ],
  });
}
