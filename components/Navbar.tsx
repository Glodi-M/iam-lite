"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const router = useRouter();

    const { user, setUser, loading } = useAuth();

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
            });

            if (response.ok) {
                setUser(null);
                router.push("/login");
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };

    if (loading) {
        return null;
    }

    return (
        <nav className="flex items-center justify-between border-b p-4">
            <h1 className="text-xl font-bold">IAM Lite</h1>

            <div className="flex space-x-4">
                <Link href="/">Accueil</Link>

                {user ? (
                    <>
                        <Link href="/dashboard">
                            Dashboard
                        </Link>

                        {user?.role === "ADMIN" && (
                            <Link href="/admin">
                                Admin
                            </Link>
                        )}

                        <button
                            onClick={handleLogout}
                            className="cursor-pointer"
                        >
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            Connexion
                        </Link>

                        <Link href="/register">
                            Inscription
                        </Link>

                    </>
                )}
            </div>
        </nav>
    );
}