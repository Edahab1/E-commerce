import axios from "axios";
import { createContext, useEffect } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {

  let headers = { token: localStorage.getItem("userToken") };

  function addProductToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then((res) => res)
      .catch((error) => error);
  }

  function getLoggedUserWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => res)
      .catch((error) => error);
  }

  function removeWishlistItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((error) => error);
  }

  useEffect(() => {

    return () => {};
  }, []);

  return (
    <>
      <WishlistContext.Provider
        value={{
          addProductToWishlist,
          getLoggedUserWishlist,
          removeWishlistItem,
        }}
      >
        {props.children}
      </WishlistContext.Provider>
    </>
  );
}
