import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, getToken, TOKEN_KEY } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(getToken() ? "loading" : "guest");

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* noop */
    }
    setUser(null);
    setStatus("guest");
  }, []);

  useEffect(() => {
    if (!getToken()) return;
    api("/user/profile")
      .then(({ user }) => {
        setUser(user);
        setStatus("auth");
      })
      .catch(logout);
  }, [logout]);

  useEffect(() => {
    window.addEventListener("auth:expired", logout);
    return () => window.removeEventListener("auth:expired", logout);
  }, [logout]);

  const login = async (email, password) => {
    const { user } = await api("/user/login", { method: "POST", body: { email, password }, auth: false });
    localStorage.setItem(TOKEN_KEY, user.token);
    setUser(user);
    setStatus("auth");
    return user;
  };

  const value = useMemo(() => ({ user, setUser, status, login, logout }), [user, status, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
