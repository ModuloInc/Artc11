import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const email = url.searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: "Email requis" }, { status: 400 });
        }

        // Récupérer les informations de l'utilisateur
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                fullname: true,
                email: true,
                image: true,
                // Ne pas inclure le mot de passe pour des raisons de sécurité
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Erreur API profile:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}