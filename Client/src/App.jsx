// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";
import Cart from "./Cart";
import Signup from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";

export default function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Load user from sessionStorage on refresh
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const handleUnload = () => {
      if (
        !performance
          .getEntriesByType("navigation")[0]
          .type.includes("reload")
      ) {
        sessionStorage.clear();
        localStorage.clear();
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  // Dynamic document title based on role
  useEffect(() => {
    if (user?.role === "admin") {
      document.title = "Admin Panel";
    } else if (user?.role === "user") {
      document.title = "Flipkart Online Shopping Site";
    } else {
      document.title = "Login | Flipkart Clone";
    }
  }, [user]);

  // Handle login and store in sessionStorage
  const handleLogin = (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    // token comes separately from API; keep if you need it
    setUser(userData);
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      {/* Navbar based on role */}
      {user?.role === "admin" ? (
        <AdminNavbar onLogout={handleLogout} />
      ) : user ? (
        <Navbar onLogout={handleLogout} onSearch={setSearchTerm} />
      ) : null}

      <Routes>
        {/* Public auth routes – always exist */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <Signup />}
        />

        {/* Root route behaves based on user role */}
        <Route
          path="/"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : user.role === "admin" ? (
              <Navigate to="/admin/products" replace />
            ) : (
              <Home searchTerm={searchTerm} />
            )
          }
        />

        {/* User-only routes */}
        <Route
          path="/cart"
          element={
            user?.role === "user" ? (
              <Cart />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin/products"
          element={
            user?.role === "admin" ? (
              <AdminProducts />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/admin/orders"
          element={
            user?.role === "admin" ? (
              <AdminOrders />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
