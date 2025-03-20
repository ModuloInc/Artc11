import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Session {
    user: {
        id: string
        name?: string | null
        email?: string | null
        image?: string | null
    }
}

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            const { name, email } = user;

            if (!email) {
                console.error("❌ Erreur : L'email est requis pour l'authentification Google");
                return false;
            }

            try {
                // Vérifier si l'utilisateur existe déjà
                const existingUser = await prisma.user.findUnique({ where: { email } });

                if (!existingUser) {
                    // Créer un nouvel utilisateur
                    await prisma.user.create({
                        data: {
                            fullname: name || "Utilisateur Google",
                            email,
                            password: "", // Pas de mot de passe stocké pour Google
                        },
                    });
                    console.log("✅ Utilisateur Google créé :", email);
                }
            } catch (error) {
                console.error("❌ Erreur lors de l'enregistrement de l'utilisateur :", error);
                return false;
            }

            return true; // Autorise la connexion
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                (session.user as any).id = token.sub;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id; // Stocke l'ID utilisateur dans le JWT
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login", // Redirige vers la page de connexion
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
