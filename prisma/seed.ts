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

    try {
        console.log("🌱 Starting database seeding...");

        // Create categories
        const categories = [
            {
                name: "Climate & Environment",
                description: "Questions about climate change, environmental policies, and sustainability.",
            },
            {
                name: "Economy & Work",
                description: "Questions about economic policies, jobs, taxes, and the labor market.",
            },
            {
                name: "Health & Wellness",
                description: "Questions about healthcare, medicine, mental health, and general wellness.",
            },
            {
                name: "Politics & Society",
                description: "Questions about political issues, governance, and societal challenges.",
            },
        ];

        for (const category of categories) {
            const existingCategory = await prisma.category.findFirst({
                where: { name: category.name },
            });

            if (!existingCategory) {
                await prisma.category.create({
                    data: category,
                });
                console.log(`✅ Category created: ${category.name}`);
            } else {
                console.log(`⏩ Category already exists: ${category.name}`);
            }
        }

        // Retrieve category IDs
        const allCategories = await prisma.category.findMany();
        // Define map type
        const categoryMap: Record<string, string> = {};

        // Fill the map
        allCategories.forEach(cat => {
            categoryMap[cat.name] = cat.id;
        });

        // Create questions
        const questions = [
            {
                text: "Do you believe the government should play a larger role in regulating the economy?",
                categoryId: categoryMap["Economy & Work"],
                description: "This question examines the respondent's perspective on the government's role in regulating the economy. It seeks to understand whether they believe increased government intervention—such as stricter regulations on businesses, financial oversight, and social welfare programs—is necessary to ensure economic stability and fairness.",
                imageUrl: "https://images.unsplash.com/photo-1551836022-aadb801c60ae?q=80&w=1000&auto=format&fit=crop"
            },
            {
                text: "Should countries prioritize environmental protection over economic growth?",
                categoryId: categoryMap["Climate & Environment"],
                description: "This question explores the balance between environmental conservation and economic development.",
                imageUrl: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=1000&auto=format&fit=crop"
            },
            {
                text: "Do you support a universal healthcare system funded by taxes?",
                categoryId: categoryMap["Health & Wellness"],
                description: "This question addresses whether healthcare should be a public service available to all citizens and funded through taxation.",
                imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop"
            },
        ];

        // Create news items
        for (const newsItem of news) {
            await prisma.news.create({
                data: newsItem,
            });
            console.log(`✅ News item created: ${newsItem.description.substring(0, 30)}...`);
        }

        // Create questions (now outside the news loop)
        for (const question of questions) {
            const existingQuestion = await prisma.question.findFirst({
                where: { text: question.text },
            });

            if (!existingQuestion) {
                await prisma.question.create({
                    data: question,
                });
                console.log(`✅ Question created: ${question.text.substring(0, 30)}...`);
            } else {
                console.log(`⏩ Question already exists: ${question.text.substring(0, 30)}...`);
            }
        }

        console.log("✅ Database seeding completed successfully!");
    } catch (error) {
        console.error("❌ Error during database seeding:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error("❌ Unhandled error during seeding:", e);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("Database connection closed");
    });