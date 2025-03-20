import { NextResponse} from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { questionId, value } = body;

        // Récupérer l'ID utilisateur depuis l'email stocké dans Authorization
        const authHeader = req.headers.get('Authorization');
        let userId = null;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const email = authHeader.substring(7);
            const user = await prisma.user.findUnique({
                where: { email },
                select: { id: true }
            });

            if (user) {
                userId = user.id;
            }
        }

        if (!userId || !questionId || value === undefined) {
            return NextResponse.json(
                { error: "Données de votes incomplètes" },
                { status: 400 }
            );
        }

        // Vérifier si l'utilisateur a déjà voté pour cette questions
        const existingVote = await prisma.vote.findFirst({
            where: {
                userId: userId,
                questionId: questionId,
            },
        });

        let vote;

        if (existingVote) {
            // Mettre à jour le votes existant
            vote = await prisma.vote.update({
                where: {
                    id: existingVote.id,
                },
                data: {
                    value: value,
                },
            });
        } else {
            // Créer un nouveau votes
            vote = await prisma.vote.create({
                data: {
                    value: value,
                    userId: userId,
                    questionId: questionId,
                },
            });
        }

        return NextResponse.json(vote, { status: 201 });
    } catch (error) {
        console.error("❌ Erreur lors de la création du votes:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}