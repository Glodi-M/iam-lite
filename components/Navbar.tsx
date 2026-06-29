"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const LogOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, loading } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        setUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="navbar-glass">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <span style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              background: "var(--gradient-primary)",
              borderRadius: "8px",
              color: "white",
              flexShrink: 0,
            }}>
              <ShieldIcon />
            </span>
            <span className="logo-text" style={{ fontSize: "1.125rem" }}>IAM Lite</span>
          </Link>

          {/* Navigation links */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {loading ? (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <div className="skeleton" style={{ width: "72px", height: "32px" }} />
                <div className="skeleton" style={{ width: "80px", height: "32px" }} />
              </div>
            ) : user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                >
                  Dashboard
                </Link>

                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className={`nav-link ${isActive("/admin") ? "active" : ""}`}
                  >
                    Admin
                  </Link>
                )}

                {/* Séparateur */}
                <div style={{ width: "1px", height: "20px", background: "var(--border-subtle)", margin: "0 0.5rem" }} />

                {/* User badge */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  background: "hsla(230, 20%, 16%, 0.8)",
                  border: "1px solid var(--border-subtle)",
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                }}>
                  <span style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "var(--gradient-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "0.6875rem",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}>
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                  <span style={{ maxWidth: "140px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.email}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="btn-ghost"
                  style={{ marginLeft: "0.25rem" }}
                  title="Se déconnecter"
                >
                  {loggingOut ? (
                    <div className="spinner" style={{ width: "14px", height: "14px" }} />
                  ) : (
                    <LogOutIcon />
                  )}
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={`nav-link ${isActive("/login") ? "active" : ""}`}>
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="btn-primary"
                  style={{ padding: "0.4375rem 1rem", fontSize: "0.875rem" }}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}