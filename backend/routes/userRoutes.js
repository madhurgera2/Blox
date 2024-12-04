const express = require('express');
const app = express();
const router = express.Router();
const {register, login} = require('../controllers/userControllers')

router.route('/register').post(register)
router.route('/login').post(login)
// router.route('/verify').get(verifyEmail)
// router.route('/token').post(refreshToken)
// router.route('/:id').get(authenticateUser, getUser)
// router.route('/:id').put(authenticateUser, updateProfile)

module.exports = router;