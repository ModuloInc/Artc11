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

        // ========== FORUM SEEDING ==========
        console.log("🌱 Starting forum database seeding...");

        // Create forum categories
        const forumCategories = [
            {
                name: "Environment",
                slug: "environment",
                color: "pink-300",
                bgColor: "pink-100",
                iconPath: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 10H11"/><path d="M13 10h7.78"/>'
            },
            {
                name: "Technology",
                slug: "technology",
                color: "blue-300",
                bgColor: "blue-100",
                iconPath: '<path d="M12 12v-2"/><path d="M12 7v0"/><circle cx="12" cy="12" r="10"/><path d="m16 16-4-4"/>'
            },
            {
                name: "Democracy",
                slug: "democracy",
                color: "yellow-300",
                bgColor: "yellow-100",
                iconPath: '<path d="M6 20h12"/><path d="M6 16h12"/><path d="M6 12h12"/><path d="M6 8h12"/><path d="M18 4H6"/>'
            },
            {
                name: "Entertainment",
                slug: "entertainment",
                color: "blue-400",
                bgColor: "blue-200",
                iconPath: '<circle cx="12" cy="11" r="2"/><path d="M19.9 7a9 9 0 0 0-12.9-1.1C4 8.7 3 11.3 3 14a2 2 0 0 0 2 2h.7c1.2 0 2.5-.4 3.3-1.2.8-.8 1.6-2 1.8-3.1.3.2.6.3 1.2.3.6 0 .9-.1 1.2-.3.2 1.1 1 2.3 1.8 3.1.8.8 2.1 1.2 3.3 1.2H19a2 2 0 0 0 2-2c0-2.7-1-5.3-4-7.1"/>'
            },
            {
                name: "Sports",
                slug: "sports",
                color: "cyan-300",
                bgColor: "cyan-100",
                iconPath: '<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>'
            },
            {
                name: "International",
                slug: "international",
                color: "green-400",
                bgColor: "green-100",
                iconPath: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'
            },
            {
                name: "Education",
                slug: "education",
                color: "pink-200",
                bgColor: "pink-50",
                iconPath: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'
            },
            {
                name: "Society",
                slug: "society",
                color: "purple-300",
                bgColor: "purple-100",
                iconPath: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
            }
        ];

        for (const category of forumCategories) {
            const existingCategory = await prisma.forumCategory.findFirst({
                where: { name: category.name },
            });

            if (!existingCategory) {
                await prisma.forumCategory.create({
                    data: category,
                });
                console.log(`✅ Forum category created: ${category.name}`);
            } else {
                console.log(`⏩ Forum category already exists: ${category.name}`);
            }
        }

        // Create or find a user for forum posts
        let user = await prisma.user.findFirst();

        if (!user) {
            // If no users exist, create a demo user
            user = await prisma.user.create({
                data: {
                    fullname: "Demo User",
                    email: "demo@example.com",
                    password: "hashed_password_here", // In a real app, this would be properly hashed
                    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo"
                }
            });
            console.log(`✅ Demo user created for forum posts`);
        } else {
            console.log(`⏩ Using existing user for forum posts: ${user.email}`);
        }

        // Create sample posts for each forum category
        const allForumCategories = await prisma.forumCategory.findMany();

        for (const category of allForumCategories) {
            for (let i = 1; i <= 3; i++) {
                const existingPost = await prisma.post.findFirst({
                    where: {
                        title: `${category.name} Post ${i}`,
                        forumCategoryId: category.id
                    },
                });

                if (!existingPost) {
                    await prisma.post.create({
                        data: {
                            title: `${category.name} Post ${i}`,
                            content: `This is a sample post about ${category.name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.`,
                            forumCategoryId: category.id,
                            authorId: user.id
                        }
                    });
                    console.log(`✅ Forum post created: ${category.name} Post ${i}`);
                } else {
                    console.log(`⏩ Forum post already exists: ${category.name} Post ${i}`);
                }
            }
        }

        // Create sample comments for posts
        const allPosts = await prisma.post.findMany({ take: 5 }); // Just for the first few posts

        for (const post of allPosts) {
            const commentContent = `This is a sample comment on the post "${post.title}". It adds to the discussion in a meaningful way.`;

            const existingComment = await prisma.comment.findFirst({
                where: {
                    content: commentContent,
                    postId: post.id
                },
            });

            if (!existingComment) {
                await prisma.comment.create({
                    data: {
                        content: commentContent,
                        postId: post.id,
                        authorId: user.id
                    }
                });
                console.log(`✅ Comment created for post: ${post.title.substring(0, 20)}...`);
            } else {
                console.log(`⏩ Comment already exists for post: ${post.title.substring(0, 20)}...`);
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