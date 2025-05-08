const express = require('express');
const paymentController = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/authenticate');
const router = express.Router();

router.post('/payment/process', isAuthenticatedUser, paymentController.processPayment);
router.get('/razorpayapi', isAuthenticatedUser, paymentController.sendRazorpayApi);


module.exports = router;