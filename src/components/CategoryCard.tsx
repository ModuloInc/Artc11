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
            <div className="relative w-full h-20  rounded-lg  shadow-lg transition-transform bg-black bg-opacity-50">
                <Image
                    src={imageSrc}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="opacity-60 "
            />
            <div className="absolute inset-0 flex justify-center items-center text-center grayscale">
                <h2 className="text-white text-sm font-bold px-2">{name}</h2>
            </div>
        </div>
        </Link>
    );
}
