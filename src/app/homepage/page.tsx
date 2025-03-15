"use client"
import { useState } from 'react';
import Head from 'next/head';
import TechCard from "@/components/TechCard";
import NavBottom from "@/components/NavButton";
import { FiX, FiHeart } from 'react-icons/fi';

// Types for our cards
interface TechCard {
    id: number;
    title: string;
    category: string;
    color: string;
    description: string;
}

export default function Home() {
    // Sample card data
    const [cards, setCards] = useState<TechCard[]>([
        {
            id: 1,
            title: "Standardisation des chargeurs de smartphones",
            category: "Technologie",
            color: "bg-red-400",
            description: "D'ici fin 2024, tous les téléphones portables, tablettes et appareils photos vendus dans l'UE devront être équipés d'un port de charge USB Type-C. À partir du printemps 2026, cette obligation concernera également les ordinateurs portables. La nouvelle législation – adoptée jeudi en plénière par 602 voix pour, 13 contre et 8 abstentions – participe à un effort plus vaste au niveau européen visant à réduire la quantité de déchets électroniques et à donner aux consommateurs les moyens d'effectuer des choix plus durables."
        },
        {
            id: 2,
            title: "Intelligence artificielle générative",
            category: "Technologie",
            color: "bg-blue-400",
            description: "L'intelligence artificielle générative comme ChatGPT, Gemini et Claude transforme notre interaction avec la technologie. Ces systèmes peuvent créer du contenu original, programmer des applications et analyser des données complexes. L'UE travaille sur des régulations pour encadrer cette technologie qui soulève des questions éthiques importantes."
        },
        {
            id: 3,
            title: "Réalité virtuelle et métavers",
            category: "Technologie",
            color: "bg-purple-400",
            description: "Le métavers représente la prochaine évolution d'Internet, combinant réalité virtuelle et augmentée pour créer des espaces numériques immersifs. Les entreprises investissent massivement dans ces technologies qui pourraient transformer l'éducation, le travail à distance et le divertissement dans les années à venir."
        }
    ]);

    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isDetailView, setIsDetailView] = useState(false);

    // Function to handle card actions
    const handleCardAction = (action: 'like' | 'dislike' | 'skip') => {
        // Remove the current card and update the index
        setCards(prevCards => prevCards.filter((_, index) => index !== currentCardIndex));
        setIsDetailView(false);
    };

    // Toggle detail view
    const toggleDetailView = () => {
        setIsDetailView(!isDetailView);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Head>
                <title>Tech Cards</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>

            <main className="flex-1 relative pt-4 px-4 pb-16">
                {/* Card Stack */}
                <div className="relative h-full max-w-md mx-auto pb-36">
                    {cards.length > 0 ? (
                        cards.map((card, index) => (
                            <div
                                key={card.id}
                                className={`absolute w-full rounded-3xl shadow-lg overflow-hidden transition-all duration-200 ${
                                    index === currentCardIndex
                                        ? 'z-10 scale-100 opacity-100'
                                        : index > currentCardIndex
                                            ? 'z-0 scale-95 opacity-80 translate-y-4'
                                            : 'hidden'
                                }`}
                            >
                                <TechCard
                                    card={card}
                                    isDetailView={isDetailView}
                                    onCardClick={toggleDetailView}
                                    onAction={handleCardAction}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col h-[80vh]">
                            <div className="flex items-center justify-center flex-grow">
                                <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-sm">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" />
                                    </svg>
                                    <p className="text-gray-600 text-lg mb-4">Aucune carte disponible</p>
                                    <p className="text-gray-500 mb-4">Consultez à nouveau plus tard pour découvrir de nouveaux contenus.</p>
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                                        Actualiser
                                    </button>
                                </div>
                            </div>

                            {/* Empty state action buttons */}
                            <div className="py-4 bg-white">
                                <div className="flex justify-center space-x-8">
                                    <button className="w-16 h-16 rounded-full bg-red-400 flex items-center justify-center shadow-md opacity-50" disabled>
                                        <FiX className="text-white text-3xl" />
                                    </button>

                                    <button className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center shadow-md opacity-50" disabled>
                                        <div className="w-8 h-3 bg-gray-400 rounded-full"></div>
                                    </button>

                                    <button className="w-16 h-16 rounded-full bg-green-400 flex items-center justify-center shadow-md opacity-50" disabled>
                                        <FiHeart className="text-white text-2xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Bottom Navigation */}
            <NavBottom />
        </div>
    );
}