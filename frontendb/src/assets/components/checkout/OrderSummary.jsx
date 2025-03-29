import React from 'react'
import OrderItem from './OrderItem'
import styles from "./OrderSummary.module.css"

const OrderSummary = ({cartItems,cartTotal,tax}) => {
    const roundedTotal = (cartTotal + tax).toFixed(2);

  return (
    <div className='col-md-8'>
        <div className={`card mb-4 ${styles.card}`}>
            <div className="class-header" style={{background: "linear-gradient(135deg, #6A11CB, #2575FC)", color:"white",padding:"10px"}}>
                <h5>Card Summary</h5>
            </div>
            <div className="card-body">
                <div className="px-3" style={{height:"300px",overflow:"auto"}}>
                    
                    {cartItems.map(cartitem => <OrderItem key={cartitem.id} cartitem={cartitem}/>)}
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <h6>Total</h6>
                    <h6>{`Rs ${roundedTotal}`}</h6>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default OrderSummary
