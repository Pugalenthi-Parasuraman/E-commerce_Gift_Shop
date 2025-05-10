const catchAsyncError = require("../middlewares/catchAsnycErrors");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "%YOUR_STRIPE_PUBLIC_KEY%",
  key_secret: "%YOUR_STRIPE_SECRET_KEY%",
});

const processPayment = catchAsyncError(async (req, res, next) => {
  const { amount, currency, shipping } = req.body;

  const options = {
    amount: amount,
    currency: currency || "INR",
    receipt: `receipt_${Date.now()}`,
    notes: {
      name: shipping?.name || "N/A",
      phone: shipping?.phone || "N/A",
      city: shipping?.address?.city || "N/A",
      state: shipping?.address?.state || "N/A",
      country: shipping?.address?.country || "N/A",
      postal_code: shipping?.address?.postal_code || "N/A",
    },
  };

  const order = await razorpay.orders.create(options);

    if (process.env.NODE_ENV === "production") {
      return res.status(200).json({
        success: true,
        message: "Order created successfully",
      });
    }

  res.status(200).json({
    success: true,
    order_id: order.id,
    amount: order.amount,
    currency: order.currency,
    shipping_notes: options.notes,
  });
});

const sendRazorpayApi = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    razorpayApiKey: "rzp_test_VBQSaYdZ0LK5WN",
  });
});

module.exports = { processPayment, sendRazorpayApi };
