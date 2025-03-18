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
        console.log("📤 Envoi des données :", payload);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        console.log("📥 Réponse API :", data);

        if (!res.ok) {
            setError(data.error || "Erreur lors de l'inscription");
            return;
        }

        router.push("/login"); // Redirection après inscription
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
                <h2 className="text-lg font-semibold mb-4">Inscription</h2>
                {error && <p className="text-red-500">{error}</p>}

                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-2"
                />
                <button type="submit" className="bg-green-500 text-white p-2 w-full">
                    S'inscrire
                </button>
            </form>
        </div>
    );
}
