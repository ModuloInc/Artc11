import Link from "next/link";
import Image from "next/image";
import React from "react";

const ForumCategory = ({params}: { params: { category: string } }) => {
    return (
        <>
            <div
                className="border-l-2 border-r-2 border-b-2 border-gray-600 rounded-bl-3xl rounded-br-3xl py-5 w-full max-w-md">
                <h2 className="text-center text-3xl font-bold text-black">{params.category}</h2>
            </div>
            <Image className="mt-5" alt="u" src="/QuestionCards.png" width="500" height="500"/>
            <div className="text-center text-3xl font-bold text-black">
                <Link href="/forum">Retour au forum</Link>
            </div>
        </>
    );
};

export default ForumCategory;
