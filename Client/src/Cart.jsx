import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api"; // adjust path

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState(""); // ✅ new success message state

  const user = JSON.parse(sessionStorage.getItem("user")) || null;
  const API_URL = `${API_BASE_URL}/api/orders`;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [cart]);

  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place an order!");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      orderId: "ORD-" + Date.now(),
      customerName: user.name,
      customerEmail: user.email,
      totalAmount: total,
      products: cart.map((item) => ({
        productName: item.name,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      })),
    };

    try {
      await axios.post(API_URL, orderData);
      setMessage("✅ Thank you! Your order has been placed successfully.");
      localStorage.removeItem("cart");
      setCart([]);

      // Clear message after few seconds
      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      console.error("Order Error:", error);
      alert("Failed to place order. Please try again later.");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">🛒 Your Cart</h2>

      {/* ✅ Success message display */}
      {message && (
        <div className="alert alert-success text-center fw-bold" role="alert">
          {message}
        </div>
      )}

      {cart.length === 0 ? (
        <h5 className="text-center text-muted">Your cart is empty.</h5>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cart.map((item) => (
              <div
                key={item._id}
                className="card mb-3 p-3 d-flex flex-row align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.imgurl}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <div>
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-1 text-muted">₹ {item.price}</p>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => decreaseQty(item._id)}
                      >
                        −
                      </button>
                      <span className="fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => increaseQty(item._id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <p className="fw-bold mb-2">
                    ₹ {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>Order Summary</h5>
              <hr />
              <p className="d-flex justify-content-between">
                <span>Total Items:</span> <span>{cart.length}</span>
              </p>
              <p className="d-flex justify-content-between">
                <span>Total Price:</span> <span>₹ {total.toFixed(2)}</span>
              </p>
              <hr />
              <button
                className="btn btn-success w-100"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
