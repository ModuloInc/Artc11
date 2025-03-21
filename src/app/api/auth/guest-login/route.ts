import { NextResponse } from 'next/server';
import { prisma } from "@/lib/db";

export async function POST() {
    try {
        // Generate random guest username
        const guestId = Math.random().toString(36).substring(2, 10);
        const guestName = `Guest_${guestId}`;
        const guestEmail = `guest_${guestId}@demo.com`;

        // Generate a random password (won't be used but database requires it)
        const randomPassword = Math.random().toString(36).substring(2, 15);

        // Create a regular user account in the database
        const user = await prisma.user.create({
            data: {
                email: guestEmail,
                password: randomPassword, // Random password for database requirements
                fullname: guestName,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Guest account created successfully",
            user: {
                id: user.id,
                email: user.email,
                fullname: user.fullname
            }
        });
    } catch (error) {
        console.error('Guest login error:', error);
        return NextResponse.json(
            { error: "Failed to create guest account" },
            { status: 500 }
        );
    }
}