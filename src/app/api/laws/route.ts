import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const category = url.searchParams.get('category');

        // Construire la requête avec filtres optionnels
        const whereClause = category ? { category } : {};

        // Récupérer les lois européennes avec filtres et tri
        const laws = await prisma.europeanLaw.findMany({
            where: whereClause,
            orderBy: {
                date: "desc",
            },
        });

        return NextResponse.json(laws, { status: 200 });
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des lois européennes:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// Récupérer une loi spécifique par ID
export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID requis" }, { status: 400 });
        }

        const law = await prisma.europeanLaw.findUnique({
            where: { id },
        });

        if (!law) {
            return NextResponse.json({ error: "Loi non trouvée" }, { status: 404 });
        }

        return NextResponse.json(law, { status: 200 });
    } catch (error) {
        console.error("❌ Erreur lors de la récupération de la loi:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}