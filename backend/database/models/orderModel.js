const sequelize = require("../connection");
const {DataTypes, Model} = require('Sequelize');

class Order extends Model {}

Order.init({
    orderId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    originalPrice: {
        type: DataTypes.DOUBLE
    },
    discountPrice: {
        type: DataTypes.DOUBLE,
    },
    orderPrice: {
        type: DataTypes.DOUBLE
    },
    orderedOn: {
        type: DataTypes.DATE
    },
    deliveredOn: {
        type: DataTypes.DATE 
    }
}, {
  sequelize,
  modelName: 'order',
  timestamps: false,
})

module.exports = Order;