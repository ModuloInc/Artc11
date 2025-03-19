"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {"Content-Type": "application/json"},
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Login failed");
            return;
        }

        router.push("/profile"); // Redirection après connexion
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-[#FFFAFA] p-6 flex flex-col items-center justify-center">
                <br/>
                <br/>
                {/* LOGO */}
                <div className=" flex justify-center mb-6">
                    <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain"/>
                </div>
                <br/>
                <br/>

                {/* FORMULAIRE */}
                <div className="flex flex-col">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6 mt-2">
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

                        <div>
                            <div className="relative w-[296px] mb-4">
                                <span
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">🔒</span>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-[42px] p-3 pl-12 rounded-full border border-gray-300 bg-[#F2F0F0] text-gray-900 focus:outline-none"
                                />
                            </div>

                            {/* Mot de passe oublié */}
                            <div className="w-[296px] text-right mt-[-6px]">
                                <button
                                    className="text-blue-600 underline text-sm"
                                    onClick={() => router.push("/forgot-password")}
                                    type="button"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        </div>


                        {/* Bouton Connexion */}
                        <div className="flex justify-center mt-2">
                            <button
                                type="submit"
                                className="w-[157px] h-[48px] bg-[#2A51A0] text-white font-semibold rounded-full shadow-md hover:bg-blue-700"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <button
                        onClick={() => router.push("/register")}
                        className="mt-4 text-[#2A51A0] font-bold text-sm"
                    >
                        Register
                    </button>
                </div>

            </div>
        </div>
    );
}
