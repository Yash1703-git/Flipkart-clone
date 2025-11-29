// src/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./api"; // adjust path

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${API_BASE_URL}`, form);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      if (onLogin) onLogin(res.data.user);

      setMessage("Login successful! Redirecting...");

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin/products", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Login</h3>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        {message && <p className="mt-3 text-center text-info">{message}</p>}
      </form>

      <p className="text-center mt-3">
        Don’t have an account?{" "}
        <a href="/signup" className="text-decoration-none fw-bold">
          Sign up
        </a>
      </p>
    </div>
  );
}
