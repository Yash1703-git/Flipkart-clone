// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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

  // ✅ Load user from sessionStorage on refresh
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    // ✅ Clear session on full browser/tab close
    const handleUnload = (event) => {
      if (!performance.getEntriesByType("navigation")[0].type.includes("reload")) {
        sessionStorage.clear();
        localStorage.clear();
      }
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  // ✅ Dynamic document title based on role
  useEffect(() => {
    if (user?.role === "admin") {
      document.title = "Admin Panel";
    } else if (user?.role === "user") {
      document.title = "Flipkart Online Shopping Site";
    } else {
      document.title = "Login | Flipkart Clone";
      
    }
  }, [user]);

  // ✅ Handle login and store in sessionStorage
  const handleLogin = (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", userData.token);
    setUser(userData);
  };

  // ✅ Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      {/* ✅ Show Navbar based on role */}
      {user?.role === "admin" ? (
        <AdminNavbar onLogout={handleLogout} />
      ) : user ? (
        <Navbar onLogout={handleLogout} onSearch={setSearchTerm} />
      ) : null}

      <Routes>
        {/* ✅ Not Logged In */}
        {!user && (
          <>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}

        {/* ✅ User Routes */}
        {user?.role === "user" && (
          <>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}

        {/* ✅ Admin Routes */}
        {user?.role === "admin" && (
          <>
            <Route path="/" element={<Navigate to="/admin/products" replace />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="*" element={<Navigate to="/admin/products" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
