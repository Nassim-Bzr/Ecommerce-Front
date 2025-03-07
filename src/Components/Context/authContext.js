import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Vous devez importer avec accolades

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Nouvel indicateur de chargement

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // On suppose que le token contient "userId" ou "id"
        const userId = decoded.userId || decoded.id;
        if (userId) {
          setUser({ id: userId, email: decoded.email, role: decoded.role });
          setRole(decoded.role || "user");
        }
      } catch (error) {
        console.error("Token invalide ou expiré", error);
        setUser(null);
        setRole(null);
      }
    }
    setIsLoading(false); // Le chargement est terminé
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("token", token);
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId || decoded.id;
      setUser({ id: userId, email: decoded.email, role: decoded.role });
      setRole(decoded.role || "user");
    } catch (error) {
      console.error("Erreur lors du décodage du token", error);
      setRole("user");
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
