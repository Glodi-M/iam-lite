import Link from "next/link";

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Authentification sécurisée",
    description: "JWT httpOnly cookies, bcrypt, protection CSRF avec sameSite.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Gestion des rôles",
    description: "Accès différenciés USER / ADMIN avec middleware Next.js.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Routes protégées",
    description: "Middleware Edge Runtime pour sécuriser toutes les pages sensibles.",
  },
];

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "calc(100dvh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1.5rem",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Orbes */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, hsla(250, 80%, 50%, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, hsla(280, 70%, 45%, 0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, hsla(210, 80%, 55%, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero */}
      <div className="animate-fade-in-up" style={{ maxWidth: "640px", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.375rem 1rem",
          borderRadius: "9999px",
          background: "hsla(250, 80%, 60%, 0.12)",
          border: "1px solid hsla(250, 80%, 60%, 0.3)",
          color: "var(--primary-400)",
          fontSize: "0.8125rem",
          fontWeight: "600",
          marginBottom: "1.75rem",
          letterSpacing: "0.04em",
        }}>
          <div style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--primary-400)",
            animation: "pulse-ring 2s infinite",
          }} />
          Identity & Access Management
        </div>

        {/* Icon */}
        <div style={{
          width: "72px",
          height: "72px",
          background: "var(--gradient-primary)",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.75rem",
          color: "white",
          boxShadow: "0 12px 40px hsla(250, 80%, 50%, 0.4), 0 0 0 1px hsla(255, 100%, 90%, 0.1) inset",
        }}>
          <ShieldIcon />
        </div>

        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.25rem)",
          fontWeight: "800",
          letterSpacing: "-0.03em",
          lineHeight: "1.1",
          marginBottom: "1.25rem",
          background: "linear-gradient(135deg, var(--text-primary) 40%, var(--primary-400) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          IAM Lite
        </h1>

        <p style={{
          fontSize: "1.125rem",
          color: "var(--text-secondary)",
          lineHeight: "1.7",
          marginBottom: "2.5rem",
          maxWidth: "480px",
          margin: "0 auto 2.5rem",
        }}>
          Plateforme légère de gestion des identités et des accès.
          Authentification sécurisée, rôles granulaires, et routes protégées.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/register" className="btn-primary" style={{ padding: "0.875rem 2rem", fontSize: "1rem" }}>
            Commencer gratuitement
          </Link>
          <Link href="/login" className="btn-ghost" style={{ padding: "0.875rem 2rem", fontSize: "1rem" }}>
            Se connecter
          </Link>
        </div>
      </div>

      {/* Features */}
      <div
        className="stagger-children"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
          maxWidth: "900px",
          width: "100%",
          marginTop: "5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            className="glass-card animate-fade-in-up"
            style={{ padding: "1.5rem", textAlign: "left" }}
          >
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "hsla(250, 80%, 60%, 0.12)",
              border: "1px solid hsla(250, 80%, 60%, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary-400)",
              marginBottom: "1rem",
            }}>
              {f.icon}
            </div>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: "600", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              {f.title}
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}