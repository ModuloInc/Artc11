"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface NewsItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

export default function NewsCarousel() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("/api/news");

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                setNews(data);
            } catch (err) {
                setError("Erreur lors de la récupération des news");
                console.error("❌ Erreur:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);
    return (
        <div className="w-full px-4">
            {loading && <p>Chargement des news...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <Swiper modules={[Autoplay]} spaceBetween={20} slidesPerView={1} autoplay={{ delay: 3000 }} className="w-full mb-8">
                    {news.length > 0 ? (
                        news.map((newsItem) => (
                            <SwiperSlide key={newsItem.id}>
                                <div className="relative w-full rounded-lg">
                                    <div className="relative w-full h-48 sm:h-56 md:h-64">
                                        <Image src={newsItem.imageUrl} alt={newsItem.title} fill className="object-cover opacity-75" />
                                    </div>
                                    <div className="p-2">
                                        <p className="text-[#002266] text-[20px] font-medium mt-2">{newsItem.description}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <p>Aucune news disponible</p>
                    )}
                </Swiper>
            )}
        </div>
    );
}
