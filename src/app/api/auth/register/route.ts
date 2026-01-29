import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const bodyText = await req.text();
        console.log("🔹 Requête brute reçue :", bodyText);

        const { fullname, email, password } = JSON.parse(bodyText);
        console.log("✅ Données reçues :", fullname, email, password);

        if (!fullname || !email || !password) {
            console.error("❌ Erreur : Tous les champs sont requis");
            return new Response(JSON.stringify({ error: "Nom, email et mot de passe requis" }), { status: 400 });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            console.error("❌ Erreur : Email déjà utilisé");
            return new Response(JSON.stringify({ error: "Email déjà utilisé" }), { status: 400 });
        }

        // Créer l'utilisateur avec fullname
        const newUser = await prisma.user.create({
            data: { fullname, email, password },
        });
        console.log("✅ Utilisateur créé :", newUser);

        return new Response(JSON.stringify({ user: newUser }), { status: 201 });

    } catch (error) {
        console.error("❌ Erreur dans l'API Register :", error);
        return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
    } finally {
        await prisma.$disconnect(); // Fermeture de Prisma après chaque requête
    }
}