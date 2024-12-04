const sequelize = require("../connection");
const {DataTypes, Model} = require('Sequelize');

class Product extends Model {}

Product.init({
    productId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shortDescription: {
        type: DataTypes.TEXT
    },
    description: {
        type: DataTypes.TEXT
    },
    type: {
        type: DataTypes.STRING
    },
    imgUrl: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.INTEGER
    },
    specs: {
        type: DataTypes.TEXT
    },
    rating: {
        type: DataTypes.STRING
    },
    reviews: {
        type: DataTypes.STRING
    },
    prevMonth: {
        type: DataTypes.STRING
    },
    deliveredIn: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'product',
    timestamps: false,
});

module.exports = Product;