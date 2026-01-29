"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TabBar from "@/components/TabBar";
import Button from "@/components/Button";

interface UserProfile {
  id: string;
  fullname?: string;
  email: string;
  image?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const storedEmail = localStorage.getItem("userEmail");
      if (!storedEmail) {
        router.push("/login");
        return;
      }
      try {
        const res = await fetch(`/api/profile?email=${encodeURIComponent(storedEmail)}`);
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userFullname");
            localStorage.removeItem("userId");
            router.push("/login");
            return;
          }
          throw new Error("Erreur profil");
        }
        const data = await res.json();
        setUser(data);
        setError(null);
      } catch {
        const storedEmail = localStorage.getItem("userEmail");
        const storedName = localStorage.getItem("userFullname");
        const storedId = localStorage.getItem("userId");
        if (storedEmail && storedId) {
          setUser({
            id: storedId,
            fullname: storedName ?? undefined,
            email: storedEmail,
          });
        } else {
          setError("Impossible de charger le profil");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFullname");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-background)]">
        <p className="text-[var(--color-muted)]">Chargement du profil…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-background)] px-4">
        <p className="text-center text-[var(--color-foreground)]">
          {error ?? "Impossible de charger le profil."}
        </p>
        <Button variant="primary" onClick={() => router.push("/login")}>
          Se connecter
        </Button>
      </div>
    );
  }

  const initial = user.fullname?.charAt(0).toUpperCase() ?? user.email?.charAt(0).toUpperCase() ?? "?";

  return (
    <>
      <main className="min-h-screen pb-24">
        <div className="mx-auto max-w-lg px-4 py-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              {user.image ? (
                <Image
                  src={user.image}
                  alt=""
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full object-cover ring-4 ring-[var(--color-primary-muted)]"
                  unoptimized
                />
              ) : (
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-primary-muted)] text-2xl font-semibold text-[var(--color-primary)]"
                  aria-hidden
                >
                  {initial}
                </div>
              )}
            </div>
            <h1 className="font-heading text-xl font-semibold text-[var(--color-foreground)]">
              {user.fullname ?? "Utilisateur"}
            </h1>
          </div>

          <div className="rounded-[var(--radius-xl)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)]">
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Email</dt>
                <dd className="mt-1 text-[var(--color-foreground)]">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Mot de passe</dt>
                <dd className="mt-1 text-[var(--color-muted)]">••••••••</dd>
              </div>
            </dl>

            <div className="mt-8 flex justify-center">
              <Button variant="danger" onClick={handleLogout}>
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      </main>
      <TabBar />
    </>
  );
}
