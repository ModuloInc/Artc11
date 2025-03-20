"use client";

import { useEffect, useState } from "react";
import NewsCarousel from "@/components/NewsCarousel";
import TabBar from "@/components/TabBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import LawDetailModal from "@/components/LawCardDetail";

interface EuropeanLaw {
    id: string;
    title: string;
    description: string;
    fullText: string;
    imageUrl?: string;
    category: string;
    date: string;
}

export default function Home() {
    const [laws, setLaws] = useState<EuropeanLaw[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLaw, setSelectedLaw] = useState<EuropeanLaw | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchLaws = async () => {
            try {
                const response = await fetch('/api/laws');
                const data = await response.json();
                setLaws(data.slice(0, 6));
            } catch (error) {
                console.error('Erreur lors de la récupération des lois:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLaws();
    }, []);

    const handleLawClick = (law: EuropeanLaw) => {
        setSelectedLaw(law);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLaw(null);
    };

    const renderFixedHeightLawCard = (law: EuropeanLaw) => {
        const formattedDate = new Date(law.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        return (
            <div
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:shadow-lg hover:scale-[1.01] h-64 w-full"
                onClick={() => handleLawClick(law)}
            >{law.imageUrl && (
                <div className="w-full h-36 relative">
                    <img
                        src={law.imageUrl}
                        alt={law.title}
                        className="object-cover w-full h-full"
                    />
                </div>
            )}
                <div className="p-4 h-28 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <span className="inline-block px-2 py-0.5 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 truncate max-w-[60%]">
                            {law.category}
                        </span>
                        <span className="text-xs text-gray-500">{formattedDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-1">{law.title}</h3>

                    <div className="text-right mt-auto">
                        <span className="text-blue-600 text-sm inline-flex items-center">
                            Read more
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="w-full px-4 mb-20">
                <div className="rounded-t-lg text-left px-2 py-2 mb-4">
                    <h2 className="text-[#002266] text-[25px] font-semibold">Top News</h2>
                </div>
                <div className="w-full">
                    <NewsCarousel />
                </div>

                <div className="rounded-t-lg text-left px-2 mt-6 mb-4">
                    <h2 className="text-[#002266] text-[25px] font-semibold">European Laws</h2>
                </div>
                <div className="w-full mb-6">
                    {loading ? (
                        <p>Chargement des lois...</p>
                    ) : (
                        <div className="overflow-visible -mx-8 px-8">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1.5}
                                centeredSlides={true}
                                initialSlide={1}
                                loop={laws.length > 3}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                breakpoints={{
                                    480: { slidesPerView: 1.6, spaceBetween: 20 },
                                    640: { slidesPerView: 1.8, spaceBetween: 24 },
                                    768: { slidesPerView: 2.2, spaceBetween: 24 },
                                    1024: { slidesPerView: 2.8, spaceBetween: 30 }
                                }}
                                className="w-full"
                            >
                                {laws.map((law) => (
                                    <SwiperSlide key={law.id} className="h-auto">
                                        {renderFixedHeightLawCard(law)}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>
            </div>
            {selectedLaw && (
                <LawDetailModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    law={selectedLaw}
                />
            )}
            <TabBar />
        </>
    );
}