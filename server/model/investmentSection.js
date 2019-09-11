//Раздел ИПР
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('investmentSection', {
    name: {type: DataTypes.STRING}
  });
};
