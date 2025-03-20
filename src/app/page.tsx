"use client";

import { useEffect, useState } from "react";
import NewsCarousel from "@/components/NewsCarousel";
import TabBar from "@/components/TabBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import LawDetailModal from "@/components/LawCardDetail";
import Image from "next/image";
import Link from "next/link";

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
                        <span className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full bg-blue-100 text-blue-800 truncate max-w-[60%]">
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
            <header className="w-full py-3 px-4 flex items-center justify-center shadow-sm">
                <div className="flex items-center justify-center">
                    <Image
                        src="/logo.svg"
                        alt="Article 11 Logo"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                </div>
            </header>

            <div className="w-full px-4 mb-20 overflow-hidden">
                <Link href="/forum" className="block mt-4 mb-6">
                    <div
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-4 relative overflow-hidden">
                        <div className="flex items-center">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-[#123785]">Join the forum</h3>
                                <p className="text-sm text-gray-600 mt-1">Here young people speak and Europe listens</p>
                            </div>
                            <div
                                className="ml-4 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#123785]" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                </svg>
                            </div>
                        </div>
                        <div
                            className="absolute top-0 right-0 h-full w-20 opacity-10 bg-contain bg-right bg-no-repeat"></div>
                    </div>
                </Link>
                <div className="rounded-t-lg text-left px-2 mt-3 mb-4">
                    <h2 className="text-[#002266] text-[25px] font-semibold">New European Laws</h2>
                </div>
                <div className="w-full mb-6">
                    {loading ? (
                        <p>Chargement des lois...</p>
                    ) : (
                        <div className="overflow-x-hidden relative">
                            <div className="mx-auto px-4 -mx-4 md:px-8 md:-mx-8">
                                <Swiper
                                    modules={[Autoplay]}
                                    spaceBetween={20}
                                    slidesPerView={1.5}
                                    centeredSlides={true}
                                    initialSlide={1}
                                    loop={laws.length > 3}
                                    autoplay={{delay: 3000, disableOnInteraction: false}}
                                    breakpoints={{
                                        480: {slidesPerView: 1.6, spaceBetween: 20},
                                        640: {slidesPerView: 1.8, spaceBetween: 24},
                                        768: {slidesPerView: 2.2, spaceBetween: 24},
                                        1024: {slidesPerView: 2.8, spaceBetween: 30}
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
                        </div>
                    )}
                </div>
                <div className="py-3 rounded-t-lg text-left px-2">
                    <h2 className="text-[#002266] text-[25px] font-semibold">Top News</h2>
                </div>
                <div className="w-full">
                    <NewsCarousel/>
                </div>
            </div>
            {selectedLaw && (
                <LawDetailModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    law={selectedLaw}
                />
            )}
            <TabBar selected={1}/>
        </>
    );
}