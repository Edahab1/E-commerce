import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Allorders() {
  const [allOrders, setallOrders] = useState([]);

  async function getAllorders() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/`)
      .then((res) => {
        console.log(res.data.data);
        setallOrders(res.data.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getAllorders();

    return () => {
    };
  }, []);

  return (
    <>
      <h1 className="font-bold text-4xl py-3 mb-5 text-center tracking-wider text-green-600 underline">
        Store Orders History
      </h1>
        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3  w-1/6">
                    Order ID
                </th>
                <th scope="col" className="px-6 py-3  w-1/6">
                    Ordered Items
                </th>
                <th scope="col" className="px-6 py-3  w-1/6">
                    Brand
                </th>
                <th scope="col" className="px-6 py-3  w-1/6">
                Category
                </th>
                <th scope="col" className="px-6 py-3  w-1/6">
                    Price
                </th>
                <th scope="col" className="px-6 py-3  w-1/6">
                    Total Price
                </th>
            </tr>
        </thead>
        <tbody>
        {allOrders?.map((order)=>(
            <tr key={order._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <p>{order.id}</p>
                    <Link to={`/user/${order.user._id}`} className="inline-flex items-center rounded-md bg-blue-100 px-3 py-1 my-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-blue-700/10">view</Link>
                </th>
                <td className="px-6 py-4">
                    {order.cartItems.map((item)=> <p className="py-2">{item.product.title.split(" ").slice(0, 2).join(" ")}</p>)}
                </td>
                <td className="px-6 py-4">
                {order.cartItems.map((item)=> <p className="py-2">{item.product.brand.name}</p>)}
                </td>
                <td className="px-6 py-4">
                {order.cartItems.map((item)=> <p className="py-2">{item.product.category.name}</p>)}
                </td>
                <td className="px-6 py-4">
                {order.cartItems.map((item)=> <p className="py-2">{item.price} EGP</p>)}
                </td>
                <td className="px-6 py-4 font-bold text-xl text-green-600 border-x-2">
                {order.totalOrderPrice} EGP
                </td>
            </tr>))}
        </tbody>
    </table>
</div>

      
    </>
  );
}
