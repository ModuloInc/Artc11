import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ForumCard from "@/components/ForumCard";
import TabBar from "@/components/TabBar";

export const dynamic = "force-dynamic";

async function getCategoryWithPosts(slug: string) {
  const category = await prisma.forumCategory.findUnique({
    where: { slug: slug.toLowerCase() },
  });
  if (!category) return null;

  const posts = await prisma.post.findMany({
    where: { forumCategoryId: category.id },
    include: { author: true, category: true },
    orderBy: { createdAt: "desc" },
  });
  return { category, posts };
}

export default async function ForumCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const data = await getCategoryWithPosts(slug);

  if (!data) notFound();

  return (
    <>
      <main className="min-h-screen pb-24">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <div className="mb-6 flex justify-center">
            <div className="rounded-b-[var(--radius-xl)] border-b-2 border-l-2 border-r-2 border-[var(--color-border)] px-8 py-4">
              <h1 className="font-heading text-center text-2xl font-bold text-[var(--color-foreground)]">
                {data.category.name}
              </h1>
            </div>
          </div>

          {data.posts.length === 0 ? (
            <p className="py-8 text-center text-[var(--color-muted)]">
              Aucune publication dans cette catégorie.
            </p>
          ) : (
            <div className="space-y-4">
              {data.posts.map((post) => (
                <ForumCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
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
