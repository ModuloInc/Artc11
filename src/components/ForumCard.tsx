"use client";

import Link from "next/link";
import Image from "next/image";
import type { Post, User, ForumCategory } from "@prisma/client";

type ForumCardProps = {
  post: Post & { author: User; category?: ForumCategory };
};

const avatarFallback = "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback";

export default function ForumCard({ post }: ForumCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-md rounded-[var(--radius-xl)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] overflow-hidden my-4">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[var(--color-surface-elevated)]">
            <Image
              src={post.author.image || avatarFallback}
              alt=""
              fill
              className="object-cover"
              unoptimized
              sizes="40px"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-foreground)]">
              {post.author.fullname || "Utilisateur"}
            </p>
            <p className="text-xs text-[var(--color-muted)]">{formattedDate}</p>
          </div>
        </div>
        <Link href={`/forum/post/${post.id}`} className="block">
          <h3 className="font-heading text-lg font-medium text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors mb-2">
            {post.title}
          </h3>
          <p className="text-[var(--color-muted)] text-sm line-clamp-3 text-left">
            {post.content}
          </p>
        </Link>
        <div className="mt-4">
          <Link
            href={`/forum/post/${post.id}`}
            className="text-[var(--color-primary)] hover:underline text-sm font-semibold"
          >
            Lire la suite →
          </Link>
        </div>
      </div>
    </div>
  );
}
