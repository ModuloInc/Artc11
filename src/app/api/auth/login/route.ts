import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const bodyText = await req.text();
        console.log("🔹 Requête brute reçue :", bodyText);

        const { email, password } = JSON.parse(bodyText);
        console.log("✅ Données reçues :", email, password);

        if (!email || !password) {
            console.error("❌ Erreur : Email et mot de passe requis");
            return new Response(JSON.stringify({ error: "Email et mot de passe requis" }), { status: 400 });
        }

        // Vérifier si l'utilisateur existe
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.password !== password) {
            console.error("❌ Erreur : Identifiants incorrects");
            return new Response(JSON.stringify({ error: "Email ou mot de passe incorrect" }), { status: 401 });
        }

        console.log("✅ Connexion réussie :", user);
        return new Response(JSON.stringify({ message: "Connexion réussie", user }), { status: 200 });

    } catch (error) {
        console.error("❌ Erreur dans l'API Login :", error);
        return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
    }
}
