"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

interface User {
    id: string;
    email: string;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/me");

                if (response.ok) {
                    const data = await response.json();

                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth doit être utilisé dans un AuthProvider"
        );
    }

    return context;
}