import React, { useContext, useEffect, useState } from "react";
// import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [details, setdetails] = useState([]);
  const [relatedProducts, setrelatedProducts] = useState([]);
  const [currentId, setcurrentId] = useState();
  const [loading, setloading] = useState(false);
  const { id, category } = useParams();

  let { addProductToCart, cart, setcart } = useContext(CartContext);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
  };

  function getDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        setdetails(res.data.data);
      })
      .catch((res) => {
        console.log("error");
      });
  }

  function getRelatedProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        // console.log(res.data.data);
        let related = res.data.data.filter(
          (product) => product.category.name == category
        );
        setrelatedProducts(related);
      })
      .catch((res) => {
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

  useEffect(() => {
    getDetails();
    getRelatedProducts();

    return () => {};
  }, [id, category]);

  return (
    <>
      <div>
        <div className="row justify-center">
          <div className="w-1/4">
            <Slider {...settings}>
              {details?.images?.map((src) => (
                <img key={details?.id} src={src} className="w-full" />
              ))}
            </Slider>
          </div>

          <div className="w-1/2 my-10 mx-3 px-3 relative">
            <h1 className="font-bold">{details?.title}</h1>
            <p className="text-slate-400 py-">{details?.description}</p>
            <p className="mt-8">{details?.category?.name}</p>

            <div className="flex justify-between ">
              <span>{details?.price} EGP</span>
              <span>
                <i className="fa fa-star text-yellow-400"></i>
                {details?.ratingsAverage}
              </span>
            </div>

            <button
              onClick={() => addToCart(details.id)}
              className="bg-emerald-400 w-full p-2 text-white my-3 rounded-md"
            >
              {loading && currentId == details.id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>

        {/* related products display area */}

        <h1 className="w-1/2 mx-auto text-center font-bold text-2xl border-y-4 my-6 py-2">
          Related Products
        </h1>
        <div className="row mx-10">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProducts) => (
              <div key={relatedProducts?.id} className="w-1/6 bg-slate-600-">
                <div className="product m-2">
                  <Link
                    to={`/productdetails/${relatedProducts?.id}/${relatedProducts?.category.name}`}
                  >
                    <img
                      src={relatedProducts.imageCover}
                      className="w-full"
                      alt={relatedProducts.slug}
                    />
                    <h3 className="mb-3 text-emerald-500">
                      {relatedProducts?.category?.name}
                    </h3>
                    <h3 className="font-semibold mb-1">
                      {relatedProducts.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between p-3">
                      <span>{relatedProducts.price} EGP</span>
                      <span>
                        <i className="fa fa-star text-yellow-400"></i>
                        {relatedProducts.ratingsAverage} EGP
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => addToCart(relatedProducts.id)}
                    className="text-white bg-emerald-600 w-full px-4 py-2 rounded-md"
                  >
                    {loading && currentId == relatedProducts.id ? (
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
      </div>
    </>
  );
}
