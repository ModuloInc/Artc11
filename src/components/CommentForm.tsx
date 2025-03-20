// components/CommentForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type CommentFormProps = {
    postId: string;
};

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    // Marquer que nous sommes côté client
    useEffect(() => {
        setIsClient(true);
        const email = localStorage.getItem("userEmail");
        setUserEmail(email);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            setError('Le commentaire ne peut pas être vide');
            return;
        }

        // Récupérer à nouveau l'email au moment de la soumission
        const currentEmail = localStorage.getItem("userEmail");

        if (!currentEmail) {
            setError('Vous devez être connecté pour publier un commentaire');
            return;
        }

        setIsSubmitting(true);
        setError('');
        setSuccess(false);

        try {
            // Utiliser la route directe simplifiée
            const response = await fetch('/api/comments/direct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content,
                    postId,
                    userEmail: currentEmail
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Erreur lors de l\'ajout du commentaire');
            }

            // Commentaire publié avec succès
            setContent('');
            setSuccess(true);

            // Rafraîchir la page après un court délai
            setTimeout(() => {
                router.refresh();
            }, 1000);
        } catch (err: any) {
            console.error('Erreur du formulaire:', err);
            setError(err.message || 'Une erreur est survenue');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Si nous sommes côté serveur, ne rien afficher encore
    if (!isClient) {
        return <div className="mt-8 p-4 bg-gray-100 rounded-xl">Chargement du formulaire...</div>;
    }

    return (
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Ajouter un commentaire</h3>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    Votre commentaire a été publié avec succès!
                </div>
            )}

            {!userEmail ? (
                <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-md">
                    Vous devez vous <a href="/login" className="underline font-semibold">connecter</a> pour ajouter un commentaire.
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
            <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Votre commentaire..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting}
            />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#2A51A0] text-white rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Envoi en cours...' : 'Publier le commentaire'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default CommentForm;