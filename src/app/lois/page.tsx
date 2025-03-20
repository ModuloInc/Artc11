"use client";

import { useState, useEffect } from "react";
import TabBar from "@/components/TabBar";
import LawCard from "@/components/LawCard";
import LawDetailModal from "@/components/LawCardDetail";

// Types pour les données
interface EuropeanLaw {
    id: string;
    title: string;
    description: string;
    fullText: string;
    imageUrl?: string;
    category: string;
    date: string;
}

export default function EuropeanLawsPage() {
    const [laws, setLaws] = useState<EuropeanLaw[]>([]);
    const [selectedLaw, setSelectedLaw] = useState<EuropeanLaw | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchLaws() {
            try {
                setLoading(true);
                const res = await fetch("/api/laws");

                if (!res.ok) {
                    throw new Error("Failed to fetch European laws");
                }

                const data = await res.json();
                setLaws(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching laws:", error);
                setError("Failed to load European laws");
            } finally {
                setLoading(false);
            }
        }

        fetchLaws();
    }, []);

    const handleCardClick = (law: EuropeanLaw) => {
        setSelectedLaw(law);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLaw(null);
    };

    // Filtres par catégorie
    const categories = [...new Set(laws.map(law => law.category))];
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredLaws = selectedCategory
        ? laws.filter(law => law.category === selectedCategory)
        : laws;

    return (
        <div className="min-h-screen bg-gray-100 pb-16">
            {/* Header */}
            <div className="bg-[#2A51A0] text-white py-4 px-4">
                <h1 className="text-xl font-bold">Latest European Laws</h1>
                <p className="text-sm opacity-80">Stay informed about recent legislative changes</p>
            </div>

            {/* Filters */}
            <div className="px-4 pt-4 pb-2 overflow-x-auto">
                <div className="flex space-x-2">
                    <button
                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                            selectedCategory === null
                                ? 'bg-[#2A51A0] text-white'
                                : 'bg-white text-gray-700 border border-gray-300'
                        }`}
                        onClick={() => setSelectedCategory(null)}
                    >
                        All Laws
                    </button>

                    {categories.map(category => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                                selectedCategory === category
                                    ? 'bg-[#2A51A0] text-white'
                                    : 'bg-white text-gray-700 border border-gray-300'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div className="px-4 py-2">
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-gray-600">Loading European laws...</div>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-red-500">{error}</div>
                    </div>
                )}

                {!loading && !error && filteredLaws.length === 0 && (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-gray-600">No laws found</div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                    {filteredLaws.map(law => (
                        <LawCard
                            key={law.id}
                            law={law}
                            onClick={() => handleCardClick(law)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal for law details */}
            {selectedLaw && (
                <LawDetailModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    law={selectedLaw}
                />
            )}

            {/* Tab Bar */}
            <TabBar />
        </div>
    );
}