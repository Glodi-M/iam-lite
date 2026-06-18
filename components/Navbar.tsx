"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Navbar() {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
            });

            if (response.ok) {
                // Rediriger vers la page de connexion après la déconnexion
                router.push("/login");
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    return (
        <nav className="flex items-center  justify-between border-b p-4">
            <h1 className="text-xl font-bold"> IAM Lite </h1>
            <div className="flex space-x-4">
                <Link href="/">Accueil</Link>
                <Link href="/login">Connexion</Link>
                <Link href="/register">Inscription</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/logout" onClick={handleLogout}>
                    Déconnexion
                </Link>
            </div>
        </nav>
    )
}