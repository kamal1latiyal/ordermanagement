const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  datetime: {
    type: Sequelize.DataTypes.DATE,
  },
  totalfee: {
    type: Sequelize.DataTypes.DECIMAL(10, 2),
  },
  services: {
    type: Sequelize.DataTypes.JSON,
  },
});

module.exports = Order;