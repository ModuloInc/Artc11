import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST() {
  try {
    const guestId = Math.random().toString(36).substring(2, 10);
    const guestName = `Guest_${guestId}`;
    const guestEmail = `guest_${guestId}@demo.com`;
    const randomPassword = Math.random().toString(36).substring(2, 15);

    const user = await prisma.user.create({
      data: {
        email: guestEmail,
        password: randomPassword,
        fullname: guestName,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Guest account created successfully",
      user: { id: user.id, email: user.email, fullname: user.fullname },
    });
  } catch (error) {
    console.error("Guest login error:", error);
    return NextResponse.json(
      { error: "Failed to create guest account" },
      { status: 500 }
    );
  }
}
