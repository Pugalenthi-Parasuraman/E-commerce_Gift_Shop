import React from "react";
import { Link } from "react-router-dom";


const OrderSuccess = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <img
          className="my-5 mx-auto w-32 h-32"
          src="/images/success.png"
          alt="Order Success"
        />
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Order has been placed successfully.
        </h2>
        <Link
          to="/orders"
          className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Go to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
