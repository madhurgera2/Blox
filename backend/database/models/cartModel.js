const sequelize = require("../connection");
const {DataTypes, Model} = require('Sequelize');

class Cart extends Model {}

Cart.init({
    cartId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productId: {
        type: DataTypes.STRING
    }
}, {
  sequelize,
  modelName: 'cart',
  timestamps: false,
})

module.exports = Cart;