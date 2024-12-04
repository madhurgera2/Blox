const Product = require('../database/models/productModel');
const { v4: uuidv4 } = require('uuid');
const Cart = require('../database/models/cartModel')

exports.addProduct = async (req, res) => {
    try{
        // add a product 
        const data = req.body;
        const productId = uuidv4();

        const product = {
            productId: productId,
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            description: req.body.description,
            type: req.body.type,
            imgUrl: req.body.imgUrl,
            price: req.body.price,
            specs: req.body.specs,
            rating: req.body.rating,
            reviews: req.body.reviews,
            prevMonth: req.body.prevMonth,
            deliveredIn: req.body.deliveredIn
        }

        const newProduct = await Product.create(product);
        res.json({
            success: true,
            message: "added new product successfully!",
            body: newProduct
        });
    }catch(err){
        res.json({
            success: false,
            message: "Could not add the product",
            body: err
        })
    }
}

exports.removeProduct = async (req, res) => {
    try{
        // remove the product with that product id
        const productId = req.body.productId;
        const response = await Product.destroy({
            where: {
                productId: productId
            }
        })

        res.json({
            success: true,
            message: "removed the product successfully!",
            body: response
        })
    }catch(err){
        res.json({
            success: false,
            message: "could not remove the product",
            body: err
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.findAll();

        res.json({
            success: true,
            message: "successfully fetched all the products!",
            body: products
        })
    }catch(err){
        res.json({
            success: false,
            message: "could not fetch all products",
            body: err
        })
    }
}

exports.getProduct = async (req, res) => {
    try{
        const productId = req.params.id;
        const product = await Product.findOne({
            where: {
                productId: productId
            }
        })

        if(product=== null){
            res.json({
                success: false,
                message: "product not found!"
            })
        }

        res.json({
            success: true,
            message: "successfully fetched the product",
            body: product
        })
    }catch(err){
        res.json({
            success: false,
            message: "could not fetch the product",
            body: err
        })
    }
}

exports.getAllProductsOfUser = async (req, res) => {
    try{
        const userId = req.user.userId;

        const response = await Cart.findAll({
            where: {
                userId: userId
            }
        })

        // now find all the products that are present in this cartItems
        let products = []
        for(let item of response){
            const productId = item.dataValues.productId
            
            const product = await Product.findOne({
                where: {
                    productId: productId
                }
            })
            products.push(product)
        }

        res.json({
            success: true,
            message: "successfully fetched all items in cart for this user",
            body: products
        })

    }catch(err){
        res.json({
            success: false,
            message: "could not fetch products of user",
            body: err
        })
    }
}