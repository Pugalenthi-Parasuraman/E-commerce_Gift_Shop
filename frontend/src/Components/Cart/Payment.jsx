import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderCompleted } from "../../Slices/cartSlice";
import { validateShipping } from "./Shipping";
import { createOrder } from "../../actions/orderActions";
import { clearError as clearOrderError } from "../../Slices/orderSlice";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("online");

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { error: orderError } = useSelector((state) => state.orderState || {});

  useEffect(() => {
    if (orderError) {
      validateShipping(shippingInfo, navigate);
      toast.error(orderError, {
        position: "bottom-center",
        onOpen: () => dispatch(clearOrderError()),
      });
    }
  }, [orderError, dispatch, navigate, shippingInfo]);

  const handlePayment = async () => {
    const order = {
      orderItems: cartItems,
      shippingInfo,
      itemsPrice: orderInfo.itemsPrice,
      shippingPrice: orderInfo.shippingPrice,
      taxPrice: orderInfo.taxPrice,
      totalPrice: orderInfo.totalPrice,
      paymentMethod: paymentMethod,
    };

    if (paymentMethod === "offline") {
      order.paymentInfo = {
        id: "offline",
        status: "pending",
      };
      dispatch(orderCompleted());
      dispatch(createOrder(order));
      navigate("/order/success");
    } else {
      try {
        const paymentData = {
          amount: Math.round(orderInfo.totalPrice * 100),
          currency: "INR",
          receipt: `order_rcptid_${Date.now()}`,
          name: user.name,
          shipping: {
            address: shippingInfo.address,
            country: shippingInfo.country,
            state: shippingInfo.state,
            city: shippingInfo.city,
            phone: shippingInfo.phoneNo,
            postal_code: shippingInfo.postalCode,
          },
        };

        const { data: apiKey } = await axios.get("/api/v1/razorpayapi");
        const { data } = await axios.post(
          "/api/v1/payment/process",
          paymentData
        );

        const options = {
          key: apiKey.razorpayApiKey,
          amount: data.amount,
          currency: data.currency,
          name: user.name,
          description: "Payment for your order",
          order_id: data.order_id,
          handler: async function (response) {
            if (response.razorpay_payment_id) {
              toast.success("Payment Successful!");

              order.paymentInfo = {
                id: response.razorpay_payment_id,
                status: "successed",
              };

              dispatch(orderCompleted());
              dispatch(createOrder(order));
              navigate("/order/success");
            } else {
              toast.error("Payment verification failed.");
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: shippingInfo.phoneNo,
          },
          theme: { color: "#6366F1" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        toast.error("Payment failed! Please try again.");
      }
    }
  };

  return (
    <div className="flex font-rubik justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Complete Your Payment
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Choose Payment Method:
          </label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
              />
              Online Payment
            </label>
            <label>
              <input
                type="radio"
                value="offline"
                checked={paymentMethod === "offline"}
                onChange={() => setPaymentMethod("offline")}
              />
              Cash / UPI on Delivery
            </label>
          </div>
        </div>

        <div className="mb-4 text-gray-700">
          <p>
            <strong>Amount:</strong> ₹{orderInfo?.totalPrice}
          </p>
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Shipping Address:</strong> {shippingInfo.address},{" "}
            {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}
          </p>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {paymentMethod === "offline"
            ? "Place Order"
            : `Pay ₹${orderInfo?.totalPrice}`}
        </button>
      </div>
    </div>
  );
};

export default Payment;
