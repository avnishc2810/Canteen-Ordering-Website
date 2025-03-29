import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import useCartData from '../hooks/useCartData'
import Spinner from '../ui/Spinner'

const CartPage = ({setNumCartItems}) => {
    const {cartItems,setCartItems,cartTotal,setCartTotal,tax,loading} = useCartData()


    if (cartItems.length < 1) {
        return (<div class="alert alert-primary" role="alert">
            You haven't added any items to Cart!
        </div>)
    }

    if(loading){
        return <Spinner loading={loading}/>
    }

    return (
        <div className="container py-3 my-3" style={{ overflow: "scroll", height: "80vh" }}>
            <h5 className="mb-4">Shopping Cart</h5>
            <div className="row">
                <div className="col-md-8">
                    {cartItems.map(item => <CartItem key={item.id} item={item} setCartTotal={setCartTotal} 
                    cartItems={cartItems} setNumCartItems={setNumCartItems} setCartItems={setCartItems} />)}
                </div>
                <CartSummary cartTotal={cartTotal} tax={tax} />
            </div>
        </div>
    )
}

export default CartPage
