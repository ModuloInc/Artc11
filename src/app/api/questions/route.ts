import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
    try {
        // Récupérer toutes les questions avec leurs catégories
        const questions = await prisma.question.findMany({
            include: {
                category: true,
            },
        });

        return NextResponse.json(questions, { status: 200 });
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des questions:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}