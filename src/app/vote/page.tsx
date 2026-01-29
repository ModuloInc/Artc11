"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TabBar from "@/components/TabBar";
import Button from "@/components/Button";

interface Question {
  id: string;
  text: string;
  imageUrl?: string | null;
  description?: string | null;
  category?: { name: string };
}

interface VoteStats {
  positive: number;
  neutral: number;
  negative: number;
  totalVotes: number;
}

const defaultImage =
  "https://images.unsplash.com/photo-1551836022-aadb801c60ae?q=80&w=1000&auto=format&fit=crop";

export default function VotePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [isVoting, setIsVoting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState<VoteStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/login");
      return;
    }
  }, [router]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/questions");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setQuestions(Array.isArray(data) ? data : []);
        setError(null);
      } catch {
        setError("Impossible de charger les questions");
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const handleVote = async (value: -1 | 0 | 1) => {
    const email = localStorage.getItem("userEmail");
    if (!email || !questions.length || isVoting) return;

    const q = questions[index];
    setIsVoting(true);
    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${email}`,
        },
        body: JSON.stringify({ questionId: q.id, value }),
      });
      if (!res.ok) throw new Error("Vote failed");

      const statsRes = await fetch(`/api/question-stats?id=${q.id}`);
      if (!statsRes.ok) throw new Error("Stats failed");
      const statsData = await statsRes.json();
      setStats(statsData);
      setShowStats(true);
    } catch {
      setError("Une erreur s’est produite lors du vote");
    } finally {
      setIsVoting(false);
    }
  };

  const goNext = () => {
    setShowStats(false);
    setStats(null);
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setShowDetails(false);
    } else {
      router.push("/");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-background)]">
        <p className="text-[var(--color-muted)]">Chargement…</p>
      </div>
    );
  }

  if (error || !questions.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-background)] px-4">
        <p className="text-center text-[var(--color-foreground)]">
          {error ?? "Aucune question disponible"}
        </p>
        <Button variant="primary" onClick={() => router.push("/")}>
          Retour à l’accueil
        </Button>
      </div>
    );
  }

  const q = questions[index];
  const img = q.imageUrl || defaultImage;
  const categoryName = q.category?.name ?? "Topic";

  if (!showDetails) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
        <header className="flex items-center gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
          <Image src="/logo.svg" alt="Article11" width={100} height={44} />
        </header>

        <div className="relative flex-1">
          <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-xl)] mx-4 mt-4">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
              aria-hidden
            />
          </div>
          <div className="relative flex min-h-[60vh] flex-col justify-end px-6 pb-8">
            <h1 className="font-heading mb-6 max-w-xl text-2xl font-semibold leading-tight text-white drop-shadow md:text-3xl">
              {q.text}
            </h1>
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-full)] border-2 border-white/90 bg-white/10 px-5 py-2.5 font-medium text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
            >
              Voir plus
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 pb-[calc(6rem+env(safe-area-inset-bottom))]">
          <div className="mx-auto flex max-w-sm justify-center gap-4">
            <VoteButton icon="down" label="Non" onClick={() => handleVote(-1)} disabled={isVoting} />
            <VoteButton icon="neutral" label="Neutre" onClick={() => handleVote(0)} disabled={isVoting} />
            <VoteButton icon="up" label="Oui" onClick={() => handleVote(1)} disabled={isVoting} />
          </div>
        </div>
        <TabBar />
      </div>
    );
  }

  if (showStats && stats) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-background)] pb-24">
        <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-center">
          <span className="rounded-[var(--radius-full)] bg-[var(--color-primary-muted)] px-4 py-1.5 text-sm font-medium text-[var(--color-primary)]">
            {categoryName}
          </span>
        </header>

        <main className="flex-1 px-4 py-6">
          <div className="mx-auto max-w-lg rounded-[var(--radius-xl)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)]">
            <h2 className="font-heading mb-6 text-lg font-semibold text-[var(--color-foreground)]">
              Résultats
            </h2>
            <div className="mb-8 flex items-end justify-center gap-4">
              <BarSection
                value={stats.negative}
                label="Non"
                color="var(--color-vote-negative)"
              />
              <BarSection
                value={stats.neutral}
                label="Neutre"
                color="var(--color-vote-neutral)"
              />
              <BarSection
                value={stats.positive}
                label="Oui"
                color="var(--color-vote-positive)"
              />
            </div>
            <p className="mb-6 text-center text-sm text-[var(--color-muted)]">
              {stats.totalVotes} vote{stats.totalVotes !== 1 ? "s" : ""} au total.
            </p>
            <Button variant="primary" onClick={goNext} className="w-full">
              Question suivante
            </Button>
          </div>
        </main>
        <TabBar />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)] pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
        <button
          type="button"
          onClick={() => setShowDetails(false)}
          className="rounded-[var(--radius-md)] p-2 text-[var(--color-muted)] transition hover:bg-[var(--color-border)] hover:text-[var(--color-foreground)]"
          aria-label="Retour"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="rounded-[var(--radius-full)] bg-[var(--color-primary-muted)] px-4 py-1.5 text-sm font-medium text-[var(--color-primary)]">
          {categoryName}
        </span>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-lg">
          <h1 className="font-heading mb-4 text-xl font-semibold text-[var(--color-foreground)]">
            {q.text}
          </h1>
          {q.description && (
            <p className="mb-6 whitespace-pre-wrap text-[var(--color-muted)]">
              {q.description}
            </p>
          )}
        </div>
      </main>

      <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 pb-[calc(6rem+env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-sm justify-center gap-4">
          <VoteButton icon="down" label="Non" onClick={() => handleVote(-1)} disabled={isVoting} />
          <VoteButton icon="neutral" label="Neutre" onClick={() => handleVote(0)} disabled={isVoting} />
          <VoteButton icon="up" label="Oui" onClick={() => handleVote(1)} disabled={isVoting} />
        </div>
      </div>
      <TabBar />
    </div>
  );
}

function VoteButton({
  icon,
  label,
  onClick,
  disabled,
}: {
  icon: "up" | "down" | "neutral";
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  const paths = {
    up: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5",
    down: "M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-4h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5",
    neutral:
      "M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-full bg-[var(--color-surface-elevated)] shadow-[var(--shadow-sm)] transition hover:bg-[var(--color-border)] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
      aria-label={label}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={paths[icon]} />
      </svg>
      <span className="text-xs font-medium text-[var(--color-muted)]">{label}</span>
    </button>
  );
}

function BarSection({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  const height = value === 0 ? 4 : Math.max(8, (value / 100) * 96);
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-24 w-14 flex-col justify-end">
        <div
          className="w-full rounded-t-[var(--radius-sm)] transition-all duration-300"
          style={{
            height: `${height}px`,
            backgroundColor: color,
          }}
        />
      </div>
      <span className="mt-2 text-lg font-semibold" style={{ color }}>
        {value}%
      </span>
      <span className="text-xs text-[var(--color-muted)]">{label}</span>
    </div>
  );
}
