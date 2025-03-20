// components/ForumCard.tsx
import React from 'react';
import Link from 'next/link';
import { Post, User, ForumCategory } from '@prisma/client';

type ForumCardProps = {
    post: Post & {
        author: User;
        category?: ForumCategory;
    };
}

const ForumCard: React.FC<ForumCardProps> = ({ post }) => {
    // Format the date
    const formattedDate = new Date(post.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden my-4">
            <div className="p-6">
                <div className="flex items-center mb-2">
                    {/* Use the user's image field if available, otherwise use a placeholder */}
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
                <Link href={`/forum/post/${post.id}`} className="block">
                    <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600 transition mb-2">
                        {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 text-left">
                        {post.content}
                    </p>
                </Link>
                <div className="mt-4">
                    <Link
                        href={`/forum/post/${post.id}`}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
                    >
                        Lire la suite →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForumCard;