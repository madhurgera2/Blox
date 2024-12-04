const express = require('express');
const router = express.Router();
const {addToCart, removeFromCart, placeOrder, verifyCoupon, viewCart, getCoupons} = require('../controllers/cartControllers');
const {authenticateUser} = require('../controllers/userControllers');

router.route('/add').post(authenticateUser, addToCart)
router.route('/remove').post(authenticateUser, removeFromCart)
router.route('/view').post(authenticateUser, viewCart)


router.route('/order').post(authenticateUser, placeOrder)
router.route('/coupon/verify').post(authenticateUser, verifyCoupon)
router.route('/coupon/all').get(authenticateUser, getCoupons)

module.exports = router;