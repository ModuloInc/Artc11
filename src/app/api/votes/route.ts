import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
    try {
        // Log pour débogage
        console.log("🔹 API Vote: Début de la requête");

        // Récupérer le body
        const body = await req.json();
        const { questionId, value } = body;
        console.log("✅ Données reçues:", { questionId, value });

        // Vérifier que les données sont valides
        if (!questionId) {
            console.error("❌ Erreur: questionId manquant");
            return NextResponse.json(
                { error: "questionId est requis" },
                { status: 400 }
            );
        }

        if (value === undefined) {
            console.error("❌ Erreur: value manquante");
            return NextResponse.json(
                { error: "value est requise" },
                { status: 400 }
            );
        }

        if (![1, 0, -1].includes(value)) {
            console.error("❌ Erreur: value incorrecte");
            return NextResponse.json(
                { error: "value doit être -1, 0 ou 1" },
                { status: 400 }
            );
        }

        // Récupérer l'ID utilisateur depuis l'email stocké dans Authorization
        const authHeader = req.headers.get('Authorization');
        console.log("🔐 En-tête d'autorisation:", authHeader);

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.error("❌ Erreur: En-tête d'autorisation invalide");
            return NextResponse.json(
                { error: "Authentification requise" },
                { status: 401 }
            );
        }

        const email = authHeader.substring(7);
        console.log("📧 Email extrait:", email);

        // Vérifier si l'utilisateur existe
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        if (!user) {
            console.error("❌ Erreur: Utilisateur non trouvé pour l'email:", email);
            return NextResponse.json(
                { error: "Utilisateur non trouvé" },
                { status: 404 }
            );
        }

        const userId = user.id;
        console.log("✅ Utilisateur trouvé, ID:", userId);

        // Vérifier que la question existe
        const question = await prisma.question.findUnique({
            where: { id: questionId }
        });

        if (!question) {
            console.error("❌ Erreur: Question non trouvée avec ID:", questionId);
            return NextResponse.json(
                { error: "Question non trouvée" },
                { status: 404 }
            );
        }

        console.log("✅ Question trouvée");

        // Vérifier si l'utilisateur a déjà voté pour cette question
        const existingVote = await prisma.vote.findUnique({
            where: {
                userId_questionId: {
                    userId: userId,
                    questionId: questionId
                }
            }
        });

        let vote;

        if (existingVote) {
            // Mettre à jour le vote existant
            console.log("🔄 Mise à jour du vote existant:", existingVote.id);
            vote = await prisma.vote.update({
                where: {
                    id: existingVote.id,
                },
                data: {
                    value: value,
                },
            });
        } else {
            // Créer un nouveau vote
            console.log("➕ Création d'un nouveau vote");
            vote = await prisma.vote.create({
                data: {
                    value: value,
                    userId: userId,
                    questionId: questionId,
                },
            });
        }

        console.log("✅ Opération réussie, vote:", vote);
        return NextResponse.json(vote, { status: 201 });
    } catch (error) {
        console.error("❌ Erreur lors de la création du vote:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}