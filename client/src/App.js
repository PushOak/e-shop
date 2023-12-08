import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    };

    loginStatus();
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

          <Route
            path="/dashboard"
            element={
              <Sidebar>
                <Layout>
                  <Dashboard />
                </Layout>
              </Sidebar>
            }
          />

          <Route
            path="/add-product"
            element={
              <Sidebar>
                <Layout>
                  <AddProduct />
                </Layout>
              </Sidebar>
            }
          />

          <Route
            path="/product-details/:id"
            element={
              <Sidebar>
                <Layout>
                  <ProductDetails />
                </Layout>
              </Sidebar>
            }
          />

          <Route
            path="/edit-product/:id"
            element={
              <Sidebar>
                <Layout>
                  <EditProduct />
                </Layout>
              </Sidebar>
            }
          />

          <Route
            path="/profile"
            element={
              <Sidebar>
                <Layout>
                  <Profile />
                </Layout>
              </Sidebar>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <Sidebar>
                <Layout>
                  <EditProfile />
                </Layout>
              </Sidebar>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
