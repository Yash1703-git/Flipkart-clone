// src/SignUp.jsx
import React, { useState } from "react";
import axios from "axios";
// import { API_BASE_URL } from "./api"; // adjust path


export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage("Registration successful! Please login.");
      setForm({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">Register</h3>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
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
        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
        {message && <p className="mt-3 text-center text-info">{message}</p>}
      </form>
    </div>
  );
}
