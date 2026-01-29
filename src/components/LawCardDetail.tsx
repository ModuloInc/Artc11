"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface EuropeanLaw {
  id: string;
  title: string;
  description: string;
  fullText: string;
  imageUrl?: string;
  category: string;
  date: string;
}

interface LawCardDetailProps {
  isOpen: boolean;
  onClose: () => void;
  law: EuropeanLaw;
}

export default function LawCardDetail({
  isOpen,
  onClose,
  law,
}: LawCardDetailProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const formattedDate = new Date(law.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        ref={modalRef}
        className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b border-[var(--color-border)]">
          <h2 className="font-heading text-xl font-bold text-[var(--color-foreground)]">
            {law.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[var(--color-muted)] hover:text-[var(--color-foreground)] rounded-[var(--radius-md)] hover:bg-[var(--color-border)] transition-colors"
            aria-label="Fermer"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          {law.imageUrl && (
            <div className="relative w-full h-48 md:h-64 mb-4 rounded-[var(--radius-md)] overflow-hidden">
              <Image
                src={law.imageUrl}
                alt={law.title}
                fill
                className="object-cover"
                unoptimized
                sizes="(max-width: 768px) 100vw, 48rem"
              />
            </div>
          )}

          <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
            <span className="rounded-[var(--radius-full)] bg-[var(--color-primary-muted)] px-3 py-1 text-sm font-semibold text-[var(--color-primary)]">
              {law.category}
            </span>
            <span className="text-sm text-[var(--color-muted)]">{formattedDate}</span>
          </div>

          <div className="mb-6">
            <h3 className="font-heading text-lg font-semibold text-[var(--color-foreground)] mb-2">
              Résumé
            </h3>
            <p className="text-[var(--color-muted)]">{law.description}</p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-[var(--color-foreground)] mb-2">
              Texte intégral
            </h3>
            <div className="text-[var(--color-muted)] prose prose-sm max-w-none">
              {law.fullText.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] p-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-2 text-[var(--color-foreground)] hover:bg-[var(--color-surface-elevated)] transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
