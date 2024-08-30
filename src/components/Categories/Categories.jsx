import React, { useEffect, useState } from "react";
// import style from "./Categories.module.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

export default function Categories() {
  const [categories, setcategories] = useState([]);

  async function getCategories() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res)
        setcategories(res.data.data);
      })
      .catch((err) => err);
  }


  useEffect(() => {
    
    getCategories();

    return () => {
    };
  }, []);

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      <div className="row">
        {categories?.length > 0? categories.map((category) => (
          <>
            <div className="w-1/3 p-2" key={category._id}>
              <Link to={`${category._id}`}>
              <div className="border rounded-md border-slate-700 shadow hover:shadow-emerald-800 hover:shadow-md hover:transition-all">
                <span>
                  <img
                    className="rounded-t-lg w-full h-96 object-cover"
                    src={category.image}
                    alt={category.slug}
                  />
                </span>
                <div className="p-5 border-t-2 border-slate-600">
                  <span>
                    <h5 className="mb-2 text-2xl font-bold text-center text-gray-900 dark:text-white">
                      {category.name}
                    </h5>
                  </span>
                </div>
              </div>
              </Link>
            </div>
          </>
        )):  <div className="sk-chase mx-auto">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>}
      </div>
    </>
  );
}
