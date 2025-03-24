import React from 'react'
import api, { BASE_URL } from '../../../api'

const OrderItem = ({cartitem}) => {
  return (
    <div className="justify-content-between align-items-center mb-3 d-flex" style={{padding:"10px"}}>
        <div className="align-items-center d-flex" style={{gap:"30px"}}>
            <img src={`${BASE_URL}${cartitem.product.image}`} alt="Product" className='img-fluid' 
            style={{width:'60px',height:'60px',objectFit:'cover',borderRadius:"5px"}} />
            <div className="mb-6">
                <h6 className='mb-0'>{cartitem.product.name}</h6>
                <small>Quantity : {cartitem.quantity}</small>
            </div>
        </div>
        <h6>{`Rs ${cartitem.product.price}`}</h6>
    </div>
  )
}

export default OrderItem
