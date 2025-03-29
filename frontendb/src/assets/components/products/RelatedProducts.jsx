import React from 'react'
import HomeCard from '../home/HomeCard'

const RelatedProducts = ({similar_products = []}) => {
  return (
    <section className="bg-light py-3">
        <div className="container px-4 px-lg-5 mt-3">
            <h2 className="fw-900 mb-4">Related Products</h2>
            <div className="justify-content-center row-cols-md-3 row-cols-xl-4 row gx-4 gx-lg-5 row-cols-2">
              {similar_products.length > 0 ?(
              similar_products.map(product => (<HomeCard key = {product.id} product = {product} />)))
            : <p>No Related products</p>}
            </div>
        </div>
    </section>
  )
}

export default RelatedProducts
