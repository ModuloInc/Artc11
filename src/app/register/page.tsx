"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ fullname, email, password }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Registration failed");
            return;
        }

        router.push("/login"); // Redirection après inscription
    };

    return (
        <div className="h-screen flex justify-center items-center bg-black">
            {/* Carte centrée verticalement */}
            <div className="w-[402px] h-full max-h-[750px] bg-[#FFFAFA] shadow-lg p-6 flex flex-col items-center justify-center rounded-3xl">

                {/* LOGO */}
                <div className="w-[226px] h-[117px] flex justify-center mb-6">
                    <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain"/>
                </div>

                {/* FORMULAIRE */}
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6 mt-2">
                    <div className="relative w-[296px]">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">👤</span>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="w-full h-[42px] p-3 pl-12 rounded-full border border-gray-300 bg-[#F2F0F0] text-gray-900 focus:outline-none"
                        />
                    </div>

                    <div className="relative w-[296px]">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">📧</span>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-[42px] p-3 pl-12 rounded-full border border-gray-300 bg-[#F2F0F0] text-gray-900 focus:outline-none"
                        />
                    </div>

                    <div className="relative w-[296px] mb-4">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">🔒</span>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-[42px] p-3 pl-12 rounded-full border border-gray-300 bg-[#F2F0F0] text-gray-900 focus:outline-none"
                        />
                    </div>

                    {/* Boutons Register et Sign in rapprochés */}
                    <div className="flex flex-col items-center gap-2 mt-2">
                        <button
                            type="submit"
                            className="w-[157px] h-[48px] bg-[#2A51A0] text-white font-semibold rounded-full shadow-md hover:bg-blue-700"
                        >
                            Register
                        </button>

                        <button
                            onClick={() => router.push("/login")}
                            className="text-[#2A51A0] font-bold text-sm mt-5"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
