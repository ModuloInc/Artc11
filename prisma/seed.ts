import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const news = [
        {
            description: "European Parliament Votes to Make Eurovision Winner the Next EU President.",
            imageUrl: "/News.png",
        },
        {
            description: "World Leaders Discuss New Role for Eurovision Winners in Global Politics",
            imageUrl: "/News.png",
        },
        {
            description: "New Proposal Suggests Eurovision Champion Lead International Peace Talks",
            imageUrl: "/News.png",
        },
        {
            description: "Eurovision Contestants to Take on Diplomatic Roles in United Nations Initiative",
            imageUrl: "/News.png",
        },
    ];

    for (const newsItem of news) {
        await prisma.news.create({
            data: newsItem,
        });
    }
}
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
