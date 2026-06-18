"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Inclure les cookies dans la requête
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Connexion réussie:", data.user);
            router.push("/dashboard"); // Rediriger vers le tableau de bord après la connexion réussie
        } else {
            console.error("Erreur lors de la connexion:", data.error);
            // Afficher un message d'erreur à l'utilisateur
        }
    };

    return (
        <>
            <main className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md p-6 border border-gray-300 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6 text-center">Connexion</h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-3 rounded"
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-3 rounded"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
                        >
                            Se connecter
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}