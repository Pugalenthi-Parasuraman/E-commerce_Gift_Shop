const catchAsyncError = require("../middlewares/catchAsnycErrors");
const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const Counter = require("../models/counter");
const sendEmail = require("../utils/email");
const User = require("../models/user");

// Create New Order - api/v1/order/new
const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paymentMethod,
    liveLocation,
    trackingNumber,
  } = req.body;

  // More readable version
  if (paymentMethod === "online") {
    if (
      paymentInfo &&
      paymentInfo.status &&
      paymentInfo.status !== "succeeded"
    ) {
      return next(new ErrorHandler("Online payment not completed.", 400));
    }
    // If no paymentInfo, allow order creation with pending status
  }

  const counter = await Counter.findOneAndUpdate(
    { userId: req.user.id },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const customOrderId = `RUDRA-${String(counter.seq).padStart(2, "0")}`;
  // ✅ Generate tracking number if not provided
  const generatedTrackingNumber =
    trackingNumber ||
    `TRK-${Date.now().toString().slice(-6)}-${Math.floor(
      Math.random() * 900 + 100
    )}`;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    user: req.user.id,
    paymentMethod,
    paidAt: paymentMethod === "online" ? Date.now() : null,
    customOrderId,
    liveLocation,
    trackingNumber: generatedTrackingNumber,
  });

  const user = await User.findById(req.user.id);
  sendEmail({
    email: user.email,
    subject: "Order Placed Successfully",
    message: `Your order with ID ${customOrderId} has been successfully placed. We will notify you on any updates.`,
  });

  res.status(200).json({
    success: true,
    order: {
      ...order.toObject(),
      displayId: customOrderId,
    },
  });
});

// Update Live Location - api/v1/order/live-location/:id
const updateLiveLocation = catchAsyncError(async (req, res, next) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude and longitude required" });
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.shippingInfo.coordinates = { latitude, longitude };
  await order.save();

  res.status(200).json({
    message: "Live location updated successfully",
    coordinates: order.shippingInfo.coordinates,
  });
});

// Get Single Order - api/v1/order/:id
const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    order: formatOrderResponse(order),
  });
});

// Get Loggedin User Orders - /api/v1/myorders
const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders: orders.map(formatOrderResponse),
  });
});

// Admin: Get All Orders - api/v1/orders
const orders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders: orders.map(formatOrderResponse),
  });
});

// Format order response
function formatOrderResponse(order) {
  return {
    ...order.toObject(),
    displayId: order.customOrderId || order._id,
    orderStatus: order.orderStatus,
    totalPrice: order.totalPrice,
    createdAt: order.createdAt,
  };
}

// Admin: Update Order / Order Status - api/v1/admin/order/:id
const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order has already been delivered!", 400));
  }

  if (req.body.orderStatus === "Processing") {
    for (const orderItem of order.orderItems) {
      await updateStock(orderItem.product, orderItem.quantity);
    }
  }

  // ✅ Offline Payment Manual Update Integration
  if (req.body.paymentInfo?.status === "succeeded") {
    order.paymentInfo = {
      ...order.paymentInfo,
      status: "succeeded",
      method: "offline",
      paidAt: Date.now(),
    };
  }

  order.orderStatus = req.body.orderStatus;

  if (req.body.trackingNumber) {
    order.trackingNumber = req.body.trackingNumber;
  }

  if (req.body.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();

  // ✅ Send Email Notification
  const customer = order.user;
  const orderId = order.customOrderId || order._id.toString();
  const coords = order.shippingInfo?.coordinates;
  const mapLink =
    coords?.latitude && coords?.longitude
      ? `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
      : null;

      let BASE_URL = process.env.FRONTEND_URL;
      if (process.env.NODE_ENV === "production") {
        BASE_URL = `${req.protocol}://${req.get("host")}`;
      }

  const frontendTrackingLink = `${BASE_URL}/order/location/${order._id}`;

  const plainMessage = `Hi ${customer.name},

Your order ${orderId} is now marked as "${order.orderStatus}".

${order.trackingNumber ? `Tracking Number: ${order.trackingNumber}` : ""}

Track your order: ${frontendTrackingLink}
${mapLink ? `\nView on Map: ${mapLink}` : ""}
`;

  const htmlMessage = `
    <div style="font-family:sans-serif;padding:20px;line-height:1.6">
      <h2 style="color:#4CAF50;">Hi ${customer.name},</h2>
      <p>Your order <strong>${orderId}</strong> is now <strong>${order.orderStatus}</strong>.</p>

      ${
        order.trackingNumber
          ? `<p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>`
          : ""
      }

      <p><a href="${frontendTrackingLink}" style="color:#2196f3;">📦 Track Order Status</a></p>
      ${
        mapLink
          ? `<p><a href="${mapLink}" style="color:#f44336;">🗺️ View Location on Map</a></p>`
          : ""
      }

      <p>Thank you for shopping with us!<br/>– RUDRA Team</p>
    </div>
  `;

  await sendEmail({
    email: customer.email,
    subject: `Order ${orderId} – ${order.orderStatus}`,
    message: plainMessage,
    html: htmlMessage,
  });

  res.status(200).json({
    success: true,
    order: formatOrderResponse(order),
  });
});

// Update stock
async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Admin: Delete Order - api/v1/order/:id
const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404)
    );
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});

module.exports = {
  updateLiveLocation,
  newOrder,
  getSingleOrder,
  myOrders,
  orders,
  updateOrder,
  deleteOrder,
};
