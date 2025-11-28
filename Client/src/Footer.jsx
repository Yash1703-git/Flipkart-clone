import React from "react";

export default function Footer(){
    return(
       <div className="container-fluid bg-dark text-light mt-5 pt-4 pb-4" style={{fontSize:"14px"}}>
      <div className="row">
        {/* About */}
        <div className="col-6 col-md-2 mb-3">
            <h6 className="text-uppercase mb-3" style={{fontSize:"13px"}}>ABOUT</h6>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Contact Us</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">About Us</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Careers</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Flipkart Stories</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Press</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Corporate Information</a></p>
        </div>

        {/* Group Companies */}
        <div className="col-6 col-md-2 mb-3">
            <h6 className="text-uppercase mb-3" style={{fontSize:"13px"}}>Group Companies</h6>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Myntra</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Cleartrip</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Shopsy</a></p>
        </div>
        {/* Help */}
          <div className="col-6 col-md-2 mb-3">
            <h6 className="text-uppercase mb-3" style={{fontSize:"13px"}}>Help</h6>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Payments</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Shipping</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Cancellation & Returns</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">FAQ</a></p>
        </div>

          {/* Consumer Policy */}
          <div className="col-6 col-md-2 mb-3">
            <h6 className="text-uppercase mb-3" style={{fontSize:"13px"}}>Consumer Policy</h6>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Cancellation & Returns</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Terms Of Use</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Security</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Privacy</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Sitemap</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">Grievance Redressal</a></p>
            <p className="m-0"><a href="#" className="text-light text-decoration-none">EPR Compliance</a></p>
          </div>

          {/* Mail Us */}
          <div className="col-12 col-md-2 mb-3">
            <h6 className="text-uppercase mb-3" style={{fontSize:"13px"}}>Mail Us:</h6>
            <p className="m-0">Flipkart Internet Private Limited,</p>
            <p className="m-0">Buildings Alyssa, Begonia & Clove Embassy Tech Village,</p>
            <p className="m-0">Outer Ring Road, Devarabeesanahalli Village,</p>
            <p className="m-0">Bengaluru, 560103,</p>
            <p className="m-0">Karnataka, India</p>
            <div className="d-flex gap-2 mt-2">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter-x"></i>
              <i className="bi bi-youtube"></i>
              <i className="bi bi-instagram"></i>
            </div>
          </div>

          {/* Registered Office */}
          <div className="col-12 col-md-2 mb-3">
            <h6 className="text-uppercase mb-3" style={{fontSize:"13px"}}>Registered Office Address:</h6>
            <p className="m-0">Flipkart Internet Private Limited,</p>
            <p className="m-0">Buildings Alyssa, Begonia & Clove Embassy Tech Village,</p>
            <p className="m-0">Outer Ring Road, Devarabeesanahalli Village,</p>
            <p className="m-0">Bengaluru, 560103,</p>
            <p className="m-0">Karnataka, India</p>
            <p className="m-0">CIN : U51109KA2012PTC066107</p>
            <p className="m-0">Telephone: <span className="text-primary">044-45614700 / 044-67415800</span></p>
          </div>
        </div>
      {/* Bottom Strip */}
      <div className="border-top border-secondary mt-3 pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex flex-wrap gap-3 mb-2 mb-md-0">
          <span><i className="bi bi-shop-window text-warning"></i> Become a Seller</span>
          <span>Advertise</span>
          <span><i className="bi bi-gift text-warning"></i> Gift Cards</span>
          <span><i className="bi bi-question-circle text-warning"></i> Help Center</span>
        </div>
        <p className="m-0">© 2007-2025 Flipkart.com</p>
        <div className="d-flex gap-2 mt-2 mt-md-0">
          <img src="https://img.icons8.com/color/36/visa.png"/>
          <img src="https://img.icons8.com/color/36/mastercard.png"/>
          <img src="https://img.icons8.com/color/36/amex.png"/>
          <img src="https://img.icons8.com/color/36/discover.png"/>
          <img src="https://img.icons8.com/color/36/rupay.png"/>
          <img src="https://img.icons8.com/color/36/cash-on-delivery.png"/>
        </div>
      </div>
   </div>
    )
}