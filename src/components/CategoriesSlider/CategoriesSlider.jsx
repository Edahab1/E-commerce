import React, { useEffect, useState } from "react";
// import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";


export default function CategoriesSlider() {
  const [categories, setcategories] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setcategories(res.data.data);
      })
      .catch((res) => {
        console.log("error in categories API");
      });
  }

  useEffect(() => {
    getCategories();

    return () => {};
  }, []);
  return (
    <>
      <div className="container w-[90%] mx-auto">
        <div className="  my-10">
          <h2 className="font-semibold my-4 text-gray-600">Shop Popular Categories</h2>
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category._id}>
                <img
                  className="w-full h-[200px] object-cover"
                  src={category?.image}
                  alt={category?.slug}
                />
                <h4>{category.name}</h4>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
