"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Type definition for user data
interface UserProfile {
    id: string;
    fullname?: string;
    email: string;
    image?: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                setLoading(true);

                // Récupérer les informations utilisateur depuis localStorage
                const storedEmail = localStorage.getItem("userEmail");

                if (!storedEmail) {
                    router.push("/login");
                    return;
                }

                // Récupérer les informations complètes du profil depuis l'API
                const res = await fetch(`/api/profile?email=${encodeURIComponent(storedEmail)}`);

                if (!res.ok) {
                    if (res.status === 401) {
                        localStorage.removeItem("userEmail");
                        router.push("/login");
                        return;
                    }
                    throw new Error("Failed to fetch profile");
                }

                const userData = await res.json();
                setUser(userData);
                setError(null);
            } catch (error) {
                console.error("Error fetching profile:", error);

                // Fallback aux données de localStorage si l'API échoue
                const storedEmail = localStorage.getItem("userEmail");
                const storedName = localStorage.getItem("userFullname");
                const storedId = localStorage.getItem("userId");

                if (storedEmail && storedId) {
                    setUser({
                        id: storedId,
                        fullname: storedName || undefined,
                        email: storedEmail
                    });
                } else {
                    setError("Failed to load profile data");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUserProfile();
    }, [router]);

    // Function to handle logout
    const handleLogout = () => {
        // Nettoyer localStorage
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userFullname");
        localStorage.removeItem("userId");

        router.push("/login");
    };

    // Show loading state
    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center bg-[#3B5998]">
                <div className="text-white text-lg">Loading profile...</div>
            </div>
        );
    }

    // If user data is not available
    if (!user) {
        return (
            <div className="h-screen flex justify-center items-center bg-[#3B5998]">
                <div className="text-white text-lg">
                    {error || "Unable to load profile. Please try again."}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#3B5998]">
            {/* Profile header with image */}
            <div className="flex justify-center pt-10 pb-6">
                <div className="relative w-32 h-32">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={user.fullname || "Profile"}
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full rounded-full bg-[#C1E3FF] flex items-center justify-center">
                            <span className="text-4xl text-[#3B5998]">
                                {user.fullname ? user.fullname.charAt(0).toUpperCase() : "?"}
                            </span>
                        </div>
                    )}
                    <div className="absolute bottom-0 right-0 bg-[#C1E3FF] p-2 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[#3B5998]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Profile information */}
            <div className="flex-1 bg-[#C1E3FF]/80 rounded-t-3xl px-4 py-6">
                <div className="max-w-md mx-auto">
                    {/* Username field */}
                    <div className="mb-6">
                        <div className="text-gray-500 text-sm mb-1">Username</div>
                        <div className="text-black text-xl font-medium">{user.fullname || "Not provided"}</div>
                        <div className="h-px bg-gray-300 mt-2"></div>
                    </div>

                    {/* Email field */}
                    <div className="mb-6">
                        <div className="text-gray-500 text-sm mb-1">Email</div>
                        <div className="text-black text-xl">{user.email}</div>
                        <div className="h-px bg-gray-300 mt-2"></div>
                    </div>

                    {/* Password field - Just shows dots for security */}
                    <div className="mb-6">
                        <div className="text-gray-500 text-sm mb-1">Password</div>
                        <div className="text-black text-xl">••••••••</div>
                        <div className="h-px bg-gray-300 mt-2"></div>
                    </div>

                    {/* Logout Button */}
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={handleLogout}
                            className="w-[157px] h-[48px] bg-[#2A51A0] text-white font-semibold rounded-full shadow-md hover:bg-blue-700"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}