"use client";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

function formatDate(dateStr?: string): string {
  if (!dateStr) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Impossible de charger les utilisateurs.");
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        minHeight: "calc(100dvh - 64px)",
        padding: "3rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div className="animate-fade-in-up" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.375rem" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "var(--gradient-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}>
              <UsersIcon />
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--text-primary)", letterSpacing: "-0.02em", margin: 0 }}>
              Gestion des utilisateurs
            </h1>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: 0 }}>
            {loading ? "Chargement…" : `${users.length} utilisateur${users.length !== 1 ? "s" : ""} au total`}
          </p>
        </div>

        <button
          onClick={() => fetchUsers(true)}
          disabled={loading || refreshing}
          className="btn-ghost"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <span style={{ display: "inline-flex", transition: "transform 0.4s ease", transform: refreshing ? "rotate(360deg)" : "none" }}>
            <RefreshIcon />
          </span>
          Actualiser
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-error animate-fade-in" style={{ marginBottom: "1.5rem" }}>
          <AlertIcon />
          {error}
        </div>
      )}

      {/* Table */}
      <div className="glass-card animate-fade-in-up" style={{ overflow: "hidden", padding: 0 }}>
        {loading ? (
          <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ display: "flex", gap: "1rem" }}>
                <div className="skeleton" style={{ width: "32px", height: "32px", borderRadius: "50%" }} />
                <div style={{ flex: 1, display: "flex", gap: "1rem" }}>
                  <div className="skeleton" style={{ flex: 1, height: "20px" }} />
                  <div className="skeleton" style={{ flex: 2, height: "20px" }} />
                  <div className="skeleton" style={{ width: "70px", height: "20px" }} />
                </div>
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--text-muted)" }}>
            <UsersIcon />
            <p style={{ marginTop: "0.75rem" }}>Aucun utilisateur trouvé</p>
          </div>
        ) : (
          <div className="table-container" style={{ border: "none", borderRadius: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Utilisateur</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Créé le</th>
                </tr>
              </thead>
              <tbody className="stagger-children">
                {users.map((user) => (
                  <tr key={user._id} className="animate-fade-in">
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "var(--gradient-primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "0.8125rem",
                          fontWeight: "700",
                          flexShrink: 0,
                        }}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: "500" }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === "ADMIN" ? "badge-admin" : "badge-user"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}