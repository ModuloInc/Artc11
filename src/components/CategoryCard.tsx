"use client";

import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
    name: string;
    imageSrc: string;
}

export default function CategoryCard({ name, imageSrc, link }: CategoryCardProps) {

    return (
        <Link href={link}>
        <div className="relative w-full h-28 sm:h-40 md:h-48 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <Image
                src={imageSrc}
                alt={name}
                layout="fill"
                objectFit="cover"
                className="opacity-60"
            />
            <div className="absolute inset-0 flex justify-center items-center text-center">
                <h2 className="text-white text-sm font-bold">{name}</h2>
            </div>
        </div>
        </Link>
    );
}
