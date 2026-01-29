"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setUserEmail(localStorage.getItem("userEmail"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Le commentaire ne peut pas être vide");
      return;
    }
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setError("Vous devez être connecté pour publier un commentaire");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/comments/direct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, postId, userEmail: email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l'ajout du commentaire");
      }
      setContent("");
      setSuccess(true);
      setTimeout(() => router.refresh(), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="mt-8 rounded-[var(--radius-lg)] bg-[var(--color-surface-elevated)] p-4">
        <span className="text-[var(--color-muted)]">Chargement…</span>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-[var(--radius-xl)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] p-6">
      <h3 className="font-heading text-lg font-semibold text-[var(--color-foreground)] mb-4">
        Ajouter un commentaire
      </h3>

      {error && (
        <div
          className="mb-4 rounded-[var(--radius-md)] bg-[var(--color-accent-muted)] p-3 text-[var(--color-error)]"
          role="alert"
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className="mb-4 rounded-[var(--radius-md)] bg-[var(--color-primary-muted)] p-3 text-[var(--color-primary)]"
          role="status"
        >
          Commentaire publié avec succès.
        </div>
      )}

      {!userEmail ? (
        <p className="text-[var(--color-muted)]">
          <a href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
            Connectez-vous
          </a>{" "}
          pour ajouter un commentaire.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            className="mb-4 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3 text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 disabled:opacity-50"
            rows={4}
            placeholder="Votre commentaire…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi…" : "Publier"}
          </Button>
        </form>
      )}
    </div>
  );
}
