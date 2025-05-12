import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../Reausable/Topnavbar/Loader";
import { orderDetail as orderDetailAction } from "../../actions/orderActions";

function OrderDetail() {
  const { orderDetail, loading } = useSelector((state) => state.orderState);
  const {
    shippingInfo = {},
    user = {},
    orderStatus = "Processing",
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
    customOrderId = "",
    statusHistory = [],
  } = orderDetail;

  const isPaid = paymentInfo && paymentInfo.status === "succeeded";
  const dispatch = useDispatch();
  const { id } = useParams();

  // Polling every 10 seconds for live updates
  useEffect(() => {
    dispatch(orderDetailAction(id));

    const interval = setInterval(() => {
      dispatch(orderDetailAction(id));
    }, 10000); // 10s

    return () => clearInterval(interval);
  }, [id, dispatch]);

  const steps = ["Processing", "Shipped", "Out for Delivery", "Delivered"];
  const currentStepIndex = steps.indexOf(orderStatus);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-5">
              Order #{" "}
              {customOrderId ||
                `ORD-${orderDetail._id?.slice(-4).toUpperCase()}`}
            </h1>

            {/* Live Order Tracking Stepper */}
            <h4 className="text-lg font-semibold mt-6 mb-3">
              Live Order Tracking
            </h4>
            <div className="flex items-center space-x-4 mb-6">
              {steps.map((step, index) => {
                const isDone = index <= currentStepIndex;
                return (
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isDone
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <p className="text-xs mt-1 text-center">{step}</p>
                  </div>
                );
              })}
            </div>

            {/* Optional: Tracking Timeline */}
            {statusHistory?.length > 0 && (
              <>
                <h4 className="text-lg font-semibold mt-6 mb-2">
                  Tracking Timeline
                </h4>
                <ul className="space-y-1 mb-6">
                  {statusHistory.map((item, i) => (
                    <li key={i} className="text-sm">
                      ✅ <b>{item.status}</b> at{" "}
                      {new Date(item.updatedAt).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Shipping Info</h4>
                <div className="space-y-2">
                  <p>
                    <b>Name:</b> {user.name}
                  </p>
                  <p>
                    <b>Phone:</b> {shippingInfo.phoneNo}
                  </p>
                  <p>
                    <b>Address:</b> {shippingInfo.address}, {shippingInfo.city},{" "}
                    {shippingInfo.postalCode}, {shippingInfo.state},{" "}
                    {shippingInfo.country}
                  </p>
                  <p>
                    <b>Amount:</b> ₹{totalPrice}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">Payment</h4>
                <div className="space-y-2">
                  <p
                    className={
                      isPaid
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {isPaid ? "PAID" : "NOT PAID"}
                  </p>
                  <p>
                    <b>Method:</b>{" "}
                    {paymentInfo.method === "cash"
                      ? "Cash on Delivery"
                      : "Online"}
                  </p>
                  {isPaid && paymentInfo.paidAt && (
                    <p>
                      <b>Paid At:</b>{" "}
                      {new Date(paymentInfo.paidAt).toLocaleString()}
                    </p>
                  )}
                </div>

                <h4 className="text-lg font-semibold mt-4 mb-3">
                  Order Status
                </h4>
                <p
                  className={
                    orderStatus.includes("Delivered")
                      ? "text-green-600 font-bold"
                      : orderStatus.includes("Shipped")
                      ? "text-blue-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {orderStatus}
                </p>
                {orderStatus === "Delivered" && orderDetail.deliveredAt && (
                  <p>
                    <b>Delivered At:</b>{" "}
                    {new Date(orderDetail.deliveredAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            <hr className="my-6 border-gray-300" />

            <h4 className="text-lg font-semibold mb-4">Order Items</h4>

            {orderItems &&
              orderItems.map((item) => (
                <div
                  key={item.products}
                  className="flex items-center justify-between border p-4 rounded-lg mb-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-20 object-cover rounded-md"
                  />
                  <Link
                    to={`/product/${item.products}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-700">₹{item.price}</p>
                  <p className="text-gray-600">{item.quantity} Piece(s)</p>
                </div>
              ))}

            <hr className="my-6 border-gray-300" />

            <div className="flex justify-end">
              <div className="text-right space-y-2">
                <p>
                  <b>Subtotal:</b> ₹{totalPrice}
                </p>
                {orderDetail.taxPrice && (
                  <p>
                    <b>Tax:</b> ₹{orderDetail.taxPrice}
                  </p>
                )}
                {orderDetail.shippingPrice && (
                  <p>
                    <b>Shipping:</b> ₹{orderDetail.shippingPrice}
                  </p>
                )}
                <p className="text-xl font-bold">Total: ₹{totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default OrderDetail;
