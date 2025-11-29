import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle order complete
  const handleComplete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`); // ✅ remove from DB
      setOrders((prev) => prev.filter((o) => o._id !== orderId)); // ✅ remove from UI
      alert("✅ Order completed successfully!");
    } catch (error) {
      console.error("Error completing order:", error);
      alert("❌ Failed to complete order!");
    }
  };

  // Handle order dismiss
  const handleDismiss = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`); // ✅ remove from DB
      setOrders((prev) => prev.filter((o) => o._id !== orderId)); // ✅ remove from UI
      alert("🗑️ Order dismissed successfully!");
    } catch (error) {
      console.error("Error dismissing order:", error);
      alert("❌ Failed to dismiss order!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="d-flex w-100 bg-info align-items-center flex-column gap-3 py-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg card w-50 shadow bg-white"
            >
              <h3 className="font-bold">Order ID: {order.orderId}</h3>
              <p>Customer: {order.customerName}</p>
              <p>Email: {order.customerEmail}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>

              <h4 className="mt-2 font-semibold">Products:</h4>
              <ul className="list-disc ml-6">
                {order.products.map((p, index) => (
                  <li key={index}>
                    {p.productName} - Qty: {p.quantity} | ₹{p.totalPrice}
                  </li>
                ))}
              </ul>

              {/* ✅ Action Buttons */}
              <div className="mt-3 d-flex gap-2">
                <button
                  onClick={() => handleComplete(order._id)}
                  className="btn btn-success"
                >
                  ✅ Complete
                </button>
                <button
                  onClick={() => handleDismiss(order._id)}
                  className="btn btn-danger"
                >
                  ❌ Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
