import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // "checking" avoids a login-page flash while we ask the backend
  // whether the token cookie from a previous session is still valid.
  const [status, setStatus] = useState("checking");

  const refreshProfile = useCallback(async () => {
    try {
      const res = await api.get("/profile");
      setUser(res.data);
      setStatus("authenticated");
      return res.data;
    } catch {
      setUser(null);
      setStatus("guest");
      return null;
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const login = async (emailId, password) => {
    const res = await api.post("/login", { emailId, password });
    setUser(res.data);
    setStatus("authenticated");
    return res.data;
  };

  const signup = async (payload) => {
    await api.post("/signup", payload);
    // /signup does not log the user in on the backend, so chain a login.
    return login(payload.emailId, payload.password);
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } finally {
      setUser(null);
      setStatus("guest");
    }
  };

  return (
    <AuthContext.Provider value={{ user, status, setUser, login, signup, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
