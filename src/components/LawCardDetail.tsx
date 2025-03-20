"use client";

import { useEffect, useRef } from "react";
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

interface LawDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    law: EuropeanLaw;
}

export default function LawDetailModal({ isOpen, onClose, law }: LawDetailModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Format the date
    const formattedDate = new Date(law.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Add/remove body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
            >
                {/* Header with close button */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-900">{law.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content with scrollable area */}
                <div className="overflow-y-auto p-4 flex-1">
                    {/* Hero image */}
                    {law.imageUrl && (
                        <div className="w-full h-48 md:h-64 relative mb-4 rounded-lg overflow-hidden">
                            <Image
                                src={law.imageUrl}
                                alt={law.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Metadata */}
                    <div className="flex justify-between items-center mb-4">
            <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
              {law.category}
            </span>
                        <span className="text-sm text-gray-500">{formattedDate}</span>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Overview</h3>
                        <p className="text-gray-700">{law.description}</p>
                    </div>

                    {/* Full Text */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Full Text</h3>
                        <div className="prose prose-sm max-w-none text-gray-700">
                            {/* Splitting by paragraphs for better formatting */}
                            {law.fullText.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="mb-4">{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer with actions */}
                <div className="border-t p-4 flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                        Close
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Share Law
                    </button>
                </div>
            </div>
        </div>
    );
}