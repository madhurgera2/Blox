const Customer = require('../database/models/customerModel');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try{
        const userData = req.body;

        const email = userData.email;
        const password = userData.password;

        // hash the generated password
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();

        const response = await Customer.create({
            userId: userId,
            name: userData.name,
            email: email,
            password: hashedPassword
        })

        res.json({
            success: true,
            message: "user created successfully!",
            body: response
        })

    }catch(err){
        console.log(err)
        res.json({
            success: false,
            message: "user was not created successfully!",
            body: err
        })
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        // check if there's a user with this email address
        const emailCheck = await Customer.findOne({
            where: {
                email: email
            }
        })
        if(emailCheck === null){
            res.json({
                success: false,
                message: "no such email address",
            })
            return 0;
        }

        const isValid = await bcrypt.compare(password, emailCheck.password);

        if(isValid){
            // password and email both are verified, so create an access token and send that to the frontend
            const userData = {
                email: email,
                name: emailCheck.name,
                userId: emailCheck.userId
            }

            const access_token = await generateAccessToken(userData);
            const refresh_token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30d'})

            
            //console.log(refresh_token)
            res.json({
                success: true,
                message: "user successfully logged in!",
                access_token: access_token,
                refresh_token: refresh_token,
                userId: emailCheck.userId
            })
        }else{
            res.json({
                success: false,
                message: "Invalid password"
            })
            return 0;
        }
    }catch(err){
        res.json({
            success: false,
            message: "could not login!",
            body: err
        })
    }
}



// ----------------------- handler functions -------------------------------

async function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}

// ----------------------- middlewares ------------------------------------
exports.authenticateUser = async (req, res, next) => {
    // extract the access token from the request header
    const authHeader = req.headers['authorization'];
    const token = req.headers.authorization;

    console.log(token)

    if(token === null) return res.json({success: false, message: "Access token not found!"})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){ return res.json({success: false, err})}
        
        req.user = user;
        next();
    }) 
}