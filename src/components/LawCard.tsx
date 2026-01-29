"use client";

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

interface LawCardProps {
  law: EuropeanLaw;
  onClick: () => void;
}

export default function LawCard({ law, onClick }: LawCardProps) {
  const formattedDate = new Date(law.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] overflow-hidden cursor-pointer transition-all hover:shadow-[var(--shadow-lg)] hover:scale-[1.01]"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row">
        {law.imageUrl && (
          <div className="relative w-full md:w-1/3 h-40 md:h-auto min-h-[10rem]">
            <Image
              src={law.imageUrl}
              alt={law.title}
              fill
              className="object-cover"
              unoptimized
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}
        <div
          className={`p-4 flex-1 flex flex-col ${!law.imageUrl ? "w-full" : "md:w-2/3"}`}
        >
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-[var(--radius-full)] bg-[var(--color-primary-muted)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
              {law.category}
            </span>
            <span className="text-xs text-[var(--color-muted)]">
              {formattedDate}
            </span>
          </div>
          <h2 className="font-heading text-lg font-bold text-[var(--color-foreground)] mb-2">
            {law.title}
          </h2>
          <p className="text-[var(--color-muted)] text-sm mb-3 line-clamp-2">
            {law.description}
          </p>
          <div className="mt-auto text-right">
            <span className="text-[var(--color-primary)] text-sm font-medium inline-flex items-center gap-1">
              Lire la suite
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
