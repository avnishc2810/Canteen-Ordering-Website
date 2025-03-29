import React, { useState ,useEffect} from 'react';
import HomeCard from './HomeCard';
import "./CardContainer.css";

const CardContainer = ({ products }) => {
  const [currentProducts, setCurrentProducts] = useState(products);

  useEffect(() => {
    setCurrentProducts(products.filter(product => product.ispopular == true))
  },[products]); 
  

  function filter_products(category) {
    const categoryMap = {
      1: "Eatables",
      2: "Meals",
      3: "Drinks",
    };

    if (category === 0) {
      setCurrentProducts(products.filter(product => product.ispopular == true))
    } else {
      setCurrentProducts(products.filter(product => product.category === categoryMap[category]));
    }
  }

  return (
    <section className="py-5" id="shop">
      <ul className="d-flex gap-3 list-unstyled justify-content-center">
        <li><button className="btn btn-lg btn-gradient" onClick={() => filter_products(0)}>Popular</button></li>
        <li><button className="btn btn-lg btn-gradient" onClick={() => filter_products(1)}>Eatables</button></li>
        <li><button className="btn btn-lg btn-gradient" onClick={() => filter_products(2)}>Meals</button></li>
        <li><button className="btn btn-lg btn-gradient" onClick={() => filter_products(3)}>Drinks</button></li>
      </ul>

      <div className="container px-4 px-lg-5 mt-5">
        <div className="row justify-content-center">
          {currentProducts.map(product => <HomeCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  );
}

export default CardContainer;
