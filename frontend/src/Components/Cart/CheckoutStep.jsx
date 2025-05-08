import React from 'react';
import "../../Styles/Home.css";
import { Link } from 'react-router-dom';

function CheckoutStep({ shipping, confirmOrder, payment }) {
  return (
    <div className="items-center mt-10 mb-5 flex justify-center ">
      {shipping ? (
        <Link to="/shipping">
          <div className="step active-step">Shipping Info</div>
        </Link>
      ) : (
        <Link to="/shipping">
          <div className="step incomplete">Shipping Info</div>
        </Link>
      )}

      {confirmOrder ? (
        <Link to="/order/confirm">
          <div className="step active-step">Confirm Order</div>
        </Link>
      ) : (
        <Link to="/order/confirm">
          <div className="step incomplete">Confirm Order</div>
        </Link>
      )}

      {payment ? (
        <Link to="/payment">
          <div className="step active-step">Payment</div>
        </Link>
      ) : (
        <Link to="/payment">
          <div className="step incomplete">Payment</div>
        </Link>
      )}
    </div>
  );
}

export default CheckoutStep