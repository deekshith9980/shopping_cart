import React,{ useContext, useReducer } from 'react'
import { createContext } from 'react';
import { faker } from '@faker-js/faker';
import { cartReducer } from './Reducers';
const Cart = createContext();
faker.seed(99);

const Context = ({children}) => {
    const products = [...Array(40)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
        inStock: faker.datatype.number({min: 0, max: 100}),
        fastDelivery: faker.datatype.boolean(),
        rating: faker.datatype.number({min: 0, max: 5}),
    }));
    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: []
    });

    const [productState, productDispatch] = useReducer(productReducer,{
      byStock: false,
      byFastDelivery: false,
      byRating: 0,
      searchQuery: "",
    });

  return (
   <Cart.Provider value={{state,dispatch,productState,productDispatch}}>
        {children}
    </Cart.Provider>
  )
}

export default Context

export const CartState = () => {
  return useContext(Cart);
}

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return {...state, sort: action.payload};
    case "FILTER_BY_STOCK":
      return {...state, byStock: !state.byStock};
    case "FILTER_BY_DELIVERY":
      return {...state, byFastDelivery: !state.byFastDelivery};  
    case "FILTER_BY_RATING":
      return {...state, byStock: action.payload};  
    case "FILTER_BY_SEARCH":
      return {...state, searchQuery: action.payload};
    case "CLEAR_FILTERS":
      return {
      byStock: false,
      byFastDelivery: false,
      byRating: 0,
      searchQuery: "",
      };
    default:
      return state;  
  }
};
