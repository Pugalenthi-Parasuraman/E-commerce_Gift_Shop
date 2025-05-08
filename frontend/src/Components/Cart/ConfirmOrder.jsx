import MetaData from "../Reausable/Topnavbar/MetaData";
import { Fragment, useEffect } from "react";
import { validateShipping } from "./Shipping";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";

function ConfirmOrder() {
  const { shippingInfo, items: cartItems } = useSelector(
    (state) => state.cartState
  );
  const { user } = useSelector((state) => state.authState);
  const navigate = useNavigate();

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  let taxPrice = Number(0.05 * itemsPrice);
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  taxPrice = Number(taxPrice).toFixed(2);

  const processPayment = () => {
    const data = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  }, [shippingInfo, navigate]);

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <CheckoutSteps shipping confirmOrder />

      <div className="flex flex-col font-rubik lg:flex-row justify-between gap-6 p-6 max-w-6xl mx-auto">
        <div className="w-full lg:w-2/3 bg-white shadow-md p-6 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo.address}, {shippingInfo.city},{" "}
            {shippingInfo.postalCode}, {shippingInfo.state},{" "}
            {shippingInfo.country}
          </p>

          <hr className="my-4" />

          <h4 className="text-lg font-semibold mt-4">Your Cart Items:</h4>
          {cartItems.map((item) => (
            <Fragment key={item.product}>
              <div className="flex items-center justify-between border-b py-3">
                <div className="w-1/4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                </div>
                <div className="w-1/2">
                  <Link
                    to={`/product/${item.product}`}
                    className="text-black hover:text-orange-500 font-semibold "
                  >
                    {item.name}
                  </Link>
                </div>
                <div className="w-1/4 text-right">
                  <p>
                    {item.quantity} x ₹{item.price} =
                    <b>₹{item.quantity * item.price}</b>
                  </p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>

        <div className="w-full lg:w-1/3 bg-white shadow-md p-6 rounded-lg">
          <h4 className="text-lg font-semibold">Order Summary</h4>
          <hr className="my-2" />
          <p className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">₹{itemsPrice}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping:</span>
            <span className="font-semibold">₹{shippingPrice}</span>
          </p>
          <p className="flex justify-between">
            <span>Tax:</span> <span className="font-semibold">₹{taxPrice}</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between text-lg font-semibold">
            <span>Total:</span> <span>₹{totalPrice}</span>
          </p>
          <hr className="my-2" />
          <button
            onClick={processPayment}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default ConfirmOrder;
