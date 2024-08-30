import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null);
  const [loading, setloading] = useState(true);

  let {
    getLoggedUserCart,
    updateCartProductQuantity,
    removeCartItem,
    removeAllCartItems,
    setcart,
  } = useContext(CartContext);

  async function getCartItems() {
    let response = await getLoggedUserCart();
    // console.log(response.data);
    setloading(true);
    if (response.data.status == "success") {
      // console.log(response.data.data);
      setcartDetails(response.data.data);
      setloading(false);
    } else {
      setloading(false);
    }
  }

  async function updateProduct(id, count) {
    if (count == 0) {
      removeItem(id);
    } else {
      let response = await updateCartProductQuantity(id, count);
      // console.log(response.data);
      if (response.data.status == "success") {
        setcartDetails(response.data.data);
        setcart(response.data);
        toast.success("Cart updated Successfully");
      } else {
        toast.error("error updating Cart");
      }
    }
  }

  async function removeItem(id) {
    let response = await removeCartItem(id);
    // console.log(response.data.data);
    if (response.data.status == "success") {
      setcartDetails(response.data.data);
      setcart(response.data);
      toast.success("Cart updated Successfully");
    } else {
      toast.error("error updating Cart");
    }
  }

  async function removeAllItems() {
    let response = await removeAllCartItems();
    // console.log(response.data);
    if (response.data.message == "success") {
      setcartDetails();
      setcart(response.data);
      toast.success("Cleared all cart items");
    } else {
      toast.error("error clearing Cart");
    }
  }

  useEffect(() => {
    getCartItems();
    return () => {};
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      <h1 className="text-green-600 text-2xl font-bold py-6">Shop Now</h1>

      {loading ? (
        <div className="sk-chase mx-auto">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      ) : cartDetails?.products.length > 0 ? (
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
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.products.map((product) => (
                  <tr
                    key={product?.product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4 justify-center flex">
                      <img
                        src={product?.product.imageCover}
                        className="w-12 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 max-w-32 font-semibold text-gray-900 dark:text-white">
                      {product?.product.title}
                    </td>
                    <td className="ps-10 pe-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            updateProduct(
                              product.product.id,
                              product.count - 1
                            );
                          }}
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">{product.count}</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <span>{product.count}</span>
                        <button
                          onClick={() => {
                            updateProduct(
                              product.product.id,
                              product.count + 1
                            );
                          }}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price * product.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <a
                        onClick={() => removeItem(product?.product.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <td
                  className="px-10 py-3 font-bold text-2xl"
                  scope="row"
                  colSpan={3}
                >
                  <h1 className="flex justify-center">Total Price:</h1>
                </td>
                <td className=" py-3 font-bold text-2xl " scope="row">
                  <h1>{cartDetails?.totalCartPrice} EGP</h1>
                </td>
                <td className="px-3 py-4 text-center">
                  <a
                    className="font-bold text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                    onClick={removeAllItems}
                  >
                    Clear All
                  </a>
                </td>
              </tfoot>
            </table>
          </div>
          <div className="flex text-center bg-red-50">
            <Link
              to={"/checkout"}
              class="bg-green-600 w-full text-white py-3 px-6 text-2xl"
            >
              Check out
            </Link>
          </div>
        </>
      ) : (
        <h1 className=" border border-gray-300 text-gray-500 h-[60vh] text-4xl flex justify-center items-center font-bold">
          Cart is Empty
        </h1>
      )}
    </>
  );
}
