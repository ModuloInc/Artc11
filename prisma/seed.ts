import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const news = [
        {
            description: "European Parliament Votes to Make Eurovision Winner the Next EU President.",
            imageUrl: "/News.png",
        },
        {
            description: "Experts are warning about the escalating impact of climate change and its effects on biodiversity.",
            imageUrl: "/News.png",
        },
        {
            description: "The latest football season has brought surprises and controversies, with teams battling for the championship.",
            imageUrl: "/News.png",
        },
        {
            description: "Investors are keeping an eye on the stock market as it continues to fluctuate with global events.",
            imageUrl: "/News.png",
        },
    ];

    for (const newsItem of news) {
        await prisma.news.create({
            data: newsItem,
        });
    }

    console.log("🎉 5 news items have been seeded into the database!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
