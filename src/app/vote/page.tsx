"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "../../../public/logo.svg";
import DislikeIcon from "../../../public/ion_thumbs-down-sharp.svg";
import LikeIcon from "../../../public/famicons_thumbs-up-sharp.svg";
import NeutralIcon from "../../../public/twemoji_thinking-face.svg";
import Image from "next/image";
import TabBar from "@/components/TabBar";

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
    const [showDetails, setShowDetails] = useState(false);
    const [stats, setStats] = useState<VoteStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

        if (!userEmail) {
            router.push("/login");
            return;
        }

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
                const errorData = await res.json().catch(() => ({ error: "Erreur inconnue" }));
                throw new Error(errorData.error || "Erreur lors de l'envoi du vote");
            }

            // Ne pas essayer de récupérer les statistiques, utiliser des valeurs fictives
            // pour démonstration
            setStats({
                positive: 60,
                neutral: 20,
                negative: 20,
                totalVotes: 100,
                positiveVotes: 60,
                neutralVotes: 20,
                negativeVotes: 20
            });
            setShowStats(true);
        } catch (err) {
            console.error("Erreur lors du vote:", err);
            alert(err.message || 'Une erreur s\'est produite lors du vote');
        } finally {
            setIsVoting(false);
        }
    };

    const goToNextQuestion = () => {
        setShowStats(false);
        // Ici on ne remet PAS showDetails à false pour passer directement à la prochaine question
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
            <div className="flex flex-col min-h-screen bg-white">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-2xl font-bold text-gray-600">Loading...</div>
                </div>
            </div>
        );
    }

    // Si erreur ou pas de questions
    if (error || questions.length === 0) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-2xl font-bold text-gray-600">
                        {error || "No questions available"}
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (!showDetails) {
        return (
            <div className="flex flex-col min-h-screen px-4 mb-20">
                {/* Header */}
                {/*<div className="pt-4 pb-2 px-6">*/}
                {/*    <div className="flex items-center">*/}
                {/*        <Image src={Logo} alt="Logo" width={65} height={30} />*/}
                {/*    </div>*/}
                {/*    <div className="border-b border-gray-300 mt-4"></div>*/}
                {/*</div>*/}

                {/* Main content with full-screen image and overlay */}
                <div className="flex flex-col relative h-120 mt-6">
                    {/* Stacked cards effect */}
                    <div className="absolute inset-0 z-0 h-101 mx-auto">
                        <div
                            className="absolute inset-0 bg-blue-200 rounded-3xl transform rotate-1 translate-x-2 translate-y-4 m-3"></div>
                        <div
                            className="absolute inset-0 bg-yellow-100 rounded-3xl transform -rotate-2 -translate-x-2 translate-y-2 m-3"></div>
                    </div>

                    {/* Main pink card with image background */}
                    <div className="relative z-10 mx-auto my-8 rounded-3xl overflow-hidden flex flex-col" style={{ width: '372px', height: '479px' }}>
                        <div
                            className="w-full h-full relative flex items-center justify-center"
                            style={{
                                backgroundImage: `url('https://images.unsplash.com/photo-1605493731871-a5c28cf967af?q=80&w=1000&auto=format&fit=crop')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            {/* Pink overlay */}
                            <div className="absolute inset-0 bg-pink-200 bg-opacity-80 rounded-3xl m-3 h-90 w-80"></div>

                            {/* Question text */}
                            <div className="relative z-10 px-10 text-center mx-auto">
                                <h1 className="text-2xl font-bold text-gray-900 leading-tight m-2">
                                    {currentQuestion.text}
                                </h1>

                                {/* See More button */}
                                <div className="mt-15 mb-8">
                                    <button
                                        onClick={() => setShowDetails(true)}
                                        className="mx-auto flex items-center justify-between border border-gray-800 rounded-full px-6 py-2"
                                    >
                                        <span className="font-medium mr-4">See More</span>
                                        <span className="border-b border-gray-800 w-8"></span>
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Boutons de votes (toujours visibles mais en bas) */}
                <div className="py-4 px-4 mb-8 scale-75">
                    <div className="bg-pink-100 rounded-full py-6 px-6 flex justify-around">
                        <button
                            onClick={() => handleVote(-1)}
                            disabled={isVoting}
                            className="rounded-full bg-white w-16 h-16 flex items-center justify-center shadow-md"
                        >
                            <Image src={DislikeIcon} alt="Thumbs down" width={32} height={32} />
                        </button>
                        <button
                            onClick={() => handleVote(0)}
                            disabled={isVoting}
                            className="rounded-full bg-white w-16 h-16 flex items-center justify-center shadow-md"
                        >
                            <Image src={NeutralIcon} alt="Thinking" width={32} height={32} />
                        </button>
                        <button
                            onClick={() => handleVote(1)}
                            disabled={isVoting}
                            className="rounded-full bg-white w-16 h-16 flex items-center justify-center shadow-md"
                        >
                            <Image src={LikeIcon} alt="Thumbs up" width={32} height={32} />
                        </button>
                    </div>
                </div>
                <TabBar selected={2}/>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-200 m-6">
            {/* Header avec la catégorie */}
            <div className="bg-gray-200 py-4 px-6 text-center relative">
                <div className="absolute left-4 top-4">
                    <button onClick={() => setShowDetails(false)} className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div className="text-pink-500 font-medium bg-white py-2 px-8 rounded-full inline-block">
                    {currentQuestion.category?.name || "General"}
                </div>
            </div>

            {/* Contenu principal */}
            <div className="flex-1 flex flex-col px-4">
                {/* Question card */}
                <div className="flex-1 flex items-center justify-center py-2">
                    {showStats && stats ? (
                        <div className="bg-pink-100 rounded-3xl p-6 w-full max-w-xl shadow-sm">
                            {/* Results visualization */}
                            <div className="flex justify-center items-end gap-8 mb-8">
                                {/* Negative bar */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className="w-24 bg-gray-600 flex items-center justify-center"
                                        style={{ height: `${stats.negative * 2}px` }}
                                    >
                                        <span className="text-white font-bold text-xl">{stats.negative}%</span>
                                    </div>
                                    <div className="mt-2 text-3xl">☹️</div>
                                </div>

                                {/* Positive bar */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className="w-24 bg-gray-600 flex items-center justify-center"
                                        style={{ height: `${stats.positive * 2}px` }}
                                    >
                                        <span className="text-white font-bold text-xl">{stats.positive}%</span>
                                    </div>
                                    <div className="mt-2 text-3xl">😊</div>
                                </div>
                            </div>

                            {/* Result explanation */}
                            <div className="text-center mb-10">
                                <p className="text-gray-900 font-bold mb-2">
                                    {stats.positive}% of respondents agreed, supporting increased government intervention for economic stability and fairness.
                                </p>
                                <p className="text-gray-900 font-bold">
                                    Meanwhile, {stats.negative}% disagreed, favoring a free-market approach with minimal regulation.
                                </p>
                            </div>

                            {/* Action buttons */}
                            <div className="space-y-3">
                                <button className="w-full bg-white py-3 px-4 rounded-full shadow-md flex items-center">
                                    <img src="/eu-flag.png" alt="EU Flag" className="w-8 h-8 mr-3" />
                                    <span className="text-gray-700">What do my neighbors think?</span>
                                </button>

                                <button className="w-full bg-white py-3 px-4 rounded-full shadow-md">
                                    <span className="text-gray-700">I want my voice to be heard!</span>
                                </button>

                                <button className="w-full bg-white py-3 px-4 rounded-full shadow-md">
                                    <span className="text-gray-700">Go to forum!</span>
                                </button>

                                {/* Bouton pour passer à la question suivante */}
                                <button
                                    onClick={goToNextQuestion}
                                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-full shadow-md font-medium"
                                >
                                    Next Question
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-pink-100 rounded-3xl p-6 w-full max-w-xl shadow-sm">
                            {/* Question */}
                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                    {currentQuestion.text}
                                </h1>

                                <div className="text-left">
                                    <p className="text-gray-700 mb-4">
                                        {currentQuestion.description || "No detailed description available."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Boutons de votes */}
                {!showStats && (
                    <div className="py-4 px-4 mb-2">
                        <div className="bg-pink-100 rounded-full py-6 px-6 flex justify-around scale-75">
                            <button
                                onClick={() => handleVote(-1)}
                                disabled={isVoting}
                                className="rounded-full bg-white w-16 h-16 flex items-center justify-center shadow-md"
                            >
                                <Image src={DislikeIcon} alt="Thumbs down" width={32} height={32} />
                            </button>
                            <button
                                onClick={() => handleVote(0)}
                                disabled={isVoting}
                                className="rounded-full bg-white w-16 h-16 flex items-center justify-center shadow-md"
                            >
                                <Image src={NeutralIcon} alt="Thinking" width={32} height={32} />
                            </button>
                            <button
                                onClick={() => handleVote(1)}
                                disabled={isVoting}
                                className="rounded-full bg-white w-16 h-16 flex items-center justify-center shadow-md"
                            >
                                <Image src={LikeIcon} alt="Thumbs up" width={32} height={32} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <TabBar selected={2}/>
        </div>
    );
}