"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export default function Navbar() {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
            });

            if (response.ok) {
                // Rediriger vers la page de connexion après la déconnexion
                setIsAuthenticated(false);
                router.push("/login");
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/me");
                if (response.ok) {
                    setIsAuthenticated(true);
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return (

        <nav className="flex items-center justify-between border-b p-4">
            <h1 className="text-xl font-bold">IAM Lite</h1>

            <div className="flex space-x-4">
                <Link href="/">Accueil</Link>

                {isAuthenticated ? (
                    <>
                        <Link href="/dashboard">
                            Dashboard
                        </Link>

                        <button onClick={handleLogout}>
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