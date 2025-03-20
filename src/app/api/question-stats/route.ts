import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        // Récupérer l'ID de la question depuis les paramètres de la requête
        const { searchParams } = new URL(request.url);
        const questionId = searchParams.get('id');

        if (!questionId) {
            return NextResponse.json(
                { error: "ID de question requis" },
                { status: 400 }
            );
        }

        // Récupérer tous les votes pour cette question
        const votes = await prisma.vote.findMany({
            where: {
                questionId: questionId,
            },
        });

        // Calculer les pourcentages
        const totalVotes = votes.length;

        if (totalVotes === 0) {
            return NextResponse.json({
                positive: 0,
                neutral: 0,
                negative: 0,
                totalVotes: 0,
            });
        }

        const positiveVotes = votes.filter(vote => vote.value === 1).length;
        const neutralVotes = votes.filter(vote => vote.value === 0).length;
        const negativeVotes = votes.filter(vote => vote.value === -1).length;

        const stats = {
            positive: Math.round((positiveVotes / totalVotes) * 100),
            neutral: Math.round((neutralVotes / totalVotes) * 100),
            negative: Math.round((negativeVotes / totalVotes) * 100),
            totalVotes: totalVotes,
        };

        return NextResponse.json(stats, { status: 200 });
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des statistiques:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}