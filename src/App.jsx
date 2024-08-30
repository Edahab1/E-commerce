import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import SpecificCategory from "./components/SpecificCategory/SpecificCategory";
import Checkout from "./components/Checkout/Checkout";
import Allorders from "./components/Allorders/Allorders";
import UserOrders from "./components/UserOrders/UserOrders";
import Wishlist from "./components/Wishlist/Wishlist";
import WishlistContextProvider from "./Context/WishlistContext";
import SpecificBrand from "./components/SpecificBrand/SpecificBrand";
import Products from './components/products/products';

let routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "user/:id",
        element: (
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories/:id",
        element: (
          <ProtectedRoute>
            <SpecificCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands/:id",
        element: (
          <ProtectedRoute>
            <SpecificBrand />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <WishlistContextProvider>
          <CartContextProvider>
            <RouterProvider router={routes}></RouterProvider>
            <Toaster />
          </CartContextProvider>
        </WishlistContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
