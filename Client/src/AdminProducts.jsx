// src/AdminProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api"; // NEW

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    imgurl: "",
    stock: "",
  });

  const api = `${API_BASE_URL}/api/products`;

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${api}/list`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form._id) {
        // Update
        await axios.put(`${api}/${form._id}`, form);
        alert("Product updated successfully!");
      } else {
        // Create new
        await axios.post(`${api}/create`, form);
        alert("Product added successfully!");
      }

      setForm({ _id: "", name: "", description: "", price: "", imgurl: "", stock: "" });

      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${api}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
  };

  return (
    <div className="container my-4">
      <h2>{form._id ? "Update Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          {["name", "description", "price", "imgurl", "stock"].map((field) => (
            <div className="col-md-2" key={field}>
              <input
                type={field === "price" || field === "stock" ? "number" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          ))}

          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit">
              {form._id ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      <h2>Products List</h2>
      <div className="row">
        {products.map((p) => (
          <div className="col-md-3 mb-4" key={p._id}>
            <div className="card h-100">
              <img
                src={p.imgurl}
                className="card-img-top"
                alt={p.name}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text">₹{p.price}</p>
                <p className="card-text">Stock: {p.stock}</p>

                <div className="d-flex justify-content-between">
                  <button className="btn btn-sm btn-warning" onClick={() => handleEdit(p)}>
                    Update
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
