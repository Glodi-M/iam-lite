import Link from "next/link";
export default function Navbar() {
    return (
        <nav className="flex items-center  justify-between border-b p-4">
            <h1 className="text-xl font-bold"> IAM Lite </h1>
            <div className="flex space-x-4">
                <Link href="/">Accueil</Link>
                <Link href="/login">Connexion</Link>
                <Link href="/register">Inscription</Link>
            </div>
        </nav>
    )
}