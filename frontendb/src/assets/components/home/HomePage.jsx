import React, { useEffect, useState } from 'react'
import Header from './Header'
import CardContainer from './CardContainer'
import api from '../../../api'
import { randomValue } from '../../../GenerateCode'

const HomePage = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (localStorage.getItem("cart_code") === null) {
            localStorage.setItem("cart_code", randomValue)
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        api.get("products")

            .then(res => {
                console.log(res.data)
                setProducts(res.data)
                setLoading(false);
            })
            .catch(err => {
                console.log(err.message);
                setLoading(false);
            })
    }, [])


    return (
        <>
            <Header />
            <CardContainer products={products} />
        </>
    )
}
export default HomePage
