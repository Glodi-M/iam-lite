import Navbar from "@/components/Navbar";
export default function RegisterPage() {
    return (
        <>
            <Navbar />
            <main className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md p-6 border border-gray-300 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6 text-center">Inscription</h1>

                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            className="w-full border p-3 rounded"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-3 rounded"
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
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