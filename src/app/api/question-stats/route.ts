import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
    try {
        console.log("🔹 API question-stats: Début de la requête");

        // Récupérer l'ID de la question depuis l'URL
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        console.log("🔍 ID de question:", id);

        if (!id) {
            console.error("❌ Erreur: ID de question manquant");
            return NextResponse.json(
                { error: "ID de question requis" },
                { status: 400 }
            );
        }

        // Récupérer tous les votes pour cette question
        const votes = await prisma.vote.findMany({
            where: {
                questionId: id
            }
        });

        console.log(`✅ ${votes.length} votes trouvés`);

        // Calculer les statistiques
        const totalVotes = votes.length;
        const positiveVotes = votes.filter(vote => vote.value === 1).length;
        const neutralVotes = votes.filter(vote => vote.value === 0).length;
        const negativeVotes = votes.filter(vote => vote.value === -1).length;

        // Calculer les pourcentages
        const positive = totalVotes > 0 ? Math.round((positiveVotes / totalVotes) * 100) : 0;
        const neutral = totalVotes > 0 ? Math.round((neutralVotes / totalVotes) * 100) : 0;
        const negative = totalVotes > 0 ? Math.round((negativeVotes / totalVotes) * 100) : 0;

        const stats = {
            positive,
            neutral,
            negative,
            totalVotes,
            positiveVotes,
            neutralVotes,
            negativeVotes
        };

        console.log("✅ Statistiques calculées:", stats);

        return NextResponse.json(stats);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des statistiques:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}