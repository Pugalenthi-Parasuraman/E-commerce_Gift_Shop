const express = require("express");
const orderController = require("../controllers/orderController");
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/authenticate")
const router = express.Router();

router.post("/order/new", isAuthenticatedUser, orderController.newOrder);
router.get("/order/:id", isAuthenticatedUser, orderController.getSingleOrder);
router.get("/myorders", isAuthenticatedUser, orderController.myOrders);

//Admin Routes
router.get("/admin/orders", isAuthenticatedUser, authorizeRoles('admin'), orderController.orders);
router.put("/admin/order/:id", isAuthenticatedUser, authorizeRoles('admin'), orderController.updateOrder);
router.delete("/admin/order/:id", isAuthenticatedUser, authorizeRoles('admin'), orderController.deleteOrder);
router.put("/order/location/:id", isAuthenticatedUser, orderController.updateLiveLocation);

module.exports = router;