"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function VoteSummaryPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [votes, setVotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Récupérer les votes de l'utilisateur
    useEffect(() => {
        async function fetchVotes() {
            if (status === "authenticated") {
                try {
                    const res = await fetch("/api/votes");
                    if (res.ok) {
                        const data = await res.json();
                        setVotes(data);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des votes:", error);
                } finally {
                    setLoading(false);
                }
            }
        }

        if (status !== "loading") {
            fetchVotes();
        }
    }, [status]);

    // Vérification de l'authentification
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // Fonction pour afficher l'icône correspondant à la valeur du votes
    const getVoteIcon = (value) => {
        switch (value) {
            case 1:
                return "👍";
            case 0:
                return "🤔";
            case -1:
                return "👎";
            default:
                return "❓";
        }
    };


    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white py-4 px-6 text-center relative shadow-sm">
                <div className="absolute left-4">
                    <button onClick={() => router.push("/vote")} className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
                <h1 className="text-xl font-semibold">Mes Votes</h1>
            </div>

            {/* Contenu principal */}
            <div className="flex-1 p-4">
                {votes.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Aucun vote pour le moment</h2>
                            <p className="text-gray-600 mb-6">Vous n'avez pas encore voté sur des questions.</p>
                            <button
                                onClick={() => router.push("/vote")}
                                className="bg-blue-600 text-white px-4 py-2 rounded-full"
                            >
                                Aller voter
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {votes.map((vote) => (
                            <div key={vote.id} className="bg-white p-4 rounded-lg shadow-md">
                                <div className="flex items-start">
                                    <div className="text-3xl mr-4">{getVoteIcon(vote.value)}</div>
                                    <div className="flex-1">
                                        <div className="text-sm text-pink-500 font-medium mb-1">
                                            {vote.question?.category?.name || "Catégorie"}
                                        </div>
                                        <h2 className="text-lg font-semibold mb-1">{vote.question?.text || "Question"}</h2>
                                        <div className="text-sm text-gray-500">
                                            {new Date(vote.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}