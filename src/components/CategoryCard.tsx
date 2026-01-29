"use client";

import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  name: string;
  imageSrc: string;
  url: string;
}

export default function CategoryCard({ name, imageSrc, url }: CategoryCardProps) {
  return (
    <Link
      href={url}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-primary)] shadow-[var(--shadow-md)] transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:scale-[1.02] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
    >
      <Image
        src={imageSrc}
        alt={name}
        fill
        className="object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-85"
        sizes="(max-width: 768px) 33vw, 200px"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
        aria-hidden
      />
      <div className="absolute inset-0 flex items-end p-3">
        <span className="font-heading text-base font-semibold text-white drop-shadow-sm">
          {name}
        </span>
      </div>
    </Link>
  );
}
