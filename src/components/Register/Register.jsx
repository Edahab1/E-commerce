// import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
// import Login from "./../Login/Login";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Register() {
  const {userLogin, setuserLogin} = useContext(UserContext)
  const [APIerror, setAPIerror] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  // async function handleSubmit(values) {
  //   console.log(values);

  //   let {data} = await axios.post(
  //     `https://ecommerce.routemisr.com/api/v1/auth/signup`,
  //     values
  //   )
  //   console.log(data);

    // if(data.message == "success"){
    //   navigate("/Login")
    // } else{
    //   console.log("error");

    // }
  // }

  function handleSubmit(values) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        console.log("succes");
        setisLoading(false);
        if(res.data.message == "success"){
          navigate("/Login")
          localStorage.setItem("userToken", res.data.token)
          setuserLogin(res.data.token)
        } else{
          console.log("error");
    
        }
      })
      .catch((res) => {
        setisLoading(false);

        console.log(res.response.data.message);
        setAPIerror(res.response.data.message);
      });
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(15).required("name is required"),
    email: Yup.string().email("invalid Email").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "password must be of a 6 to 10 characters length"
      )
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password does not match")
      .required("this field is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid Phone Number")
      .required("Phone number is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        {APIerror ? (
          <div className="text-center mx-auto py-1 bg-red-300">{APIerror}</div>
        ) : null}
        <h1 className="text-3xl p-5 ps-0 text-green-600">Register Now</h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="name"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.name}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.rePassword}
            </div>
          ) : null}
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
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col">
        <button
          type="submit"
          className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading? <i className="fas fa-spinner fa-spin"></i>: "Register"}
        </button>

        <span className="p-2">Already have an Existing Account?<Link to={"/login"} className="text-blue-500 ps-2 underline">Login</Link></span>
        </div>
      </form>
    </>
  );
}
