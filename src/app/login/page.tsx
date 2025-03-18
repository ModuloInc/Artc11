"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Login failed");
            return;
        }

        router.push("/profile"); // Redirection après connexion
    };

    return (
        <div className="h-screen flex justify-center items-center bg-black">
            {/* Ajustement pour que la carte prenne toute la hauteur */}
            <div className="w-[402px] h-full max-h-[852px] bg-[#FFFFFF] shadow-lg  p-6 flex flex-col items-center justify-between">

                {/* LOGO */}
                <div className="w-[226px] h-[117px] mt-20 flex justify-center">
                    <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain"/>
                </div>

                {/* FORMULAIRE */}
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-10">
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

                    <div className="relative w-[296px]">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">🔒</span>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-[42px] p-3 pl-12 rounded-full border border-gray-300 bg-[#F2F0F0] text-gray-900 focus:outline-none"
                        />
                    </div>

                    {/* Forgot Password aligné correctement */}
                    <div className="w-[296px] text-right mt-[-6px]">
                        <button
                            className="text-blue-600 underline text-sm"
                            onClick={() => router.push("/forgot-password")}
                            type="button"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Bouton Connexion */}
                    <div className="flex justify-center mt-10">
                        <button
                            type="submit"
                            className="w-[157px] h-[48px] bg-[#2A51A0] text-white font-semibold rounded-full shadow-md hover:bg-blue-700"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {/* Lien Register ajusté */}
                <button
                    onClick={() => router.push("/register")}
                    className="mb-10 text-[#2A51A0] font-bold text-sm"
                >
                    Register
                </button>

            </div>
        </div>
    );
}
