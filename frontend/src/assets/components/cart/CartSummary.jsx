import React from 'react'
import { Link } from 'react-router-dom'
const CartSummary = ({cartTotal,tax}) => {
    const Subtotal = cartTotal
    const Tax = tax
    const total = Subtotal + Tax
    
  return (
    <div className="align-self-start col-md-4">
        <div className="card">
            <div className="card-body">
                <h5 className="class-title">Cart Summary</h5>
                <hr />
                <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>{`Rs ${Subtotal}.00`}</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Tax</span>
                    <span>{`Rs ${Tax}.00`}</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Total</span>
                    <span>{`Rs ${total}.00`}</span>
                </div>
                <Link to = "/checkout">
                <button className="btn btn-primary w-100" style={{background: "linear-gradient(135deg,rgb(40, 120, 59),rgb(6, 112, 45))",borderColor:"#6050DC"}}>
                    Proceed To Checkout
                </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default CartSummary
