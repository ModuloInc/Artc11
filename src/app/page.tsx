import CategoryCard from "@/components/CategoryCard";
import NewsCarousel from "@/components/NewsCarousel";

export default async function Home() {

    const categories = [
        { name: "Climate", imageSrc: "/Culture.png", link:"climate"},
        { name: "Culture", imageSrc: "/pexels-pixabay-39584.png", link:"climate" },
        { name: "Democracy", imageSrc: "/DemocracyandHumanRights.png" , link:"climate"},
        { name: "Education", imageSrc: "/Education.png" , link:"climate"},
        { name: "Entertainement", imageSrc: "/Entertainment.png", link:"climate" },
        { name: "International", imageSrc: "/International.png", link:"climate" },
        { name: "Society", imageSrc: "/Society.png", link:"climate" },
        { name: "Sports", imageSrc: "/Sports.png", link:"climate" },
        { name: "Technology", imageSrc: "/Technology.png", link:"climate" },
    ];

    return (
        <>
            <div className="w-full px-4">
                <div className=" py-3 rounded-t-lg text-left px-2 mb-4">
                    <h2 className="text-[#002266] text-[32px] font-semibold">Top News</h2>
                </div>
                <div className="w-full">
                    <NewsCarousel/>
                </div>
                <div className=" py-3 rounded-t-lg text-left px-2">
                    <h3 className="text-[#002266] text-[17px] font-semibold">Topics</h3>
                </div>
                <div className="grid grid-cols-3 gap-4 p-2">
                    {categories.map((category, index) => (
                        <CategoryCard key={index} name={category.name} imageSrc={category.imageSrc}
                                      link={category.link}/>
                    ))}
                </div>
            </div>
        </>
    );
}
