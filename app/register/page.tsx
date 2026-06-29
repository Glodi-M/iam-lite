"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

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

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const passwordStrength = (() => {
    if (password.length === 0) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  })();

  const strengthLabel = ["", "Faible", "Moyen", "Bon", "Fort"];
  const strengthColor = ["", "hsl(4, 80%, 58%)", "hsl(38, 92%, 55%)", "hsl(210, 80%, 58%)", "hsl(145, 65%, 48%)"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 2000);
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
      {/* Orbes */}
      <div className="orb orb-blue" style={{ width: "350px", height: "350px", top: "-80px", right: "-80px", opacity: 0.5 }} />
      <div className="orb orb-purple" style={{ width: "300px", height: "300px", bottom: "-60px", left: "-60px", opacity: 0.4 }} />

      <div className="animate-fade-in-up glass-card-elevated" style={{ width: "100%", maxWidth: "440px", padding: "2.5rem" }}>
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
            <UserIcon />
          </div>
          <h1 style={{ fontSize: "1.625rem", fontWeight: "700", color: "var(--text-primary)", marginBottom: "0.375rem", letterSpacing: "-0.02em" }}>
            Créer un compte
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Rejoignez IAM Lite dès maintenant
          </p>
        </div>

        {/* Success state */}
        {success ? (
          <div className="alert alert-success animate-fade-in" style={{ flexDirection: "column", gap: "0.75rem", padding: "1.5rem", textAlign: "center" }}>
            <div style={{
              width: "48px", height: "48px",
              borderRadius: "50%",
              background: "hsla(145, 65%, 48%, 0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto",
            }}>
              <CheckIcon />
            </div>
            <div>
              <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>Compte créé avec succès !</div>
              <div style={{ fontSize: "0.8125rem", opacity: 0.8 }}>Redirection vers la connexion…</div>
            </div>
          </div>
        ) : (
          <>
            {/* Error */}
            {error && (
              <div className="alert alert-error animate-fade-in" style={{ marginBottom: "1.25rem" }}>
                <AlertIcon />
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
              <div>
                <label htmlFor="name" className="form-label">Nom complet</label>
                <div className="input-wrapper">
                  <span className="input-icon"><UserIcon /></span>
                  <input
                    id="name"
                    type="text"
                    className="input-field"
                    placeholder="Jean Dupont"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    disabled={loading}
                    minLength={2}
                  />
                </div>
              </div>

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
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <div className="input-wrapper">
                  <span className="input-icon"><LockIcon /></span>
                  <input
                    id="password"
                    type="password"
                    className="input-field"
                    placeholder="Minimum 8 caractères"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    disabled={loading}
                    minLength={8}
                  />
                </div>

                {/* Indicateur de force */}
                {password.length > 0 && (
                  <div style={{ marginTop: "0.5rem" }}>
                    <div style={{ display: "flex", gap: "4px", marginBottom: "0.25rem" }}>
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          style={{
                            flex: 1,
                            height: "3px",
                            borderRadius: "2px",
                            background: passwordStrength >= level ? strengthColor[passwordStrength] : "var(--border-subtle)",
                            transition: "background 0.3s ease",
                          }}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: "0.75rem", color: passwordStrength > 0 ? strengthColor[passwordStrength] : "var(--text-muted)" }}>
                      {strengthLabel[passwordStrength]}
                    </span>
                  </div>
                )}
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
                    <span>Création en cours…</span>
                  </>
                ) : (
                  "Créer mon compte"
                )}
              </button>
            </form>

            <div className="divider" style={{ margin: "1.5rem 0" }}>ou</div>

            <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
              Déjà un compte ?{" "}
              <Link href="/login" style={{ color: "var(--primary-400)", textDecoration: "none", fontWeight: "600" }}>
                Se connecter
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}