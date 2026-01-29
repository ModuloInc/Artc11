import NextAuthSessionProvider from "@/components/SessionProvider";
import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

export const metadata: Metadata = {
  title: "Article11 – Vote citoyen",
  description: "Donnez votre avis sur les questions qui comptent. Top News, Topics et votes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <NextAuthSessionProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
