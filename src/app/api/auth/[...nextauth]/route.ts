import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";

const prisma = new PrismaClient();

interface Session {
    user: {
        id: string
        name?: string | null
        email?: string | null
        image?: string | null
    }
}

const authOptions: AuthOptions = {
    providers: [],
    callbacks: {
        async signIn({ user }) {
            const { name, email } = user;

            if (!email) {
                console.error("❌ Erreur : L'email est requis pour l'authentification");
                return false;
            }

            try {
                const existingUser = await prisma.user.findUnique({ where: { email } });

                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            fullname: name || "Utilisateur",
                            email,
                            password: "",
                        },
                    });
                    console.log("✅ Utilisateur créé :", email);
                }
            } catch (error) {
                console.error("❌ Erreur lors de l'enregistrement de l'utilisateur :", error);
                return false;
            }

            return true;
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                (session.user as any).id = token.sub;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };