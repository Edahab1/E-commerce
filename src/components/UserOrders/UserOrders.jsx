import React, { useEffect, useState } from "react";
// import style from "./UserOrders.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UserOrders() {
  const [userOrders, setuserOrders] = useState();
  const [userDetails, setuserDetails] = useState();

  const { id } = useParams();

  async function getUserOrders() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          setuserOrders(res.data);
          setuserDetails(res.data[0].user);
        }
      })
      .catch((err) => err);
  }

  useEffect(() => {
    return () => {
      getUserOrders();
    };
  }, []);

  return (
    <>
      {/* display selected user contact details */}
      <div className="text-4xl py-4 font-semibold font-mono">User Details</div>
      <table className="border-4 w-1/3">
        <tr className="odd:bg-slate-300 even:bg-white-200">
          <th className="ps-3 py-2">User Name: </th>
          <td className="px-5">{userDetails?.name}</td>
        </tr>
        <tr className="odd:bg-slate-300 even:bg-white-200">
          <th className="ps-3 py-2">User Email: </th>
          <td className="px-5">{userDetails?.email}</td>
        </tr>
        <tr className="odd:bg-slate-300 even:bg-white-200">
          <th className="ps-3 py-2">User Phone: </th>
          <td className="px-5">{userDetails?.phone}</td>
        </tr>
      </table>

      <h1 className="text-center my-4 text-emerald-600 font-bold text-2xl">
        Past Orders
      </h1>

      {/* selected user past orders display area */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
          <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
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
            {userOrders?.map((order) => (
              <tr
                key={order._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-200 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <p>{order.id}</p>
                </th>
                <td className="px-6 py-4">
                  {order.cartItems.map((item) => (
                    <p className="py-2">
                      {item.product.title.split(" ").slice(0, 2).join(" ")}
                    </p>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {order.cartItems.map((item) => (
                    <p className="py-2">{item.product.brand.name}</p>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {order.cartItems.map((item) => (
                    <p className="py-2">{item.product.category.name}</p>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {order.cartItems.map((item) => (
                    <p className="py-2">{item.price} EGP</p>
                  ))}
                </td>
                <td className="px-6 py-4 font-bold text-xl text-green-600 border-x-2">
                  {order.totalOrderPrice} EGP
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
