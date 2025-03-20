// app/api/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma} from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        console.log("🔹 Tentative de création d'un commentaire");

        // Récupérer les données du corps de la requête
        const { content, postId, userId, userEmail } = await request.json();
        console.log("✅ Données reçues:", { content: content.substring(0, 20) + "...", postId, userId, userEmail });

        // Valider les données
        if (!content || !postId) {
            console.error("❌ Erreur: Contenu ou ID du post manquant");
            return NextResponse.json(
                { error: 'Contenu et ID du post requis' },
                { status: 400 }
            );
        }

        if (!userId || !userEmail) {
            console.error("❌ Erreur: Informations utilisateur manquantes");
            return NextResponse.json(
                { error: 'Authentification requise' },
                { status: 401 }
            );
        }

        // Vérifier que l'utilisateur existe bien en base de données
        console.log("🔍 Recherche de l'utilisateur dans la base de données...");
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            console.error(`❌ Erreur: Utilisateur avec l'ID ${userId} non trouvé`);
            return NextResponse.json(
                { error: 'Utilisateur non trouvé' },
                { status: 404 }
            );
        }

        console.log("✅ Utilisateur trouvé:", user.email);

        // Vérifier que le post existe
        console.log("🔍 Recherche du post dans la base de données...");
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            console.error(`❌ Erreur: Post avec l'ID ${postId} non trouvé`);
            return NextResponse.json(
                { error: 'Post non trouvé' },
                { status: 404 }
            );
        }

        console.log("✅ Post trouvé");

        // Créer le commentaire
        console.log("📝 Création du commentaire...");
        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                authorId: userId,
            },
            include: {
                author: true,
            },
        });

        console.log("✅ Commentaire créé avec succès:", comment.id);

        return NextResponse.json(comment, { status: 201 });
    } catch (error) {
        console.error('❌ Erreur lors de la création du commentaire:', error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}