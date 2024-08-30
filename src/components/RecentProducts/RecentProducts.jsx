import React, { useContext, useEffect, useState } from "react";
// import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function RecentProducts() {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState();
  const [addedWishlist, setaddedWishlist] = useState(false);

  const { addProductToCart, setcart } = useContext(CartContext);
  const { addProductToWishlist } = useContext(WishlistContext);

  async function getProducts() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        // console.log(res.data.data);
        setproducts(res.data.data);
        setcart(res.data.numOfCartItems);
      })
      .catch((err) => {
        console.log("error");
      });
  }

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

  async function addToWishlist(id) {
    setcurrentId(id);

    let response = await addProductToWishlist(id);

    if (response.data.status == "success") {
      setaddedWishlist(true);
      //show succes message
      toast.success(response.data.message, {
        style: { backgroundColor: "#05992c", color: "white" },
        position: "bottom-right",
      });
    } else {
      // show error message
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="row mx-10">
        {products?.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="w-1/6 bg-slate-600-">
              <div className="product m-2 relative">
                <span
                  onClick={() => addToWishlist(product.id)}
                  className="absolute flex justify-center items-center text-2xl w-10 h-10 cursor-pointer right-2 top-2"
                >
                  <i
                    className={`fas fa-heart ${
                      addedWishlist && currentId == product.id
                        ? "text-red-400"
                        : "text-black"
                    }`}
                  ></i>
                </span>
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    className="w-full"
                    alt={product.slug}
                  />
                  <h3 className="mb-3 text-emerald-500">
                    {product.category.name}
                  </h3>
                  <h3 className="font-semibold mb-1">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between p-3">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fa fa-star text-yellow-400"></i>
                      {product.ratingsAverage} EGP
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => addToCart(product.id)}
                  className="text-white bg-emerald-600 w-full px-4 py-2 rounded-md"
                >
                  {loading && currentId == product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="sk-chase mx-auto">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
        )}
      </div>
    </>
  );
}
