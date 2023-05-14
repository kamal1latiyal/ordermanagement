const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Service = sequelize.define('Service', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    initialValue: 500,
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Service;
