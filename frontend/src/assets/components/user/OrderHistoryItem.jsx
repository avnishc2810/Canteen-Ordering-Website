import React from 'react'
import styles from "./OrderHistoryItem.module.css"
import api, { BASE_URL } from '../../../api'

const OrderHistoryItem = ({orderitem}) => {
  return (
    <div className="card-body">
        <div className={`order-item mb-3 ${styles.OrderItem}`}>
            <div className="row">
                <div className="col-md-2">
                    <img src={`${BASE_URL}${orderitem.product.image}`} alt="Order Item" className='img-fluid' 
                    style={{borderRadius:'5px'}}/>

                </div>
                <div className="col-md-6">
                    <h6>{orderitem.product.name}</h6>
                    <p>{`Order Date:${orderitem.order_date.split("T")[0]}`}</p>
                    <p>{`Order ID:${orderitem.order_id}`}</p>
                </div>
                <div className="col-md-2 text-center">
                    <h6 className="text-muted">{`Quantity : ${orderitem.quantity}`}</h6>
                </div>
                <div className="col-md-2 text-center">
                    <h6 className="text-muted">{`Rs ${orderitem.product.price}`}</h6>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default OrderHistoryItem
