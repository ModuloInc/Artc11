// components/TechCard.tsx
import React from 'react';
import { FiInfo, FiX, FiHeart } from 'react-icons/fi';

interface TechCardProps {
    card: {
        id: number;
        title: string;
        category: string;
        color: string;
        description: string;
    };
    isDetailView: boolean;
    onCardClick: () => void;
    onAction: (action: 'like' | 'dislike' | 'skip') => void;
}

const TechCard: React.FC<TechCardProps> = ({ card, isDetailView, onCardClick, onAction }) => {
    return (
        <div className="flex flex-col h-[75vh]">
            <div
                className={`${card.color} flex-grow flex flex-col relative overflow-hidden`}
                onClick={onCardClick}
            >
                {!isDetailView ? (
                    // Simple view
                    <div className="p-6 flex flex-col h-full">
                        {/* Category Icon & Title */}
                        <div className="flex items-center mb-4 mt-2">
                            <div className="h-8 px-4 py-1 rounded-full bg-white flex items-center">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-400 mr-2">
                                    <path fill="currentColor" d="M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z" />
                                </svg>
                                <span className="text-red-400 text-sm">{card.category.toLowerCase()}</span>
                            </div>
                        </div>

                        {/* Card Title */}
                        <div className="flex-grow flex items-center">
                            <h1 className="text-white text-3xl font-bold">
                                {card.title}
                            </h1>
                        </div>

                        {/* Info Button */}
                        <div className="text-white text-sm opacity-80 flex items-center mt-auto mb-4">
                            <FiInfo className="mr-2" />
                            Clique sur la carte pour plus d'informations
                        </div>
                    </div>
                ) : (
                    // Detailed view
                    <div className="flex flex-col h-full">
                        {/* Category Icon & Title */}
                        <div className="p-6">
                            <div className="flex items-center mb-4 mt-2">
                                <div className="h-8 px-4 py-1 rounded-full bg-white flex items-center">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-400 mr-2">
                                        <path fill="currentColor" d="M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z" />
                                    </svg>
                                    <span className="text-red-400 text-sm">{card.category.toLowerCase()}</span>
                                </div>
                            </div>

                            {/* Card Title */}
                            <h1 className="text-white text-3xl font-bold mb-2">
                                {card.title}
                            </h1>
                        </div>

                        {/* Separator line */}
                        <div className="border-b border-white border-opacity-20 w-full"></div>

                        {/* Card Description */}
                        <div className="p-6 flex-grow overflow-y-auto">
                            <p className="text-white text-lg leading-relaxed">
                                {card.description}
                            </p>
                        </div>

                        {/* Action buttons at the bottom */}
                        <div className="p-4 mt-auto">
                            <div className="flex items-center">
                                <div className="flex items-center mr-4">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
                                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-400">
                                            <path fill="currentColor" d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
                                        </svg>
                                    </div>
                                    <span className="text-white text-sm">bard<br/>m'explique</span>
                                </div>

                                <button className="flex-grow py-2 px-4 bg-red-300 bg-opacity-30 rounded-md text-white text-sm border border-white border-opacity-30">
                                    Je discute avec un chatbot...
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Action buttons */}
            <div className="py-4 bg-white">
                <div className="flex justify-center space-x-8">
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click event
                            onAction('dislike');
                        }}
                        className="w-16 h-16 rounded-full bg-red-400 flex items-center justify-center shadow-md"
                        aria-label="Dislike"
                    >
                        <FiX className="text-white text-3xl" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click event
                            onAction('skip');
                        }}
                        className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center shadow-md"
                        aria-label="Skip"
                    >
                        <div className="w-8 h-3 bg-gray-400 rounded-full"></div>
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click event
                            onAction('like');
                        }}
                        className="w-16 h-16 rounded-full bg-green-400 flex items-center justify-center shadow-md"
                        aria-label="Like"
                    >
                        <FiHeart className="text-white text-2xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TechCard;