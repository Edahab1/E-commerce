import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cart, setcart] = useState()
  const [cartId, setcartId] = useState(null)

  let headers = { token: localStorage.getItem("userToken") };

  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      )
      .then((res) => res)
      .catch((error) => error);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`,
         { headers })
      .then((res) => res)
      .catch((error) => error);
  }

  function updateCartProductQuantity(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((error) => error);
  }

  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((error) => error);
  }

  function removeAllCartItems() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => res)
      .catch((error) => error);
  }


  async function getCart(){
    let response = await getLoggedUserCart()
    // console.log(response.data.cartId);
    setcart(response.data)
    setcartId(response.data.cartId)
    
    
  }

  useEffect(() => {
    // getCart()
  
    return () => {
      
    }
  }, [])
  

  function checkout(cartId, url, formVal) {
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
        shippingAddress : formVal,
      },{
        headers
      })
      .then((res) => res)
      .catch((error) => error);
  }


  useEffect(() => {
    
  
    return () => {
      
    }
  }, [])
  

  return (
    <>
      <CartContext.Provider
        value={{
          addProductToCart,
          getLoggedUserCart,
          updateCartProductQuantity,
          removeCartItem,
          removeAllCartItems,
          cart,
          setcart,
          checkout,
          cartId,
          setcartId,
        }}
      >
        {props.children}
      </CartContext.Provider>
    </>
  );
}
