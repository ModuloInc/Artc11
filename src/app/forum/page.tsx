// app/forum/page.tsx
import React from 'react';
import Link from "next/link";
import { prisma} from "@/lib/db";

// Définition des catégories avec leurs couleurs de fond
const categoryColors = {
    "Democracy": "bg-yellow-100",
    "Education": "bg-pink-100",
    "Entertainment": "bg-blue-200",
    "Environment": "bg-pink-100",
    "International": "bg-violet-100",
    "Society": "bg-green-100",
    "Sports": "bg-gray-100",
    "Technology": "bg-blue-200"
};

// Définition des icônes personnalisées pour chaque catégorie
const categoryIcons = {
    "Democracy": <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    "Education": <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    "Entertainment": <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>,
    "Environment": <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    "International": <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    "Society": <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    "Sports": <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    "Technology": <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

async function getForumCategories() {
    return await prisma.forumCategory.findMany({
        orderBy: {
            name: 'asc'
        },
        include: {
            _count: {
                select: { posts: true }
            }
        }
    });
}

export default async function Forum() {
    const categories = await getForumCategories();

    return (
        <>
            <div className="mb-6 container flex justify-center">
                <div
                    className="border-l-2 border-r-2 border-b-2 border-gray-600 rounded-bl-3xl rounded-br-3xl py-5 w-75 max-w-md">
                    <h2 className="text-center text-3xl font-bold text-black">Forum</h2>
                </div>
            </div>
            <div className="p-4 min-h-screen">
                <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
                    {categories.map((category) => {
                        // Obtenir la couleur de fond correspondante ou utiliser un blanc par défaut
                        const bgColor = categoryColors[category.name] || "bg-white";

                        return (
                            <Link href={`/forum/${category.slug}`} key={category.id}>
                                <div
                                    className={`${bgColor} rounded-xl p-4 flex flex-col items-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                                >
                                    <div className="flex items-center justify-center mb-2 w-12 h-12">
                                        {/* Utiliser les icônes personnalisées */}
                                        {categoryIcons[category.name] || (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"
                                                 fill="none" stroke="currentColor" strokeWidth="2">
                                                <g dangerouslySetInnerHTML={{ __html: category.iconPath }} />
                                            </svg>
                                        )}
                                    </div>
                                    <p className="text-center text-sm font-medium">{category.name}</p>
                                    <div className="mt-2 bg-white px-2 py-1 rounded-full text-xs">
                                        {category._count.posts} posts
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-12 max-w-md mx-auto">
                    <div className="bg-gray-100 rounded-lg p-4 shadow">
                        <h3 className="text-center text-lg font-medium mb-3">Forum Communautaire</h3>
                        <p className="text-gray-600 text-sm text-center">
                            Rejoignez notre forum pour discuter sur divers sujets, partager vos idées et connecter avec d'autres membres.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}