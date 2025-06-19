import "./App.css";
import Home from "./Components/Home/Userhome.jsx";
import Navbar from "./Components/Reausable/Topnavbar/Navbar.jsx";
import Footer from "./Components/Reausable/Footer/Footer.jsx";
import Login from "./Components/User/Login.jsx";
import Register from "./Components/User/Register.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
// import "flowbite";
import "./Styles/Home.css";
import { HelmetProvider } from "react-helmet-async";
import ProductPage from "./Components/Product/ProductPage.jsx";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./Components/Product/ProductDetail.jsx";
import ProductSearch from "./Components/Product/ProductSearch.jsx";
import store from "./store.js";
import { useEffect } from "react";
import { loadUser } from "./actions/userActions.js";
import Profile from "./Components/User/Profile.jsx";
import ProtectedRoute from "./Components/Reausable/ProtectRoute/ProtectedRoute.jsx";
import ProfileUpdate from "./Components/User/ProfileUpdate.jsx";
import PasswordUpdate from "./Components/User/PasswordUpdate.jsx";
import PasswordForgot from "./Components/User/PasswordForgot.jsx";
import PasswordReset from "./Components/User/PasswordReset.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Shipping from "./Components/Cart/Shipping.jsx";
import ConfirmOrder from "./Components/Cart/ConfirmOrder.jsx";
import Payment from "./Components/Cart/Payment.jsx";
import { useState } from "react";
import axios from "axios";
import OrderSuccess from "./Components/Cart/OrderSuccess.jsx";
import UserOrders from "./Components/Order/UserOrders.jsx";
import OrderDetail from "./Components/Order/OrderDetail.jsx";
import UserLocation from "./Components/Order/UserLocation.jsx"
import Dashboard from "./Components/AdminPanel/Dashboard.jsx";
import ProductList from "./Components/AdminPanel/Productlist.jsx";
import NewProduct from "./Components/AdminPanel/NewProduct.jsx";
import UpdateProduct from "./Components/AdminPanel/UpdateProduct.jsx";
import OrderList from "./Components/AdminPanel/OrderList.jsx";
import UpdateOrder from "./Components/AdminPanel/UpdateOrder.jsx";
import UserList from "./Components/AdminPanel/UserList.jsx";
import UpdateUser from "./Components/AdminPanel/UpdateUser.jsx";
import UserInvoice from "./Components/AdminPanel/UserInvoice.jsx";
import ReviewList from "./Components/AdminPanel/ReviewList.jsx";

function App() {
  const [razorpayApiKey, setRazorpayApiKey] = useState("");
   const location = useLocation();
  useEffect(() => {
    store.dispatch(loadUser);
    async function getRazorpayApiKey() {
      const { data } = await axios.get("/api/v1/razorpayapi");
      setRazorpayApiKey(data.razorpayApiKey);
    }
    getRazorpayApiKey();
  }, []);

const isAllPage = [
  "/login",
  "/register",
  "/password/forgot",
  "/password/reset/:token",
  "/myprofile/update/password",
  "/myprofile/update",
  "/shipping",
  "/order/confirm",
  "/order/success",
  "/payment",
].includes(location.pathname);
const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="App">
      <HelmetProvider>
       {!isAdminPage && !isAllPage && <Navbar />}
        <div>
          <ToastContainer theme="dark" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/search/:keyword" element={<ProductSearch />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myprofile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
            <Route path="/myprofile/update" element={<ProtectedRoute><ProfileUpdate /></ProtectedRoute>}/>
            <Route path="/myprofile/update/password" element={<ProtectedRoute><PasswordUpdate /></ProtectedRoute>}/>
            <Route path="/password/forgot" element={<PasswordForgot />} />
            <Route path="/password/reset/:token" element={<PasswordReset />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>}/>
            <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>}/>
            <Route path="/order/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>}/>
            <Route path="/orders" element={<ProtectedRoute><UserOrders /></ProtectedRoute>}/>
            <Route path="/order/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>}/>
            <Route path="/order/location/:id" element={<ProtectedRoute><UserLocation /></ProtectedRoute>}/>
            <Route path="/payment" element={<ProtectedRoute><Payment razorpayApiKey={razorpayApiKey} /></ProtectedRoute>}/>
          </Routes>
        </div>
        <Routes>
          <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>}/>
          <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>}/>
          <Route path="/admin/products/create" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>}/>
          <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>}/>
          <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>}/>
          <Route path='/admin/order/:id' element={ <ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute> } />
          <Route path='/admin/users' element={ <ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute> } />
          <Route path='/admin/users/invoice' element={ <ProtectedRoute isAdmin={true}><UserInvoice/></ProtectedRoute> } />
          <Route path='/admin/user/:id' element={ <ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute> } />
          <Route path='/admin/reviews' element={ <ProtectedRoute isAdmin={true}><ReviewList/></ProtectedRoute> } />
        </Routes>
          {!isAdminPage && !isAllPage && <Footer />}
      </HelmetProvider>
    </div>
  );
}

export default App;
