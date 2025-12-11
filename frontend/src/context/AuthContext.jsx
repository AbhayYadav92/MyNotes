import React, { createContext, useState, useEffect } from "react";
import AUTH_URL from "../api/auth"; // axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // Attach token to axios headers
  useEffect(() => {
    if (token) {
      AUTH_URL.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete AUTH_URL.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Save user in local storage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // ---------------- SIGNUP ----------------
  const signup = async (data) => {
    try {
      const res = await AUTH_URL.post("signup", data);

      setToken(res.data.token);
      setUser(res.data.user);
      return true;

    } catch (err) {
      console.log("SIGNUP ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Signup failed!");
      return false;
    }
  };

  // ---------------- LOGIN ----------------
  const login = async (data) => {
    try {
      const res = await AUTH_URL.post("login", data);

      setToken(res.data.token);
      setUser(res.data.user);
      return true;

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Login failed! Please check email or password.");
      return false;
    }
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
