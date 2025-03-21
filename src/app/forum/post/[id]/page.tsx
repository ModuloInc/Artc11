// app/forum/post/[id]/page.tsx
import React from 'react';
import Link from 'next/link';
import { prisma} from "@/lib/db";
import { notFound } from 'next/navigation';
import CommentForm from '@/components/CommentForm';

async function getPost(id: string) {
    const post = await prisma.post.findUnique({
        where: {
            id,
        },
        include: {
            author: true,
            category: true,
            comments: {
                include: {
                    author: true,
                },
                orderBy: {
                    createdAt: 'desc', // Commentaires du plus récent au plus ancien
                },
            },
        },
    });

    if (!post) {
        return null;
    }

    return post;
}

export default async function PostPage({ params }: { params: { id: string } }) {
    const post = await getPost(params.id);

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="mb-6">
                <Link
                    href={`/forum/${post.category.slug}`}
                    className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block"
                >
                    ← Back to {post.category.name}
                </Link>
            </div>

            <article className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>

                    <div className="flex items-center mb-6">
                        <img
                            className="h-10 w-10 rounded-full mr-3"
                            src={post.author.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback'}
                            alt={`Avatar de ${post.author.fullname || 'Utilisateur'}`}
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-900">{post.author.fullname || 'Utilisateur'}</p>
                            <p className="text-xs text-gray-500">{formattedDate}</p>
                        </div>
                    </div>

                    <div className="prose max-w-none">
                        <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
                    </div>
                </div>
            </article>

            {/* Formulaire de commentaire - La vérification de connexion se fait côté client */}
            <CommentForm postId={post.id} />

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Commentaires ({post.comments.length})
                </h2>

                {post.comments.length === 0 ? (
                    <p className="text-gray-500">No comments yet.</p>
                ) : (
                    <div className="space-y-4">
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center mb-2">
                                    <img
                                        className="h-8 w-8 rounded-full mr-2"
                                        src={comment.author.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback'}
                                        alt={`Avatar de ${comment.author.fullname || 'Utilisateur'}`}
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{comment.author.fullname || 'Utilisateur'}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-700 text-sm">{comment.content}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8">
                    <Link
                        href="/forum"
                        className="inline-block px-6 py-2 bg-[#2A51A0] text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Back to forum
                    </Link>
                </div>
            </div>
        </div>
    );
}