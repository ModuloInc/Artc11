// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("🌱 Démarrage du seeding de la base de données...");

        // Créer les catégories
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
                console.log(`✅ Catégorie créée: ${category.name}`);
            } else {
                console.log(`⏩ Catégorie existante: ${category.name}`);
            }
        }

        // Récupérer les IDs des catégories
        const allCategories = await prisma.category.findMany();
        // Définir le type du map
        const categoryMap: Record<string, string> = {};

        // Remplir le map
        allCategories.forEach(cat => {
            categoryMap[cat.name] = cat.id;
        });

        // Créer des questions
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

        for (const question of questions) {
            const existingQuestion = await prisma.question.findFirst({
                where: { text: question.text },
            });

            if (!existingQuestion) {
                await prisma.question.create({
                    data: question,
                });
                console.log(`✅ Question créée: ${question.text.substring(0, 30)}...`);
            } else {
                console.log(`⏩ Question existante: ${question.text.substring(0, 30)}...`);
            }
        }

        console.log("✅ Seeding de la base de données terminé avec succès!");
    } catch (error) {
        console.error("❌ Erreur lors du seeding de la base de données:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });