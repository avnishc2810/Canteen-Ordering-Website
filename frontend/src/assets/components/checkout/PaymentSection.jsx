import React from 'react'
import styles from "./PaymentSection.module.css"
import api from '../../../api'
import { useEffect } from "react";


const PaymentSection = () => {
  const cart_code = localStorage.getItem("cart_code")



  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);



  function makePayment() {
    api.post("initiate_payment/", { cart_code })
      .then(res => {
        console.log(res.data);

        if (res.data.order_id) {
          const options = {
            key: res.data.razorpay_key,
            amount: res.data.amount,
            currency: res.data.currency,
            order_id: res.data.order_id,
            name: "META CANTEEN",
            description: "Order Payment",
            handler: function (response) {
              // Redirect with payment details for verification
              window.location.href = `/payment-status?razorpay_payment_id=${response.razorpay_payment_id}&razorpay_order_id=${response.razorpay_order_id}&razorpay_signature=${response.razorpay_signature}`;
            },
            prefill: {
              email: "user@example.com",
              contact: "9999999999",
            },
            theme: {
              color: "#6050DC",
            }
          };

          const razor = new window.Razorpay(options);
          razor.open();
        }
      })
      .catch(err => {
        console.error("Payment Error:", err.message);
      });
  }



  return (
    <div className='col-md-4'>
      <div className={`card ${styles.card}`}>
        <div className="card-header" style={{ background: "linear-gradient(135deg, #6A11CB, #2575FC)", color: "white" }}>
          <h5>Payment Options</h5>
        </div>
        <div className="card-body">
          <button className="btn btn-primary w-100 mb-3" style={{ background:"linear-gradient(135deg, #0096FF, #00008B)", color: "white" }} id="paypal-button" onClick={makePayment}>
            <i className='bi bi-paypal'></i>Pay with Razorpay
          </button>
        </div>
      </div>

    </div>
  )
}

export default PaymentSection


