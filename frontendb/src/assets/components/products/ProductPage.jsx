import React, { useEffect, useState } from 'react'
import RelatedProducts from './RelatedProducts'
import { useParams } from 'react-router-dom'
import api from '../../../api'
import { BASE_URL } from '../../../api'
import { toast } from 'react-toastify'

const ProductPage = ({setNumCartItems}) => {

    const { slug } = useParams()
    const [product, setProduct] = useState({})
    const [similar_products, setSimilar_product] = useState([])
    const [inCart, setInCart] = useState(false)
    const cart_code = localStorage.getItem("cart_code")

    useEffect(function () {
        if (product.id) {
            api.get(`product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
                .then(res => {
                    console.log(res.data)
                    setInCart(res.data.product_in_cart)
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }, [cart_code, product.id])



    useEffect(function () {
        api.get(`product_detail/${slug}`)
            .then(response => {
                console.log(response.data);
                setSimilar_product(response.data.similar_product)
                setProduct(response.data)

            })
            .catch(err => {
                console.log(err.message)
            })
    }, [slug])


    const newItem = { "cart_code": cart_code, product_id: product.id }
    function add_item() {
        api.post("add_item/", newItem)
            .then(response => {
                console.log(response.data)
                setInCart(true)
                setNumCartItems(curr => curr + 1)
                toast.success("Item added to cart!")
            })
            .catch(err => {
                console.log(err.message)
            })
    }


    return (
        <div>
            <section className="py-3">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="align-items-center gx-4 gx-lg-5 row">
                        <div className="col-md-6">
                            <img className='card-img-top mb-5 mb-md-0' src={`${BASE_URL}${product.image}`} alt="..." />
                        </div>
                        <div className="col-md-6">
                            <div className="small mb-1">{product.id}</div>
                            <h1 className="fw-bolder display-5">{product.name}</h1>
                            <div className="fs-5 mb-5">
                                <span>{`Rs${product.price}`}</span>
                            </div>
                            <p className="lead">{product.description}</p>
                            <div className="d-flex">
                                {/* <input type="number" value="1" id='inputQuantity'
                                    className='form-control text-center me-3' style={{ maxWidth: "3rem" }} /> */}
                                <button className="btn-outline-dark flex-shrink-0 btn" type='button'
                                    onClick={add_item} disabled={inCart}>
                                    <i className='bi-cart-fill me-1'></i>
                                    {inCart ? "Product added to cart" : "Add to Cart"}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <RelatedProducts similar_products={similar_products} />
        </div>
    )
}

export default ProductPage
