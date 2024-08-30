import { useFormik } from "formik";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  let { cartId, checkout } = useContext(CartContext);

  // user host url 
  const url = window.location.host;

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    

    onSubmit: () => handleCheckout(cartId, `http://${url}`),
  });

  async function handleCheckout(cartId, url) {
    let response = await checkout(cartId, url, formik.values);
    console.log(response);
    window.location.href = response.data.session.url
    
  }

  return (
    <>
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <h1 className="text-3xl p-5 ps-0 text-green-600">Checkout Now</h1>
        <div className="relative z-0 w-full my-5 group">
          <input
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Details
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Phone Number
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your City
          </label>
        </div>
        <div className="flex flex-col mt-10">
          <button
            type="submit"
            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Proceed to Checkout
          </button>
        </div>
      </form>
    </>
  );
}
