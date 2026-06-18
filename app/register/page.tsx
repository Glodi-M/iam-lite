"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Utilisateur créé avec succès:", data.user);
            router.push("/login"); // Rediriger vers la page de connexion après l'inscription réussie
            // Rediriger ou afficher un message de succès
        } else {
            console.error("Erreur lors de la création de l'utilisateur:", data.error);
            // Afficher un message d'erreur à l'utilisateur
        }
    };

    return (
        <>
            <main className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md p-6 border border-gray-300 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6 text-center">Inscription</h1>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border p-3 rounded"
                        />

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
                            S'inscrire
                        </button>
                    </form>

                </div>
            </main>
        </>
    );
}   