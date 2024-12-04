const express = require('express');
const router = express.Router();
const {addProduct, removeProduct, getAllProducts, getProduct, getAllProductsOfUser} = require('../controllers/productControllers');
const { authenticateUser } = require('../controllers/userControllers');

router.route('/add').post(addProduct);
router.route('/remove').post(removeProduct);
router.route('/all').get(getAllProducts);
router.route('/get/all').get(authenticateUser, getAllProductsOfUser);
router.route('/get/:id').get(getProduct);

module.exports = router;