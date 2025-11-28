// src/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ onLogout, onSearch }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login", { replace: true });
  };

  // const handleSearch = (e) => {
  //   const value = e.target.value;
  //   setSearchValue(value);
  //   if (onSearch) onSearch(value); // 🔍 send value to App.jsx
  // };

  return (
    <div className="container-fluid py-2 d-flex justify-content-center w-100 mt-2 ">
      <div className="row container align-items-center">

        {/* Logo */}
        <div className="col-6 col-lg-2 d-flex justify-content-start">
          <Link to="/" className="navbar-brand me-3">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
              alt="logo"
            />
          </Link>
        </div>

        {/* Search Bar */}
          <div className="col-12 col-lg-6 mt-2 mt-lg-0">
            <form
              className="d-flex justify-content-center"
              onSubmit={(e) => {
                e.preventDefault();
                if (onSearch) onSearch(searchValue);
              }}
            >
              <div className="position-relative w-100">
                <i
                  className="bi bi-search position-absolute top-50 start-0 translate-middle-y ps-3 text-black"
                  style={{ fontSize: "1.2rem", cursor: "pointer" }}
                  onClick={() => onSearch && onSearch(searchValue)}
                ></i>

                <input
                  className="form-control ps-5 bg-body-secondary"
                  type="search"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    if (onSearch) onSearch(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>


        {/* Right side */}
        <div className="col-6 col-lg-4 d-flex justify-content-between align-items-center gap-3 mt-2 mt-lg-0">
          {user && (
            <div className="d-flex align-items-center gap-2">
              <span>Hello, <strong>{user.name}</strong></span>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          )}

          {/* Cart */}
          <button className="btn btn-primary d-flex align-items-center" onClick={() => navigate("/cart")}>
            <i className="bi bi-cart fs-5"></i>
            <span className="ms-1">Cart</span>
          </button>

          {/* Become a sellar */}
          <button className="btn btn-primary d-flex align-items-center nav-item text-white fw-medium">
            <i className="bi bi-shop fw-medium fs-5"></i>
            <span className="ms-1">Seller</span>
          </button>

          {/* More Dropdown */}
            <div className="dropdown">
              <button className="btn btn-primary d-flex align-items-center nav-item text-white fw-medium" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots-vertical fw-medium fs-5"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end mt-3" style={{fontSize:"14px"}}>
                <li>
                  <a className="dropdown-item d-flex gap-2" href="#">
                    <i className="bi bi-bell"></i>
                    <span>Notification Preferences</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item d-flex gap-2" href="#">
                    <i className="bi bi-headset"></i>
                    <span>24x7 Support</span>
                  </a>
                </li>
                <li>
                <a className="dropdown-item d-flex gap-2" href="#">
                  <span>Advertisement</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item d-flex gap-2" href="#">
                  <i className="bi bi-download"></i>
                    <span>Download The App</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
 