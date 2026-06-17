export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <h1 className="text-5xl font-bold">Bienvenue sur IAM Lite</h1>

        <p className="mt-4 font-medium text-gray-600">
          Gestion des identités et des accès.
        </p>
        <button className="mt-8 rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600">
          Commencer
        </button>

      </main>
    </>
  );
}