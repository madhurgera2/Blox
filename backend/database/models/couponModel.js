const sequelize = require("../connection");
const {DataTypes, Model} = require('Sequelize')

class Coupon extends Model {}

Coupon.init({
    couponId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'coupon',
    timestamps: false,
});

module.exports = Coupon;