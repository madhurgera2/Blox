const sequelize = require("../connection");
const {DataTypes, Model} = require('Sequelize');

class Customer extends Model {}

Customer.init({
    userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        defaultValue: ""
    },
    orderCount: {
        type: DataTypes.NUMBER,
        defaultValue: 0
    }
}, {
  sequelize,
  modelName: 'customer',
  timestamps: false,
})

module.exports = Customer;