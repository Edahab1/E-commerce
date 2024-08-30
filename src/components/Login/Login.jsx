// import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";


export default function Login() {
  const {userLogin, setuserLogin} = useContext(UserContext)
  const [APIerror, setAPIerror] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  

  function handleSubmit(values) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setisLoading(false);
        if(res.data.message == "success"){
          navigate("/")
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
    email: Yup.string().email("invalid Email").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "password must be of a 6 to 10 characters length"
      )
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        {APIerror ? (
          <div className="text-center mx-auto py-1 bg-red-200">{APIerror}</div>
        ) : null}
        <h1 className="text-3xl p-5 ps-0 text-green-600">Login Now</h1>
        <div className="relative z-0 w-full my-5 group">
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
        <div className="flex flex-col mt-10">
        <button
          type="submit"
          className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading? <i className="fas fa-spinner fa-spin"></i>: "Sign in"}
        </button>

        <span className="p-2">Don't have an Account?<Link to={"/register"} className="text-blue-500 ps-2 underline">Sign Up</Link></span>
        </div>
      </form>
    </>
  );
}
