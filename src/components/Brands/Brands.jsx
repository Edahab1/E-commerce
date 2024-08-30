import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

export default function Categories() {
  const [brands, setbrands] = useState([]);

  async function getBrands() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        // console.log(res)
        setbrands(res.data.data);
      })
      .catch((err) => err);
  }

  useEffect(() => {
    
    getBrands();

    return () => {
    };
  }, []);

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>
      <div className="row">
        {brands?.length > 0? brands?.map((brand) => (
          <>
            <div className="w-1/4 p-2" key={brand._id}>
              <Link to={`${brand._id}`}>
              <div className="border rounded-md border-slate-700 shadow hover:shadow-emerald-800 hover:shadow-md hover:transition-all">
                <span>
                  <img
                    className="rounded-t-lg w-full object-cover"
                    src={brand.image}
                    alt={brand.slug}
                  />
                </span>
                  <span>
                    <h5 className="mb-2 text-lg text-center text-green-800 dark:text-white">
                      {brand.name}
                    </h5>
                  </span>
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
