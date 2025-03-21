// app/forum/[category]/page.tsx
import React from "react";
import Link from "next/link";
import ForumCard from "@/components/ForumCard";
import { prisma} from "@/lib/db";
import { notFound } from "next/navigation";

async function getCategoryWithPosts(slug: string) {
    const category = await prisma.forumCategory.findUnique({
        where: {
            slug: slug.toLowerCase(),
        },
    });

    if (!category) {
        return null;
    }

    const posts = await prisma.post.findMany({
        where: {
            forumCategoryId: category.id,
        },
        include: {
            author: true,
            category: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return {
        category,
        posts,
    };
}

export default async function ForumCategory({ params }: { params: { category: string } }) {
    const data = await getCategoryWithPosts(params.category);

    if (!data) {
        notFound();
    }

    return (
        <>
            <div className="mb-6 container flex justify-center">
                <div
                    className="border-l-2 border-r-2 border-b-2 border-gray-600 rounded-bl-3xl rounded-br-3xl py-5 w-75 max-w-md">
                    <h2 className="text-center text-3xl font-bold text-black">{data.category.name}</h2>
                </div>
            </div>
            <div className="p-4 pb-20">
                {data.posts.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Aucune publication dans cette catégorie</p>
                    </div>
                ) : (
                    data.posts.map((post) => (
                        <ForumCard key={post.id} post={post} />
                    ))
                )}
                <div className="text-center mt-8">
                    <Link
                        href="/forum"
                        className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Back to forum
                    </Link>
                </div>
            </div>
        </>
    );
}