"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        router.push("/dashboard");
      } else {
        setError(data.error || "Une erreur est survenue");
      }
    } catch {
      setError("Impossible de contacter le serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="dots-bg"
      style={{
        minHeight: "calc(100dvh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orbes décoratifs */}
      <div className="orb orb-purple" style={{ width: "400px", height: "400px", top: "-100px", left: "-100px", opacity: 0.6 }} />
      <div className="orb orb-pink" style={{ width: "300px", height: "300px", bottom: "-80px", right: "-80px", opacity: 0.5 }} />

      <div className="animate-fade-in-up glass-card-elevated" style={{ width: "100%", maxWidth: "420px", padding: "2.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "52px",
            height: "52px",
            background: "var(--gradient-primary)",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
            boxShadow: "0 8px 24px hsla(250, 80%, 50%, 0.35)",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 style={{ fontSize: "1.625rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "0.375rem", letterSpacing: "-0.02em" }}>
            Bienvenue
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Connectez-vous à votre compte
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="alert alert-error animate-fade-in" style={{ marginBottom: "1.25rem" }}>
            <AlertIcon />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
          <div>
            <label htmlFor="email" className="form-label">Adresse email</label>
            <div className="input-wrapper">
              <span className="input-icon"><MailIcon /></span>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.375rem" }}>
              <label htmlFor="password" className="form-label" style={{ margin: 0 }}>Mot de passe</label>
              <Link href="#" style={{ fontSize: "0.8rem", color: "var(--primary-400)", textDecoration: "none" }}>
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="input-wrapper">
              <span className="input-icon"><LockIcon /></span>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: "100%", marginTop: "0.5rem", height: "48px" }}
          >
            {loading ? (
              <>
                <div className="spinner" />
                <span>Connexion en cours…</span>
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="divider" style={{ margin: "1.5rem 0" }}>ou</div>

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          Pas encore de compte ?{" "}
          <Link href="/register" style={{ color: "var(--primary-400)", textDecoration: "none", fontWeight: "600" }}>
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}