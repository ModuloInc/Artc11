import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const news = [
        {
            description: "European youth are mobilizing to make their voices heard on environmental issues that will shape their future.",
            imageUrl: "/imagejeunesse.jpg",
        },
        {
            description: "New digital data protection laws were discussed at the international summit, with major implications for users.",
            imageUrl: "/loisimages.jpg",
        },
        {
            description: "Recent diplomatic advances between neighboring countries pave the way for an era of enhanced cooperation in the region.",
            imageUrl: "/Newimage.jpg",
        },
        {
            description: "Artificial intelligence is transforming international relations, offering new tools for conflict resolution and collaboration between nations.",
            imageUrl: "/Aiimage.jpg",
        },
    ];

    const europeanLaws = [
        {
            title: "EU Digital Markets Act",
            description: "The Digital Markets Act aims to ensure fair competition in digital markets by preventing large platforms from abusing their market power.",
            fullText: "The European Parliament and the Council of the European Union,\n\nHaving regard to the Treaty on the Functioning of the European Union, and in particular Article 114 thereof,\n\nHaving regard to the proposal from the European Commission,\n\nAfter transmission of the draft legislative act to the national parliaments,\n\nHaving regard to the opinion of the European Economic and Social Committee,\n\nHaving regard to the opinion of the Committee of the Regions,\n\nActing in accordance with the ordinary legislative procedure,\n\nWhereas:\n\n(1) Digital services in general and online platforms in particular play an increasingly important role in the economy, particularly in the internal market, by providing new business opportunities in the Union and facilitating cross-border trading.\n\n(2) Core platform services, such as online intermediation services, online search engines, operating systems, online social networking services, video-sharing platform services, number-independent interpersonal communications services, cloud computing services and online advertising services have all the capacity to connect many business users with many end users through their strong positions.\n\n(3) Gatekeeper platforms have a significant impact on the internal market, providing an important gateway for business users to reach end users. The market characteristics of core platform services, including network effects, strong economies of scale, and data advantages have led to market concentration, with only a few platforms growing into digital gatekeepers for a large number of business users and end users.",
            imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
            category: "Digital",
            date: new Date("2023-11-01"),
        },
        {
            title: "EU Green Deal Implementation Act",
            description: "New legislation to accelerate the transition to a climate-neutral economy by setting binding targets for member states.",
            fullText: "The European Parliament and the Council of the European Union,\n\nHaving regard to the Treaty on the Functioning of the European Union, and in particular Article 192(1) thereof,\n\nHaving regard to the proposal from the European Commission,\n\nAfter transmission of the draft legislative act to the national parliaments,\n\nHaving regard to the opinion of the European Economic and Social Committee,\n\nHaving regard to the opinion of the Committee of the Regions,\n\nActing in accordance with the ordinary legislative procedure,\n\nWhereas:\n\n(1) The European Green Deal sets out a new growth strategy that aims to transform the Union into a fair and prosperous society, with a modern, resource-efficient and competitive economy where there are no net emissions of greenhouse gases in 2050 and where economic growth is decoupled from resource use.\n\n(2) The European Climate Law enshrines in legislation the objective of economy-wide climate neutrality by 2050 and establishes a binding Union intermediate climate target of reducing net greenhouse gas emissions by at least 55% below 1990 levels by 2030.\n\n(3) Delivering on these targets requires a comprehensive set of complementary measures and policies in all sectors of the economy.",
            imageUrl: "https://images.unsplash.com/photo-1552799446-159ba9523315?q=80&w=1000&auto=format&fit=crop",
            category: "Environment",
            date: new Date("2023-09-15"),
        },
        {
            title: "EU Cybersecurity Resilience Act",
            description: "Framework for ensuring higher standards of cybersecurity for products with digital elements across the EU market.",
            fullText: "The European Parliament and the Council of the European Union,\n\nHaving regard to the Treaty on the Functioning of the European Union, and in particular Article 114 thereof,\n\nHaving regard to the proposal from the European Commission,\n\nAfter transmission of the draft legislative act to the national parliaments,\n\nHaving regard to the opinion of the European Economic and Social Committee,\n\nActing in accordance with the ordinary legislative procedure,\n\nWhereas:\n\n(1) Cybersecurity is increasingly important for the daily lives of Union citizens as more and more devices are connected to the internet, and digital systems are becoming more central to economic and social activities.\n\n(2) The number and severity of cyber incidents are increasing, posing a major threat to the functioning of network and information systems. These incidents can impede the pursuit of economic activities, generate substantial financial losses, undermine user confidence and cause major damage to the Union economy and society.\n\n(3) The main aim of this regulation is to establish cybersecurity requirements for products with digital elements placed on the Union market, to ensure a high level of cybersecurity and to contribute to the proper functioning of the internal market.",
            imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
            category: "Security",
            date: new Date("2023-10-20"),
        },
        {
            title: "EU AI Act",
            description: "The first comprehensive legislative framework for artificial intelligence that aims to promote trustworthy AI while addressing potential risks.",
            fullText: "The European Parliament and the Council of the European Union,\n\nHaving regard to the Treaty on the Functioning of the European Union, and in particular Articles 16 and 114 thereof,\n\nHaving regard to the proposal from the European Commission,\n\nAfter transmission of the draft legislative act to the national parliaments,\n\nHaving regard to the opinion of the European Economic and Social Committee,\n\nHaving regard to the opinion of the Committee of the Regions,\n\nActing in accordance with the ordinary legislative procedure,\n\nWhereas:\n\n(1) Artificial intelligence (AI) is rapidly developing and can bring a wide array of economic and societal benefits across the entire spectrum of industries and social activities.\n\n(2) At the same time, depending on the circumstances regarding its specific application and use, AI may generate risks and cause harm to public interests and rights that are protected by Union law.\n\n(3) A Union legal framework establishing harmonized rules on artificial intelligence is therefore needed to foster the development, use and uptake of artificial intelligence in the internal market that at the same time meets a high level of protection of public interests, such as health, safety, fundamental rights, as enshrined in the Charter of Fundamental Rights of the European Union ('the Charter'), and the environment.",
            imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
            category: "Digital",
            date: new Date("2023-12-05"),
        },
        {
            title: "EU Consumer Rights Enhancement Directive",
            description: "Strengthens consumer protection across the EU by improving transparency requirements and establishing stronger penalties for violations.",
            fullText: "The European Parliament and the Council of the European Union,\n\nHaving regard to the Treaty on the Functioning of the European Union, and in particular Article 114 thereof,\n\nHaving regard to the proposal from the European Commission,\n\nAfter transmission of the draft legislative act to the national parliaments,\n\nHaving regard to the opinion of the European Economic and Social Committee,\n\nActing in accordance with the ordinary legislative procedure,\n\nWhereas:\n\n(1) The consumer protection framework of the Union contributes to the proper functioning of the internal market while ensuring a high level of consumer protection across the Union.\n\n(2) Consumers are increasingly engaging in cross-border transactions, both online and offline, and businesses are adapting their business models to benefit from the digital transformation by increasingly going online and offering their goods and services cross-border.\n\n(3) It is therefore necessary to strengthen consumer trust in the internal market by providing them with stronger and more effective remedies when they buy products or use services that do not conform to the contract, as well as by ensuring that businesses can rely on appropriate and modern rules that are applied uniformly across the Union.",
            imageUrl: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?q=80&w=1000&auto=format&fit=crop",
            category: "Consumer Rights",
            date: new Date("2023-08-10"),
        }
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

        // Seed les lois européennes
        console.log("🌱 Seeding European laws...");

        for (const law of europeanLaws) {
            const existingLaw = await prisma.europeanLaw.findFirst({
                where: { title: law.title },
            });

            if (!existingLaw) {
                await prisma.europeanLaw.create({
                    data: law,
                });
                console.log(`✅ Law created: ${law.title}`);
            } else {
                console.log(`⏩ Law already exists: ${law.title}`);
            }
        }

        console.log("✅ European laws seeding completed!");

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