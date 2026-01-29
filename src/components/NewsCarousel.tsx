"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface NewsItem {
  id: string;
  title?: string;
  description: string;
  imageUrl: string;
}

export default function NewsCarousel() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (e) {
        setError("Impossible de charger les actualités");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex h-56 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-surface-elevated)]">
        <span className="text-[var(--color-muted)]">Chargement…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[var(--radius-lg)] bg-[var(--color-accent-muted)] px-4 py-6 text-center text-[var(--color-error)]">
        {error}
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="flex h-56 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-surface-elevated)]">
        <span className="text-[var(--color-muted)]">Aucune actualité</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="!pb-10 [&_.swiper-pagination-bullet]:!bg-[var(--color-primary)] [&_.swiper-pagination-bullet-active]:!scale-125"
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
            <article className="group relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-primary)] shadow-[var(--shadow-md)]">
              <div className="relative aspect-[16/9] w-full min-h-[180px] sm:min-h-[220px]">
                <Image
                  src={item.imageUrl}
                  alt=""
                  fill
                  className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-90"
                  sizes="(max-width: 640px) 100vw, 720px"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                  <p className="font-heading text-lg font-semibold text-white drop-shadow md:text-xl">
                    {item.title ?? item.description}
                  </p>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
