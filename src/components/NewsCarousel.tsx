"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface NewsItem {
    description: string;
    imageSrc: string;
}

const newsData: NewsItem[] = [
    {
        description: "European Parliament Votes to Make Eurovision Winner the Next EU President",
        imageSrc: "/News.png",
    },
    {
        description: "",
        imageSrc: "/images/news2.jpg",
    },

];

export default function NewsCarousel() {
    return (
        <div className="w-full px-4 ">
            <div className="w-full px-2 mb-8">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{ delay: 3000 }}
                    className="w-full  mb-8"
                >
                    {newsData.map((news, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full rounded-lg overflow-hidden">
                                <div className="relative w-full h-48 sm:h-56 md:h-64">
                                    <Image src={news.imageSrc} alt={news.description} fill className="object-cover opacity-75" />
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-gray-600 mt-2">{news.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
