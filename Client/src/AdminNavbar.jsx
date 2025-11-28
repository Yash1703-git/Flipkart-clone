// src/AdminNavbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Admin Panel</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/products">Manage Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/orders">Orders</Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
