"use client";
import { useAuth } from "@/context/AuthContext";

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const KeyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6" />
    <path d="m15.5 7.5 3 3L22 7l-3-3" />
  </svg>
);

const ActivityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      label: "Statut du compte",
      value: "Actif",
      icon: <ActivityIcon />,
      color: "hsl(145, 65%, 48%)",
      bg: "hsla(145, 65%, 48%, 0.1)",
      border: "hsla(145, 65%, 48%, 0.25)",
    },
    {
      label: "Rôle",
      value: user?.role ?? "USER",
      icon: <ShieldIcon />,
      color: "var(--primary-400)",
      bg: "hsla(250, 80%, 60%, 0.1)",
      border: "hsla(250, 80%, 60%, 0.25)",
    },
    {
      label: "Accès",
      value: user?.role === "ADMIN" ? "Admin + User" : "Utilisateur",
      icon: <KeyIcon />,
      color: "hsl(210, 80%, 65%)",
      bg: "hsla(210, 80%, 55%, 0.1)",
      border: "hsla(210, 80%, 55%, 0.25)",
    },
  ];

  return (
    <div
      style={{
        minHeight: "calc(100dvh - 64px)",
        padding: "3rem 1.5rem",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div className="animate-fade-in-up" style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "var(--gradient-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "1.125rem",
            fontWeight: "700",
            flexShrink: 0,
            boxShadow: "0 4px 16px hsla(250, 80%, 50%, 0.35)",
          }}>
            {user?.email?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--text-primary)", letterSpacing: "-0.02em", margin: 0 }}>
              Tableau de bord
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: "0.125rem 0 0" }}>
              Bienvenue,{" "}
              <span style={{ color: "var(--primary-400)", fontWeight: "500" }}>
                {user?.email ?? "utilisateur"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {stats.map((stat, i) => (
          <div
            key={i}
            className="stat-card animate-fade-in-up"
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: stat.bg,
              border: `1px solid ${stat.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: stat.color,
              flexShrink: 0,
            }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "500", letterSpacing: "0.02em" }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-primary)", marginTop: "0.125rem" }}>
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info card */}
      <div className="glass-card animate-fade-in-up" style={{ padding: "1.75rem", animationDelay: "0.2s" }}>
        <h2 style={{ fontSize: "1.0625rem", fontWeight: "600", color: "var(--text-primary)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <UserIcon />
          Informations du compte
        </h2>

        <div style={{ display: "grid", gap: "0.875rem" }}>
          {[
            { label: "Email", value: user?.email ?? "—" },
            { label: "Rôle", value: user?.role ?? "USER" },
            { label: "Identifiant", value: user?.id ? `...${user.id.slice(-8)}` : "—" },
          ].map(({ label, value }) => (
            <div key={label} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 1rem",
              background: "hsla(230, 20%, 10%, 0.5)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)",
            }}>
              <span style={{ fontSize: "0.875rem", color: "var(--text-muted)", fontWeight: "500" }}>{label}</span>
              <span style={{ fontSize: "0.9rem", color: "var(--text-primary)", fontFamily: label === "Identifiant" ? "var(--font-geist-mono)" : "inherit" }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}