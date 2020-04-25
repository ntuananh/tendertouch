const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('tendertouch', 'root', 'root', {
  dialect: 'mysql'
});

module.exports = {
  sequelize,
  Model,
  DataTypes
}; 

