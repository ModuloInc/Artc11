"use client";

import { useState, useEffect } from "react";
import TabBar from "@/components/TabBar";
import LawCard from "@/components/LawCard";
import LawCardDetail from "@/components/LawCardDetail";

interface EuropeanLaw {
  id: string;
  title: string;
  description: string;
  fullText: string;
  imageUrl?: string;
  category: string;
  date: string;
}

export default function LoisPage() {
  const [laws, setLaws] = useState<EuropeanLaw[]>([]);
  const [selectedLaw, setSelectedLaw] = useState<EuropeanLaw | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLaws() {
      try {
        setLoading(true);
        const res = await fetch("/api/laws");
        if (!res.ok) throw new Error("Failed to fetch laws");
        const data = await res.json();
        setLaws(Array.isArray(data) ? data : []);
        setError(null);
      } catch {
        setError("Impossible de charger les lois.");
      } finally {
        setLoading(false);
      }
    }
    fetchLaws();
  }, []);

  const categories = Array.from(new Set(laws.map((l) => l.category)));
  const filtered = selectedCategory
    ? laws.filter((l) => l.category === selectedCategory)
    : laws;

  return (
    <>
      <main className="min-h-screen pb-24 bg-[var(--color-background)]">
        <div className="bg-[var(--color-primary)] px-4 py-6 text-white">
          <h1 className="font-heading text-xl font-bold">Lois européennes</h1>
          <p className="text-sm opacity-90">Suivez les évolutions législatives récentes</p>
        </div>

        <div className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className={`shrink-0 rounded-[var(--radius-full)] px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-surface-elevated)] text-[var(--color-foreground)]"
              }`}
            >
              Toutes
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-[var(--radius-full)] px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-surface-elevated)] text-[var(--color-foreground)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-6">
          {loading && (
            <div className="flex h-48 items-center justify-center text-[var(--color-muted)]">
              Chargement…
            </div>
          )}
          {error && (
            <div className="flex h-48 items-center justify-center text-[var(--color-error)]">
              {error}
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="flex h-48 items-center justify-center text-[var(--color-muted)]">
              Aucune loi
            </div>
          )}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid gap-4">
              {filtered.map((law) => (
                <LawCard
                  key={law.id}
                  law={law}
                  onClick={() => {
                    setSelectedLaw(law);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedLaw && (
        <LawCardDetail
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedLaw(null);
          }}
          law={selectedLaw}
        />
      )}

      <TabBar />
    </>
  );
}
