import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import CommentForm from "@/components/CommentForm";
import TabBar from "@/components/TabBar";

const avatarFallback = "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback";

async function getPost(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      category: true,
      comments: {
        include: { author: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export default async function ForumPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

  const formattedDate = new Date(post.createdAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <main className="min-h-screen pb-24">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Link
            href={`/forum/${post.category.slug}`}
            className="mb-4 inline-block text-[var(--color-primary)] hover:underline"
          >
            ← Retour à {post.category.name}
          </Link>

          <article className="overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-surface)] shadow-[var(--shadow-md)]">
            <div className="p-6">
              <h1 className="font-heading mb-4 text-2xl font-bold text-[var(--color-foreground)]">
                {post.title}
              </h1>
              <div className="mb-6 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[var(--color-surface-elevated)]">
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
              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-[var(--color-muted)]">
                  {post.content}
                </p>
              </div>
            </div>
          </article>

          <CommentForm postId={post.id} />

          <section className="mt-8">
            <h2 className="font-heading mb-4 text-xl font-semibold text-[var(--color-foreground)]">
              Commentaires ({post.comments.length})
            </h2>
            {post.comments.length === 0 ? (
              <p className="text-[var(--color-muted)]">Aucun commentaire pour l’instant.</p>
            ) : (
              <div className="space-y-4">
                {post.comments.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-[var(--radius-lg)] bg-[var(--color-surface-elevated)] p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[var(--color-surface)]">
                        <Image
                          src={c.author.image || avatarFallback}
                          alt=""
                          fill
                          className="object-cover"
                          unoptimized
                          sizes="32px"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-foreground)]">
                          {c.author.fullname || "Utilisateur"}
                        </p>
                        <p className="text-xs text-[var(--color-muted)]">
                          {new Date(c.createdAt).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--color-muted)]">{c.content}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="mt-8">
            <Link
              href="/forum"
              className="inline-block rounded-[var(--radius-md)] bg-[var(--color-primary)] px-6 py-2 font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              Retour au forum
            </Link>
          </div>
        </div>
      </main>
      <TabBar />
    </>
  );
}
