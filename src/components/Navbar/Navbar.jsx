// import style from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../public/freshcart-logo.svg";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { cart } = useContext(CartContext);


  let Navigate = useNavigate();

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    Navigate("/login");
  }

  return (
    <>
      <nav className="bg-gray-100 fixed left-0 right-0 top-0 z-10">
        <div className="flex flex-col lg:flex-row justify-between px-4 py-2">
          <div className="flex flex-col lg:flex-row ">
            <img src={logo} alt="logo" width={150} />

            {userLogin != null ? (
              <>
                <ul className="flex flex-col lg:flex-row items-center">
                  <li className="p-3 text-gray-500">
                    <NavLink to="">Home</NavLink>
                  </li>
                  <li className="p-3 text-gray-500">
                    <NavLink to="wishlist"><i className="fas fa-heart"></i> Wishlist</NavLink>
                  </li>
                  <li className="p-3 text-gray-500">
                    <NavLink to="products">Products</NavLink>
                  </li>
                  <li className="p-3 text-gray-500">
                    <NavLink to="categories">Categories</NavLink>
                  </li>
                  <li className="p-3 text-gray-500">
                    <NavLink to="brands">Brands</NavLink>
                  </li>
                </ul>
              </>
            ) : null}
          </div>

          <div className="flex flex-col-reverse lg:flex-row items-center relative">
            {userLogin != null ? (
              <>
              <span className="hidden lg:block">
              <NavLink to="cart"><i className="fas fa-shopping-cart hidden lg:block text-green-800">
                    {cart?.numOfCartItems > 0 ? (
                      <span className="bg-green-200 absolute top-[1px] md:left-0 text-slate-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        {cart?.numOfCartItems}
                      </span>
                      
                    ) : null}
                    <span className="absolute text-[8px] bottom-3">cart</span>
                  </i></NavLink>
                </span>
                <ul className="md:inline-block">
                  <li className="p-5">
                    <i className="fab fa-instagram px-2"></i>
                    <i className="fab fa-facebook px-2"></i>
                    <i className="fab fa-tiktok px-2"></i>
                    <i className="fab fa-twitter px-2"></i>
                    <i className="fab fa-linkedin px-2"></i>
                    <i className="fab fa-youtube px-2"></i>
                  </li>
                </ul>

                <span
                  onClick={signout}
                  className="p-3 text-gray-500 cursor-pointer"
                >
                  Sign out
                </span>
                
              </>
            ) : (
              <div>
                <ul className="flex flex-col-reverse lg:flex-row items-center">
                  <li className="p-3 ps-0 text-gray-500">
                    <Link to="register">Register</Link>
                  </li>
                  <li className="p-3 text-gray-500">
                    <Link to="login">Login</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
