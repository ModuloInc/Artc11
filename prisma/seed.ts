import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SEED_PASSWORD = "password123";

async function main() {
  console.log("🌱 Seed – remplissage de la base avec des données fictives…\n");

  // —— Utilisateurs fictifs ——
  const usersData = [
    { fullname: "Léa Martin", email: "lea.martin@example.com" },
    { fullname: "Thomas Bernard", email: "thomas.bernard@example.com" },
    { fullname: "Camille Petit", email: "camille.petit@example.com" },
    { fullname: "Hugo Dubois", email: "hugo.dubois@example.com" },
    { fullname: "Chloé Moreau", email: "chloe.moreau@example.com" },
    { fullname: "Lucas Roux", email: "lucas.roux@example.com" },
  ];

  const users: { id: string }[] = [];
  for (const u of usersData) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      create: { fullname: u.fullname, email: u.email, password: SEED_PASSWORD },
      update: { fullname: u.fullname },
    });
    users.push({ id: user.id });
  }
  console.log(`✅ ${users.length} utilisateur(s)`);

  // —— Catégories (alignées avec l’accueil) ——
  const categoriesData = [
    { name: "Climate & Environment", description: "Climat, environnement et transition écologique." },
    { name: "Economy & Work", description: "Économie, emploi, fiscalité." },
    { name: "Health & Wellness", description: "Santé, prévention, bien-être." },
    { name: "Politics & Society", description: "Politique, gouvernance, société." },
    { name: "Culture", description: "Culture, médias, patrimoine." },
    { name: "Education", description: "Éducation, formation, recherche." },
    { name: "Democracy & Rights", description: "Démocratie, libertés, droits humains." },
    { name: "Technology", description: "Numérique, innovation, données." },
  ];

  const categoryMap: Record<string, string> = {};
  for (const c of categoriesData) {
    let cat = await prisma.category.findFirst({ where: { name: c.name } });
    if (!cat) {
      cat = await prisma.category.create({
        data: { name: c.name, description: c.description },
      });
    }
    categoryMap[c.name] = cat.id;
  }
  console.log(`✅ ${Object.keys(categoryMap).length} catégorie(s)`);

  // —— News fictives ——
  const newsData = [
    { description: "L’Union européenne renforce son plan climat pour 2030.", imageUrl: "/News.png" },
    { description: "Concertation citoyenne : nouveaux dispositifs de participation en ligne.", imageUrl: "/News.png" },
    { description: "Bilan des assises de la santé : priorité à la prévention.", imageUrl: "/News.png" },
    { description: "Réforme des retraites : ce qui change au 1er trimestre.", imageUrl: "/News.png" },
    { description: "Transition énergétique : appels à projets pour les territoires.", imageUrl: "/International.png" },
    { description: "Éducation : débat sur le bac et l’orientation post-bac.", imageUrl: "/Education.png" },
    { description: "Numérique et souveraineté : feuille de route gouvernementale.", imageUrl: "/Technology.png" },
    { description: "Culture : budget 2025 pour les festivals et le patrimoine.", imageUrl: "/Culture.png" },
    { description: "Sport et cohésion sociale : nouveaux labels pour les clubs.", imageUrl: "/Sports.png" },
    { description: "Démocratie locale : généralisation des conseils citoyens.", imageUrl: "/DemocracyandHumanRights.png" },
  ];

  let newsCreated = 0;
  for (const n of newsData) {
    const exists = await prisma.news.findFirst({ where: { description: n.description } });
    if (!exists) {
      await prisma.news.create({ data: n });
      newsCreated++;
    }
  }
  console.log(`✅ ${newsCreated} actualité(s) créée(s)`);

  // —— Questions (avec catégories existantes) ——
  const questionsData = [
    {
      text: "Faut-il accorder plus de poids à la protection de l’environnement qu’à la croissance économique ?",
      categoryName: "Climate & Environment",
      description: "Cette question interroge l’arbitrage entre préservation du climat et de la biodiversité et développement économique.",
      imageUrl: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      text: "L’État doit-il jouer un rôle plus important dans la régulation de l’économie ?",
      categoryName: "Economy & Work",
      description: "Intervention publique accrue (régulation, fiscalité, services publics) versus logique de marché.",
      imageUrl: "https://images.unsplash.com/photo-1551836022-aadb801c60ae?q=80&w=1000&auto=format&fit=crop",
    },
    {
      text: "Êtes-vous favorable à un système de santé universel financé par l’impôt ?",
      categoryName: "Health & Wellness",
      description: "Santé comme bien commun, garantie à tous via la solidarité nationale.",
      imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop",
    },
    {
      text: "Faut-il faciliter le vote par internet pour les élections nationales ?",
      categoryName: "Politics & Society",
      description: "Modernisation du scrutin et participation versus sécurité et secret du vote.",
      imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1000&auto=format&fit=crop",
    },
    {
      text: "La culture doit-elle bénéficier d’un budget public renforcé ?",
      categoryName: "Culture",
      description: "Rôle des subventions et des institutions dans le soutien à la création et au patrimoine.",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
    },
    {
      text: "L’école doit-elle donner une place plus grande au numérique ?",
      categoryName: "Education",
      description: "Outils numériques, apprentissage du code et prévention des usages à risques.",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
    },
    {
      text: "Faut-il renforcer la régulation des géants du numérique (GAFAM) ?",
      categoryName: "Technology",
      description: "Concurrence, données personnelles, fiscalité et diversité des acteurs.",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
    },
    {
      text: "Les référendums d’initiative citoyenne doivent-ils être élargis ?",
      categoryName: "Democracy & Rights",
      description: "Initiatives populaires, seuils et champs des référendums.",
      imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1000&auto=format&fit=crop",
    },
    {
      text: "Êtes-vous favorable à une semaine de 4 jours dans le secteur public ?",
      categoryName: "Economy & Work",
      description: "Organisation du travail, productivité et qualité de vie.",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
    },
    {
      text: "Faut-il interdire les véhicules thermiques en ville d’ici 2035 ?",
      categoryName: "Climate & Environment",
      description: "Zones à faibles émissions, mobilité durable et calendrier de sortie du thermique.",
      imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  const questionIds: string[] = [];
  for (const q of questionsData) {
    const cid = categoryMap[q.categoryName];
    if (!cid) continue;
    const existing = await prisma.question.findFirst({ where: { text: q.text } });
    if (existing) {
      questionIds.push(existing.id);
      continue;
    }
    const created = await prisma.question.create({
      data: {
        text: q.text,
        description: q.description,
        imageUrl: q.imageUrl,
        categoryId: cid,
      },
    });
    questionIds.push(created.id);
  }
  console.log(`✅ ${questionIds.length} question(s)`);

  // —— Votes fictifs (chaque user vote sur un sous-ensemble de questions) ——
  const voteValues = [-1, 0, 1] as const;
  let votesCreated = 0;
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < questionIds.length; j++) {
      if (Math.random() > 0.6) continue; // on ne fait pas voter tout le monde sur tout
      const value = voteValues[Math.floor(Math.random() * 3)];
      try {
        await prisma.vote.upsert({
          where: {
            userId_questionId: { userId: users[i].id, questionId: questionIds[j] },
          },
          create: {
            userId: users[i].id,
            questionId: questionIds[j],
            value,
          },
          update: { value },
        });
        votesCreated++;
      } catch {
        // conflit rare, on ignore
      }
    }
  }
  console.log(`✅ ${votesCreated} vote(s) créés`);

  console.log("\n✅ Seed terminé. Comptes de test : *@example.com / " + SEED_PASSWORD);
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
