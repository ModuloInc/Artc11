import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import NewsCarousel from "@/components/NewsCarousel";
import TabBar from "@/components/TabBar";

const categories = [
  { name: "Climate", imageSrc: "/Culture.png", link: "/vote" },
  { name: "Culture", imageSrc: "/pexels-pixabay-39584.png", link: "/vote" },
  { name: "Democracy", imageSrc: "/DemocracyandHumanRights.png", link: "/vote" },
  { name: "Education", imageSrc: "/Education.png", link: "/vote" },
  { name: "Entertainment", imageSrc: "/Entertainment.png", link: "/vote" },
  { name: "International", imageSrc: "/International.png", link: "/vote" },
  { name: "Society", imageSrc: "/Society.png", link: "/vote" },
  { name: "Sports", imageSrc: "/Sports.png", link: "/vote" },
  { name: "Technology", imageSrc: "/Technology.png", link: "/vote" },
];

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen pb-24">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <Link
            href="/forum"
            className="mb-6 block overflow-hidden rounded-[var(--radius-xl)] bg-gradient-to-r from-[var(--color-primary-muted)] to-[var(--color-accent-muted)] p-4 shadow-[var(--shadow-sm)] transition hover:shadow-[var(--shadow-md)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-heading text-lg font-semibold text-[var(--color-primary)]">
                  Rejoindre le forum
                </h3>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Les jeunes s’expriment, l’Europe écoute.
                </p>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-muted)] text-[var(--color-primary)]">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </Link>

          <section className="mb-8">
            <h2 className="font-heading mb-4 text-2xl font-semibold text-[var(--color-primary)] md:text-3xl">
              Top News
            </h2>
            <NewsCarousel />
          </section>

          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-[var(--color-foreground)]">
                Lois européennes
              </h3>
              <Link
                href="/lois"
                className="text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                Voir tout →
              </Link>
            </div>
            <Link
              href="/lois"
              className="block rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-sm)] transition hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-md)]"
            >
              <p className="text-sm text-[var(--color-muted)]">
                Consultez les dernières lois européennes et restez informé des changements législatifs.
              </p>
            </Link>
          </section>

          <section>
            <h3 className="font-heading mb-4 text-lg font-semibold text-[var(--color-foreground)]">
              Topics
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.name}
                  name={cat.name}
                  imageSrc={cat.imageSrc}
                  url={cat.link}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <TabBar />
    </>
  );
}
