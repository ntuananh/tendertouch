const {sequelize, Model, DataTypes} = require('../database/sequelize')

const Technician = sequelize.define('Technician', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }, 
    phone: DataTypes.STRING
  }, {
    // Other model options go here
  });

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

module.exports = Technician;

