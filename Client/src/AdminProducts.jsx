import React, { useEffect, useState } from "react";
import axios from "axios";
// import { API_BASE_URL } from "./api"; // adjust path

//  Component to manage products: Add, Update, Delete, List
export default function AdminProducts() {
  // State for all products list
  const [products, setProducts] = useState([]);

  // State for product form (used for both add & update)
  const [form, setForm] = useState({
    _id: "",           // if present → update mode
    name: "",
    description: "",   // backend field name is "description"
    price: "",
    imgurl: "",
    stock: "",
  });

  // Base API URL
  const api = "http://localhost:5000/api/products";

  //  Fetch all products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${api}/list`); // GET /list → all products
      setProducts(res.data); // store response in state
    } catch (err) {
      console.error(err);
    }
  };

  // Run once when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input change in form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // update matching field
  };

  // Handle form submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop form refresh
    try {
      if (form._id) {
        // If _id exists → update product
        await axios.put(`${api}/${form._id}`, form);
        alert("Product updated successfully!");
      } else {
        // Else → add new product
        await axios.post(`${api}/create`, form);
        alert("Product added successfully!");
      }

      // Clear form after submit
      setForm({ _id: "", name: "", description: "", price: "", imgurl: "", stock: "" });

      // Refresh product list
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return; // confirm before delete
    try {
      await axios.delete(`${api}/${id}`); // DELETE /:id
      fetchProducts(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // Fill form with product data for editing
  const handleEdit = (product) => {
    setForm(product); // set form fields with existing product
  };

  return (
    <div className="container my-4">
      {/* Title changes based on mode */}
      <h2>{form._id ? "Update Product" : "Add Product"}</h2>

      {/*  Product Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          {/* Render inputs dynamically for each field */}
          {["name", "description", "price", "imgurl", "stock"].map((field) => (
            <div className="col-md-2" key={field}>
              <input
                type={field === "price" || field === "stock" ? "number" : "text"} // number input for price & stock
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)} // placeholder = field name
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          ))}

          {/* Submit button (Add / Update) */}
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit">
              {form._id ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/*  Product List Section */}
      <h2>Products List</h2>
      <div className="row">
        {/* Loop through products array and show each product card */}
        {products.map((p) => (
          <div className="col-md-3 mb-4" key={p._id}>
            <div className="card h-100">
              {/* Product Image */}
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

                {/* Action buttons */}
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
