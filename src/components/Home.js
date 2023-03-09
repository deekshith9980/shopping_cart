import React from 'react';
import { CartState } from '../context/Context';
import Filters from './Filters';
import Product from './Product';
import "./styles.css";

const Home = () => {
  const {
    state: {products},
    productState:{byStock,byFastDelivery,sort,byRating, searchQuery},
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if(sort){
      sortedProducts = sortedProducts.sort((a,b) => 
        sort === 'lowToHigh'? a.price - b.price : b.price - a.price
      );
    }

    if(!byStock){
      sortedProducts = sortedProducts.filter((prod)=> prod.inStock);
    }

    if(byFastDelivery){
      sortedProducts = sortedProducts.filter((prod)=> prod.fastDelivery);
    }

    if(byRating){
      sortedProducts = sortedProducts.filter((prod) => prod.rating >= byRating);
    }

    if(searchQuery){
      sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return sortedProducts;
  }
  return (
    <div className="home">
      <Filters />
      <div className='productsContainer'>
        {transformProducts().map((prod )=> {
            return <Product key={prod.id} product={prod} />
        })}
    </div>
  </div>
    
  );
}

export default Home;
