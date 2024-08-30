// import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  const [wishlistDetails, setwishlistDetails] = useState([]);
  const [loading, setloading] = useState(true);
  const [currentId, setcurrentId] = useState();
  // const [addedWishlist, setaddedWishlist] = useState();

  let { getLoggedUserWishlist, removeWishlistItem } =
    useContext(WishlistContext);

  const { addProductToCart, setcart } = useContext(CartContext);

  async function addToCart(id) {
    setloading(true);
    setcurrentId(id);
    let response = await addProductToCart(id);

    if (response.data.status == "success") {
      setloading(false);
      setcart(response.data);
      //show succes message
      toast.success(response.data.message, {
        style: { backgroundColor: "#05992c", color: "white" },
        position: "bottom-right",
      });
    } else {
      setloading(false);
      // show error message
      toast.error(response.data.message);
    }
  }

  async function getWishlistItems() {
    let response = await getLoggedUserWishlist();
    // console.log(response.data.data);
    if (response.data.status == "success") {
      // console.log(response.data.data);
      setwishlistDetails(response.data.data);
      setloading(false);
    } else {
      setloading(false);
      toast.error("error updating wishlist");
    }
  }

  async function removeItemFromWishlist(productId) {
    let response = await removeWishlistItem(productId);

    if (response.data.status == "success") {
      setwishlistDetails(response.data.data)
      console.log(wishlistDetails);
      toast.success(response.data.message, {
        style: { backgroundColor: "#05992c", color: "white" },
        position: "bottom-right",
      });
    } else {
      toast.error("error updating wishlist");
    }
  }


useEffect(() => {
  
  getWishlistItems()
  

  return () => {
  }
}, [getWishlistItems, removeItemFromWishlist])


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Wishlist</title>
      </Helmet>
      {wishlistDetails?.length > 0 ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-green-600 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Purchase
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishlistDetails?.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4 justify-center flex">
                      <img
                        src={product.imageCover}
                        className="w-12 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 max-w-32 font-semibold text-gray-900 dark:text-white">
                      {product.title}
                    </td>
                    <td className="px-6 py-4 max-w-32 font-semibold text-gray-900 dark:text-white">
                      {product.price} EGP
                    </td>
                    <td className="px-6 py-4 max-w-32 font-semibold text-gray-900 dark:text-white">
                      <a
                        onClick={() => addToCart(product.id)}
                        className="text-white cursor-pointer bg-emerald-600 px-4 py-2 rounded-md"
                      >
                        {loading && currentId == product.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          "Add to Cart"
                        )}
                      </a>
                    </td>
                    <td className="px-6 py-3">
                      <a
                        onClick={() => removeItemFromWishlist(product.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : 
        <h1 className=" border border-gray-300 text-gray-500 h-[60vh] text-4xl flex justify-center items-center font-bold">
          No Items added to Wishlist
        </h1>
      }
    </>
  );
}
