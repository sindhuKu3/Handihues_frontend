import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import CheckoutPage from "./pages/CheckOutPage";
import ProductDetails from "./features/product-list/ProductComponent/ProductDetails";
import Protected from "./features/auth/AuthComponents/Protected";
import { useDispatch, useSelector } from "react-redux";

import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import NotFound from "./pages/404Page";
import OrderSuccess from "./pages/OrderSuccess";
import UserOrders from "./features/user/UserComponent/UserOrders";
import UserProfile from "./features/user/UserComponent/UserProfile";
import Logout from "./features/auth/AuthComponents/LogOut";
import ForgotPassword from "./features/auth/AuthComponents/ForgotPassword";
import ProtectedAdmin from "./features/auth/AuthComponents/ProtectedAdmin";
import AdminProductList from "./features/admin/AdminComponents/AdminProductList";
import AdminProductDetails from "./features/admin/AdminComponents/AdminProductDetail";
import ProductForm from "./features/admin/AdminComponents/ProductForm";
import AdminOrders from "./features/admin/AdminComponents/AdminOrders";
import { fetchLoggedInUserInfoAsync } from "./features/user/userSlice";
import { checkAuthAsync, selectLoggedInUser } from "./features/auth/authSlice";
import AboutPage from "./pages/About/AboutPage";
// import Navbar from "./pages/Navbar/Navbar"
import Footer from "./pages/Footer";
import Cart from "./features/cart/Cart";
import NavBar from "./pages/Navbar";


function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserInfoAsync());
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <main>
        <BrowserRouter>
      <NavBar/>
          <Routes>
            <Route
              path="/"
              element={
                <Protected>
                  <HomePage />
                </Protected>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/cart"
              element={
                <Protected>
                  <Cart />
                </Protected>
              }
            />
            <Route
              path="/checkout"
              element={
                <Protected>
                  <CheckoutPage />
                </Protected>
              }
            />
            <Route
              path="/productDetail/:id"
              element={
                <Protected>
                  <ProductDetails />
                </Protected>
              }
            />
            <Route path="/orderSuccess/:id" element={<OrderSuccess />} />
            <Route path="/userOrders" element={<UserOrders />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/logOut" element={<Logout />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdmin>
                  <AdminProductList />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/product-detail/:id"
              element={
                <ProtectedAdmin>
                  <AdminProductDetails />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/product-form/"
              element={
                <ProtectedAdmin>
                  <ProductForm />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/product-form/edit/:id"
              element={
                <ProtectedAdmin>
                  <ProductForm />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedAdmin>
                  <AdminOrders />
                </ProtectedAdmin>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
