import React, { useState } from 'react'
import api, { BASE_URL } from '../../../api'
import { toast } from 'react-toastify'

const CartItem = ({ item, setCartTotal, cartItems, setNumCartItems, setCartItems }) => {
    const [quantity, setQuantity] = useState(item.quantity)

    const itemData = { quantity: quantity, item_id: item.id }
    const itemID = { item_id: item.id }

    console.log(cartItems)


    function updateCartItem() {
        api.patch("update_quantity/", itemData)
            .then(res => {
                console.log(res.data)
                setCartTotal(cartItems.map((CartItem) => CartItem.id === item.id ? res.data.data : CartItem)
                    .reduce((acc, curr) => acc + curr.total, 0))
                setNumCartItems(cartItems.map((CartItem) => CartItem.id === item.id ? res.data.data : CartItem)
                    .reduce((acc, curr) => acc + curr.quantity, 0))

                toast.success("Cart Item Updated Successfully!")

            })
            .catch(err => {
                console.log(err.message)
            })
    }

    // remove button 

    function removeCartItem() {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?")

        if (confirmDelete) {
            api.post("delete_cartitem/", itemID)
                .then(res => {
                    console.log(res.data)
                    setCartItems(cartItems.filter(cartitem => cartitem.id != item.id))
                    setCartTotal(cartItems.filter((cartitem) => cartitem.id != item.id)
                        .reduce((acc, curr) => acc + curr.total, 0))
                    setNumCartItems(cartItems.filter((cartitem) => cartitem.id != item.id)
                        .reduce((acc, curr) => acc + curr.quantity, 0))
                    toast.success('Item removed from Cart')
                })
                .catch(err => {
                    console.log(err.message)
                })
        }


    }


    return (
        <div className="col-md-12">
            <div className="cart-item d-flex align-items-center mb-3 p-3"
                style={{ backgroundColor: 'f8f9fa', borderRadius: '8px' }}
            >
                <img src={`${BASE_URL}${item.product.image}`} alt="Product Image" className="img-fluid"
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />
                <div className="flex-grow-1 ms-3">
                    <h5 className="mb-1">{item.product.name}</h5>
                    <p className="text-muted mb-0">{`Rs${item.product.price}`}</p>
                </div>
                <div className="align-items-center d-flex">
                    <input type="number" min="1" onChange={e => setQuantity(e.target.value)} className='form-control me-3'
                        defaultValue={quantity} style={{ width: '70px' }} />
                    <button className="btn mx-3 btn-sm" onClick={updateCartItem} style={{ backgroundColor: "#6050DC", color: "white" }}>Update</button>
                    <button className="btn btn-danger btn-sm" onClick={removeCartItem}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
