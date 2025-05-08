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
  } = orderDetail;

  const isPaid = paymentInfo && paymentInfo.status === "succeeded";
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [id, dispatch]);

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
