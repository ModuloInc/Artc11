"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


// Types pour les données
interface Question {
    id: string;
    text: string;
    imageUrl?: string;
    description?: string;
    category?: {
        name: string;
    };
}

interface VoteStats {
    positive: number;
    neutral: number;
    negative: number;
    totalVotes: number;
}

export default function VotePage() {
    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isVoting, setIsVoting] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [stats, setStats] = useState<VoteStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Vérification de l'authentification
    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
            router.push("/login");
        }
    }, [router]);

    // Récupérer les questions
    useEffect(() => {
        async function fetchQuestions() {
            try {
                setLoading(true);

                const res = await fetch("/api/questions");

                if (!res.ok) {
                    throw new Error("Failed to fetch questions");
                }

                const data = await res.json();
                setQuestions(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setError("Failed to load questions");
            } finally {
                setLoading(false);
            }
        }

        fetchQuestions();
    }, []);

    const handleVote = async (value: -1 | 0 | 1) => {
        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail || !questions.length) return;
        if (isVoting) return;

        setIsVoting(true);
        try {
            const currentQuestion = questions[currentQuestionIndex];

            const res = await fetch("/api/votes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userEmail}`
                },
                body: JSON.stringify({
                    questionId: currentQuestion.id,
                    value: value,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to submit votes");
            }

            // Récupérer les statistiques pour cette question
            const statsRes = await fetch(`/api/questions/${currentQuestion.id}/stats`);

            if (!statsRes.ok) {
                throw new Error("Failed to fetch stats");
            }

            const statsData = await statsRes.json();
            setStats(statsData);
            setShowStats(true);
        } catch (error) {
            console.error("Erreur lors du votes:", error);
            alert("Une erreur s'est produite lors du votes");
        } finally {
            setIsVoting(false);
        }
    };

    const goToNextQuestion = () => {
        setShowStats(false);
        setStats(null);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Plus de questions, rediriger vers une page de résumé
            router.push("/");
        }
    };

    // Si chargement
    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-2xl font-bold text-gray-600">Loading...</div>
                </div>
            </div>
        );
    }

    // Si erreur ou pas de questions
    if (error || questions.length === 0) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-2xl font-bold text-gray-600">
                        {error || "No questions available"}
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header avec la catégorie */}
            <div className="bg-white py-4 px-6 text-center relative">
                <div className="absolute left-4">
                    <button onClick={() => router.back()} className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
                <div className="text-pink-500 font-medium">
                    {currentQuestion?.category?.name || "Category"}
                </div>
            </div>

            {/* Contenu principal */}
            <div className="flex-1 flex flex-col">
                {/* Image de fond avec la question */}
                <div
                    className="flex-1 flex items-center justify-center p-6 relative"
                    style={{
                        backgroundImage: currentQuestion?.imageUrl
                            ? `url(${currentQuestion.imageUrl})`
                            : "url('https://images.unsplash.com/photo-1551836022-aadb801c60ae?q=80&w=1000&auto=format&fit=crop')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
                    {/* Overlay semi-transparent */}
                    <div className="absolute inset-0 bg-pink-100 bg-opacity-70"></div>

                    {/* Question */}
                    <div className="bg-transparent z-10 text-center p-4">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            {currentQuestion?.text || "Loading question..."}
                        </h1>

                        {showStats && stats ? (
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold mb-4">Résultats du vote</h2>
                                <div className="flex justify-around mb-4">
                                    <div className="text-center">
                                        <div className="text-red-500 text-xl font-bold">{stats.negative || 0}%</div>
                                        <div>👎</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-yellow-500 text-xl font-bold">{stats.neutral || 0}%</div>
                                        <div>🤔</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-green-500 text-xl font-bold">{stats.positive || 0}%</div>
                                        <div>👍</div>
                                    </div>
                                </div>
                                <button
                                    onClick={goToNextQuestion}
                                    className="w-full bg-blue-600 text-white py-2 rounded-full"
                                >
                                    Suivant
                                </button>
                            </div>
                        ) : (
                            <div className="mt-4 bg-gray-50 bg-opacity-90 p-4 rounded-lg shadow-md">
                                {currentQuestion?.description && (
                                    <p className="text-sm text-gray-600 mb-4 text-left">
                                        {currentQuestion.description}
                                    </p>
                                )}
                                <div className="flex justify-center mt-2">
                                    <p className="text-gray-500 text-sm mb-4">I'm chatting with a chatbot...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Boutons de votes */}
                {!showStats && (
                    <div className="bg-pink-100 bg-opacity-30 py-4 px-10">
                        <div className="flex justify-around">
                            <button
                                onClick={() => handleVote(-1)}
                                disabled={isVoting}
                                className="rounded-full bg-white w-16 h-16 flex items-center justify-center shadow-md"
                            >
                                <div className="text-3xl">👎</div>
                            </button>
                            <button
                                onClick={() => handleVote(0)}
                                disabled={isVoting}
                                className="rounded-full bg-white w-16 h-16 flex items-center justify-center shadow-md"
                            >
                                <div className="text-3xl">🤔</div>
                            </button>
                            <button
                                onClick={() => handleVote(1)}
                                disabled={isVoting}
                                className="rounded-full bg-white w-16 h-16 flex items-center justify-center shadow-md"
                            >
                                <div className="text-3xl">👍</div>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}