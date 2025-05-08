import { useEffect, useState } from "react";
import Sidebar from "./SidePanel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  orderDetail as orderDetailAction,
  updateOrder,
} from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../Slices/orderSlice";
import { IoMdDownload } from "react-icons/io";

export default function UpdateOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: orderId } = useParams();

  const { loading, isOrderUpdated, error, orderDetail } = useSelector(
    (state) => state.orderState
  );

  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
    orderStatus: currentStatus = "",
    customOrderId = "",
  } = orderDetail;

  const isPaid = paymentInfo.status === "succeeded";
  const [orderStatus, setOrderStatus] = useState("Processing");

  useEffect(() => {
    if (isOrderUpdated) {
      toast.success("Order Updated Successfully!", {
        position: "bottom-center",
      });
      dispatch(clearOrderUpdated());
      navigate("/admin/orders");
      return;
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      dispatch(clearError());
    }

    dispatch(orderDetailAction(orderId));
  }, [dispatch, orderId, isOrderUpdated, error, navigate]);

  useEffect(() => {
    if (orderDetail && orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus || "Processing");
    }
  }, [orderDetail]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (orderStatus === currentStatus) {
      toast.info("No changes detected in order status.");
      return;
    }
    dispatch(updateOrder(orderId, { orderStatus }));
  };

  const exportToCSV = () => {
    const shippingAddress = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.state}, ${shippingInfo.country}`;
    const csvHeader = [
      ["Customer Order ID", customOrderId || "N/A"],
      ["Internal Order ID", orderDetail._id || ""],
      ["Customer Name", user.name || ""],
      ["Phone Number", shippingInfo.phoneNo || ""],
      ["Shipping Address", shippingAddress],
      ["Total Amount", `₹${totalPrice}`],
      ["Payment Status", isPaid ? "Paid" : "Not Paid"],
      ["Order Status", currentStatus],
      [],
      ["Product Name", "Price", "Quantity", "Total"],
    ];

    const csvRows = orderItems.map((item) => [
      item.name,
      item.price,
      item.quantity,
      item.price * item.quantity,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [...csvHeader, ...csvRows]
        .map((row) => row.map((v) => `"${v}"`).join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `order_${customOrderId || orderDetail._id || "unknown"}_details.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold mb-6">Update Order</h1>
            <button
              onClick={exportToCSV}
              className="bg-green-600 text-white px-3 py-3 mt-4 rounded-full hover:bg-green-700 transition"
            >
              <IoMdDownload size={20} />
            </button>
          </div>

          <h2 className="text-lg font-medium mb-4">
            Order #
            {customOrderId ||
              `TEMP-${orderDetail._id?.slice(-6).toUpperCase()}`}
          </h2>

          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo.phoneNo}
            </p>
            <p>
              <b>Address:</b>{" "}
              {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.state}, ${shippingInfo.country}`}
            </p>
            <p>
              <b>Amount:</b> ₹{totalPrice}
            </p>
          </div>

          <hr className="border-gray-300" />

          <div className="mb-4">
            <h4 className="text-lg font-semibold my-2">Payment</h4>
            <p
              className={`font-bold ${
                isPaid ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPaid ? "PAID" : "NOT PAID"}
            </p>
            {paymentInfo.paidAt && (
              <p>
                <b>Paid At:</b> {new Date(paymentInfo.paidAt).toLocaleString()}
              </p>
            )}
          </div>

          <hr className="border-gray-300" />

          <div className="mb-4">
            <h4 className="text-lg font-semibold my-2">Order Status:</h4>
            <p
              className={`font-bold ${
                currentStatus.includes("Delivered")
                  ? "text-green-600"
                  : currentStatus.includes("Shipped")
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >
              {currentStatus}
            </p>
            {orderDetail.deliveredAt && currentStatus === "Delivered" && (
              <p>
                <b>Delivered At:</b>{" "}
                {new Date(orderDetail.deliveredAt).toLocaleString()}
              </p>
            )}
          </div>

          <h3 className="text-lg font-semibold my-2">Order Items</h3>
          <hr className="my-2 border-gray-300" />

          <div className="space-y-4">
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
                  <p className="text-gray-600">₹{item.price}</p>
                  <p className="text-gray-600">{item.quantity} Piece(s)</p>
                </div>
              ))}
            <hr className="my-2 border-gray-300" />
          </div>

          <div className="mt-4">
            <label className="block text-lg font-semibold my-2">
              Update Order Status
            </label>
            <select
              className="w-full border rounded-md p-2"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            onClick={submitHandler}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
}
