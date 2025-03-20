"use client";

import Image from "next/image";

interface EuropeanLaw {
    id: string;
    title: string;
    description: string;
    fullText: string;
    imageUrl?: string;
    category: string;
    date: string;
}

interface LawCardProps {
    law: EuropeanLaw;
    onClick: () => void;
}

export default function LawCard({ law, onClick }: LawCardProps) {
    // Format the date
    const formattedDate = new Date(law.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:shadow-lg hover:scale-[1.01]"
            onClick={onClick}
        >
            <div className="flex flex-col md:flex-row">
                {/* Image (if available) */}
                {law.imageUrl && (
                    <div className="w-full md:w-1/3 h-40 md:h-auto relative">
                        <Image
                            src={law.imageUrl}
                            alt={law.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className={`p-4 flex-1 ${!law.imageUrl ? 'w-full' : 'md:w-2/3'}`}>
                    {/* Category */}
                    <div className="mb-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              {law.category}
            </span>
                        <span className="ml-2 text-xs text-gray-500">{formattedDate}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-gray-900 mb-2">{law.title}</h2>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-3">{law.description}</p>

                    {/* Read more link */}
                    <div className="text-right">
            <span className="text-blue-600 text-sm inline-flex items-center">
              Read more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
}