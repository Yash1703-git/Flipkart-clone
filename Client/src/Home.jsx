import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Footer from "./Footer";

// Popup Component
function ProductPopup({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50"
      style={{ zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow-lg p-4 d-flex flex-column flex-md-row"
        style={{
          width: "90%",
          maxWidth: "650px",
          animation: "slideIn 0.3s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side Image */}
        <div className="flex-shrink-0 me-md-4 text-center">
          <img
            src={product.imgurl}
            alt={product.name}
            className="img-fluid rounded"
            style={{ width: "230px", height: "230px", objectFit: "contain" }}
          />
        </div>

        {/* Right Side Details */}
        <div className="flex-grow-1">
          <h5 className="fw-bold">{product.name}</h5>
          <h6 className="text-success mb-2">₹{product.price}</h6>
          <p className="text-muted" style={{ fontSize: "0.95rem" }}>
            {product.description}
          </p>
          <p className="text-secondary">
            Stock:{" "}
            {product.stock > 0 ? (
              <span className="text-success">{product.stock}</span>
            ) : (
              <span className="text-danger">Out of stock</span>
            )}
          </p>

          {/* Buttons */}
          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-primary"
              disabled={product.stock <= 0}
              onClick={() => onAddToCart(product)}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Add to Cart
            </button>
            <button className="btn btn-outline-danger" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default function Home({ searchTerm }) {
  const api = "http://localhost:5000/api/products";
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(`${api}/list`);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item._id === product._id);
    if (index >= 0) cart[index].quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  // Filter products by search term
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid d-flex flex-column justify-content-center" id="Home">
    {/* Carousel */}
      <div id="carouselExampleIndicators" className="carousel slide container p-0 my-2" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="1500">
            <img src="https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/076c4f2ee87225d7.jpg?q=60" className="d-block w-100 img-fluid" alt="Slide 1" />
          </div>
          <div className="carousel-item" data-bs-interval="1500">
            <img src="https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/5b309e98775e22e4.jpg?q=60" className="d-block w-100 img-fluid" alt="Slide 2" />
          </div>
          <div className="carousel-item" data-bs-interval="1500">
            <img src="https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/8ddecd3ef85da64f.jpeg?q=60" className="d-block w-100 img-fluid" alt="Slide 3" />
          </div>
          <div className="carousel-item" data-bs-interval="1500">
            <img src="https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/b5e1c1f078a81563.jpg?q=60" className="d-block w-100 img-fluid" alt="Slide 4" />
          </div>
          <div className="carousel-item" data-bs-interval="1500">
            <img src="https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/e5ce90a97240ed21.jpeg?q=60" className="d-block w-100 img-fluid" alt="Slide 4" />
          </div>
        </div>

        {/* Prev Button */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon " aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        {/* Next Button */}
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Product Display */}
      <div className="my-2 d-flex flex-wrap gap-3 bg-white align-items-center justify-content-evenly container py-3 rounded">
        {filteredData.length === 0 ? (
          <p className="text-center text-muted mt-3">No products found</p>
        ) : (
          filteredData.map((d, i) => (
            <div
              key={i}
              className="card d-flex flex-column align-items-center px-3 py-2 shadow-sm"
              style={{
                width: "12rem",
                height: "250px",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onClick={() => setSelectedProduct(d)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img src={d.imgurl} className="card-img-top justify-content-start img-fluid w-75"
                style={{ height: "60%", objectFit: "cover" }}
                alt={d.name} 
              />

              <div className="card-body d-flex flex-column justify-content-center align-items-center " style={{height:"40%"}}>
                <p className="card-title text-center">{d.name}</p>
                {/* <p className=" card-subtitle text-center">{d.description}</p> */}
                <p className="card-text fw-bold ">₹{d.price}</p>
              </div>
            </div>
          ))
        )}
      </div>

{/*menu card -2  */}
       <div className=" container my-2 bg-white" >
          <div className="row gap-3 justify-content-around">
            <div className="col-lg-4 col-sm-12 ">
              <p className="" style={{fontSize:"1.2rem",fontWeight:"600"}}>Make your home stylish</p>
              <div className="row mb-2">
                <div className="col-6">
                  <div className="bg-light card d-flex align-items-center p-2" style={{minWidth:"180px",maxWidth:"180px",height:"250px",flex:"0 0 auto"}}>
                    <img src="https://rukminim2.flixcart.com/image/420/420/xif0q/slipper-flip-flop/l/n/k/7-375bg-375bk-375gr-375gry-footup-beige-black-green-grey-original-imahec2pbftahhff.jpeg?q=60" className="img-fluid" style={{height:"160px",width:"100%",objectFit:"contain"}}/>
                    <div className="card-body p-2 text-center">
                      <p className="card-title m-0" style={{fontSize:"14px"}}>Home Temple</p>
                      <p className="card-subtitle text-success m-0" style={{fontSize:"13px"}}>Min. 50% Off</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-light card d-flex align-items-center p-2" style={{minWidth:"180px",maxWidth:"180px",height:"250px",flex:"0 0 auto"}}>
                    <img src="https://rukminim2.flixcart.com/image/420/420/xif0q/t-shirt/e/d/c/xxl-mens-strip-polo-hs-black-red-tb-blue-original-imahfdzkrtqyqtzx.jpeg?q=60" className="img-fluid" style={{height:"160px",width:"100%",objectFit:"contain"}}/>
                    <div className="card-body p-2 text-center">
                      <p className="card-title m-0" style={{fontSize:"14px"}}>Home Temple</p>
                      <p className="card-subtitle text-success m-0" style={{fontSize:"13px"}}>Min. 50% Off</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="bg-light card d-flex align-items-center p-2" style={{minWidth:"180px",maxWidth:"180px",height:"250px",flex:"0 0 auto"}}>
                    <img src="https://rukminim2.flixcart.com/image/420/420/xif0q/sari/p/u/8/free-gold-yellow-saree-hesika-unstitched-original-imahdq2hb9afh42h.jpeg?q=60" className="img-fluid" style={{height:"160px",width:"100%",objectFit:"contain"}}/>
                    <div className="card-body p-2 text-center">
                      <p className="card-title m-0" style={{fontSize:"14px"}}>Home Temple</p>
                      <p className="card-subtitle text-success m-0" style={{fontSize:"13px"}}>Min. 50% Off</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-light card d-flex align-items-center p-2" style={{minWidth:"180px",maxWidth:"180px",height:"250px",flex:"0 0 auto"}}>
                    <img src="https://rukminim2.flixcart.com/image/420/420/xif0q/home-temple/s/x/d/t1white-hoodwin-original-imah99vgphekyteg.jpeg?q=60" className="img-fluid" style={{height:"160px",width:"100%",objectFit:"contain"}}/>
                    <div className="card-body p-2 text-center">
                      <p className="card-title m-0" style={{fontSize:"14px"}}>Home Temple</p>
                      <p className="card-subtitle text-success m-0" style={{fontSize:"13px"}}>Min. 50% Off</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <p className="" style={{fontSize:"1.2rem",fontWeight:"600"}}>Make your home stylish</p>
              <div className="row mb-2">
                <div className="col-6">
                  <div className="bg-light card d-flex align-items-center p-2" style={{minWidth:"180px",maxWidth:"180px",height:"250px",flex:"0 0 auto"}}>
                    <img src="https://rukminim2.flixcart.com/image/420/420/xif0q/home-temple/s/x/d/t1white-hoodwin-original-imah99vgphekyteg.jpeg?q=60" className="img-fluid" style={{height:"160px",width:"100%",objectFit:"contain"}}/>
                    <div className="card-body p-2 text-center">
                      <p className="card-title m-0" style={{fontSize:"14px"}}>Home Temple</p>
                      <p className="card-subtitle text-success m-0" style={{fontSize:"13px"}}>Min. 50% Off</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-light card d-flex align-items-center p-2" style={{minWidth:"180px",maxWidth:"180px",height:"250px",flex:"0 0 auto"}}>
                    <img src="https://rukminim2.flixcart.com/image/420/420/xif0q/bed/g/v/x/single-na-no-synthetic-no-portable-folding-bed-3x6-feet-bed-size-original-imags27jhvtjrkfc.jpeg?q=60" className="img-fluid" style={{height:"160px",width:"100%",objectFit:"contain"}}/>
                    <div className="card-body p-2 text-center">
                      <p className="card-title m-0" style={{fontSize:"14px"}}>Home Temple</p>
                      <p className="card-subtitle text-success m-0" style={{fontSize:"13px"}}>Min. 50% Off</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="bg-light card d-flex align-items-center p-2" style={{minWidth:"180px",maxWidth:"180px",height:"250px",flex:"0 0 auto"}}>
                    <img src="https://rukminim2.flixcart.com/image/420/420/xif0q/home-temple/s/x/d/t1white-hoodwin-original-imah99vgphekyteg.jpeg?q=60" className="img-fluid" style={{height:"160px",width:"100%",objectFit:"contain"}}/>
                    <div className="card-body p-2 text-center">
                      <p className="card-title m-0" style={{fontSize:"14px"}}>Home Temple</p>
                      <p className="card-subtitle text-success m-0" style={{fontSize:"13px"}}>Min. 50% Off</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-light card d-flex align-items-center p-2" style={{minWidth:"180px",maxWidth:"180px",height:"250px",flex:"0 0 auto"}}>
                    <img src="https://rukminim2.flixcart.com/image/420/420/xif0q/sofa-bed/d/h/7/double-182-4-seater-grey-jute-182-no-6-4-seater-6x6-size-jute-original-imahc5ff3ha9vgzd.jpeg?q=60" className="img-fluid" style={{height:"160px",width:"100%",objectFit:"contain"}}/>
                    <div className="card-body p-2 text-center">
                      <p className="card-title m-0" style={{fontSize:"14px"}}>Home Temple</p>
                      <p className="card-subtitle text-success m-0" style={{fontSize:"13px"}}>Min. 50% Off</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-12">
              <img src="https://rukminim2.flixcart.com/www/1060/1440/promos/26/09/2023/6c3c5fe2-c236-4fa2-8d97-595e1e01da01.jpg?q=60" className=" img-fluid"/> 
            </div>
          </div>
        </div>

      {/* Product Popup */}
      <ProductPopup
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      {/* vertical prodct display */}

      <Footer/>
    </div>
  );
}
