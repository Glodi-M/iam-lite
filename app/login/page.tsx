export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-6 border border-gray-300 rounded-lg p-6 shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Connexion</h1>

                <form className="space-y-4">
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
                        Se connecter
                    </button>
                </form>

            </div>


        </main>
    );
}