import Link from "next/link";
import { prisma } from "@/lib/db";
import TabBar from "@/components/TabBar";

const categoryStyles: Record<string, string> = {
  Democracy: "bg-amber-100",
  Education: "bg-pink-100",
  Entertainment: "bg-blue-200",
  Environment: "bg-emerald-100",
  International: "bg-violet-100",
  Society: "bg-green-100",
  Sports: "bg-gray-100",
  Technology: "bg-sky-200",
};

async function getForumCategories() {
  return prisma.forumCategory.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });
}

export default async function ForumPage() {
  const categories = await getForumCategories();

  return (
    <>
      <main className="min-h-screen pb-24">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <div className="mb-6 flex justify-center">
            <div className="rounded-b-[var(--radius-xl)] border-b-2 border-l-2 border-r-2 border-[var(--color-border)] px-8 py-4">
              <h1 className="font-heading text-center text-2xl font-bold text-[var(--color-foreground)]">
                Forum
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => {
              const bg = categoryStyles[cat.name] ?? "bg-[var(--color-surface-elevated)]";
              return (
                <Link
                  key={cat.id}
                  href={`/forum/${cat.slug}`}
                  className={`${bg} flex flex-col items-center rounded-[var(--radius-lg)] p-4 transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-md)]`}
                >
                  <div className="mb-2 flex h-12 w-12 items-center justify-center text-[var(--color-primary)]">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-center text-sm font-medium text-[var(--color-foreground)]">
                    {cat.name}
                  </p>
                  <span className="mt-2 rounded-[var(--radius-full)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-muted)]">
                    {cat._count.posts} post{cat._count.posts !== 1 ? "s" : ""}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 rounded-[var(--radius-lg)] bg-[var(--color-surface-elevated)] p-4 shadow-[var(--shadow-sm)]">
            <h2 className="font-heading mb-2 text-center text-lg font-medium text-[var(--color-foreground)]">
              Forum citoyen
            </h2>
            <p className="text-center text-sm text-[var(--color-muted)]">
              Échangez sur les sujets qui vous tiennent à cœur et partagez vos idées avec la communauté.
            </p>
          </div>
        </div>
      </main>
      <TabBar />
    </>
  );
}
