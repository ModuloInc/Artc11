"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const payload = { fullname, email, password };

        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Error during registration");
            return;
        }

        router.push("/login"); // Redirect after registration
    };

    return (
        <div className="h-screen flex justify-center items-center bg-white">
            <div className="w-[402px] h-[852px] bg-[#C1E3FF] shadow-lg rounded-3xl p-6 flex flex-col items-center">

                {/* LOGO - Matching the login page spacing */}
                <div className="w-[226px] h-[117px] mt-20 mb-14 flex justify-center">
                    <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain"/>
                </div>

                {/* FORM - With matching spacing */}
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-10">
                    {error && <p className="text-red-500 mb-4">{error}</p>}

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

                    {/* Register Button - Matching style */}
                    <div className="flex justify-center mt-10">
                        <button
                            type="submit"
                            className="w-[157px] h-[48px] bg-[#2A51A0] text-white font-semibold rounded-full shadow-md hover:bg-blue-700"
                        >
                            Register
                        </button>
                    </div>
                </form>

                {/* Login link - Matching style */}
                <button
                    onClick={() => router.push("/login")}
                    className="mt-12 text-[#2A51A0] font-bold text-sm"
                >
                    Sign in
                </button>

            </div>
        </div>
    );
}