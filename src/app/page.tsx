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
          <section className="mb-8">
            <h2 className="font-heading mb-4 text-2xl font-semibold text-[var(--color-primary)] md:text-3xl">
              Top News
            </h2>
            <NewsCarousel />
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
