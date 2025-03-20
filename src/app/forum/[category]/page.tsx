import Link from "next/link";
import React from "react";
import ForumCard from "@/components/ForumCard";

const ForumCategory = ({params}: { params: { category: string } }) => {
    return (
        <>
            <div className="mb-6 container flex justify-center">
                <div
                    className="border-l-2 border-r-2 border-b-2 border-gray-600 rounded-bl-3xl rounded-br-3xl py-5 w-75 max-w-md">
                    <h2 className="text-center text-3xl font-bold text-black">{params.category}</h2>
                </div>
            </div>
            <div className="text-center text-sm font-bold text-black">
                <ForumCard/>
                <ForumCard/>
                <ForumCard/>
                <ForumCard/>
                <ForumCard/>
                <Link href="/forum">Retour au forum</Link>
            </div>
        </>
    );
};

export default ForumCategory;
