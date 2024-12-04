const Cart = require('../database/models/cartModel');
const { v4: uuidv4 } = require('uuid');
const Coupon = require('../database/models/couponModel');
const Order = require('../database/models/orderModel');
const Customer = require('../database/models/customerModel');

exports.addToCart = async (req, res) => {
    try{
        const data = req.body;
        const productId = data.productId;
        const userId = req.user.userId;
        const cartId = uuidv4();

        const response = Cart.create({
            cartId: cartId,
            userId: userId,
            productId: productId
        })

        res.json({
            success: true,
            message: "successfully added the item to cart",
            body: response
        })

    }catch(err){
        res.json({
            success: false,
            message: "could not add items to cart"
        })
    }
}

exports.removeFromCart = async (req, res) => {
    try{
        const data = req.body;
        const productId = data.productId;
        const userId = req.user.userId;

        const response = Cart.destroy({
            where: {
                productId: productId,
                userId: userId
            }
        })

        res.json({
            success: true,
            message: "successfully removed item from the cart",
            body: response
        })

    }catch(err){
        res.json({
            success: false,
            message: "could not remove item from cart"
        })
    }
}

exports.viewCart = async (req, res) => {
    try{
        const userId = req.user.userId;
        //just need to fetch all the items in the cart that match with this user id
        const items = await Cart.findAll({
            where: {
                userId: userId
            }
        })

        res.json({
            success: true,
            message: "successfully fetched all cart contents",
            body: items
        })
    }catch(err){
        res.json({
            success: false,
            message: "could not view the cart",
            body: err
        })
    }
}

exports.verifyCoupon = async (req, res) => {
    try{
        const userId = req.user.userId;
        const couponId = req.body.couponId;
        const totalPrice = req.body.totalPrice;


        // check if this coupon code is valid
        const response = await Coupon.findOne({
            where : {
                couponId: couponId,
                userId: userId
            }
        })

        if(response === null){
            res.json({
                success: false,
                message: "invalid coupon code!"
            })
            return 0;
        }

        // now that the coupon has been applied, remove it from the coupon table
        const removeCoupon = await Coupon.destroy({
            where: {
                couponId: couponId,
                userId: userId
            }
        })

        const discountPrice = totalPrice*0.1;
        const newPrice = totalPrice-discountPrice;

        res.json({
            success: true,
            message: "coupon verified and removed from the list!",
            body: {
                newPrice: newPrice,
                discountPrice: discountPrice
            },
        })
    }catch(err){
        res.json({
            success: false,
            message: "could not verify the coupon"
        })
    }
}

exports.placeOrder = async (req, res) => {
    try{
        const userId = req.user.userId;
        const orderId = uuidv4();
        const couponApplied = req.body.couponApplied;

        // fetch all the products from the user's cart and add their price

        const cartItems = await Cart.findAll({
            where: {userId: userId}
        })

        let totalAmount=0;
        for(let item of cartItems){
            totalAmount += item.price;
        }
        const currentDate = new Date().toDateString();

        let discountPrice=0;
        let newPrice = totalAmount;

        // check if the coupon code entered by the user is valid
        if(couponApplied){
            // since the coupon has been applied, you need to give a 10% discount on the total price
            discountPrice = totalAmount*0.1;
            newPrice = totalAmount-discountPrice;
        }
        
        const newOrder = await Order.create({
            orderId: orderId,
            userId: userId,
            originalPrice: totalAmount,
            discountPrice: discountPrice,
            orderPrice: newPrice,
            orderedOn: currentDate
        })

        // increment the order count in the customer table by one
        const customerData = await Customer.findOne({
            where: {
                userId: userId
            }
        })
        const orderCount = customerData.orderCount;
        const newCouponId = uuidv4();
        if((orderCount+1) % 5 === 0){
            // means that we need to add another coupon to the coupon table for this user
            const newCoupon = await Coupon.create({
                couponId: newCouponId,
                name: newCouponId.substring(0, 6),
                userId: userId
            })
        }

        const updateOrderCount = await Customer.update({
            orderCount: orderCount + 1
        },{
            where: {
                userId: userId
            }
        })

        res.json({
            success: true,
            message: "order successfully placed!",
            body: newOrder
        })
        
    }catch(err){
        res.json({
            success: false,
            message: "could not place the order",
            body: err
        })
    }
}

exports.getCoupons = async (req, res) => {
    try{
        const userId=req.user.userId;
        const response = await Coupon.findAll({
            where: {
                userId: userId
            }
        })

        res.json({
            success: true,
            message: "fetched all the coupons successfully!",
            body: response
        })
    }catch(err){
        res.json({
            success: false,
            message: "could not fetch coupons"
        })
    }
}