//Направление инвестиций
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('investmentDirection', {
    name: {type: DataTypes.STRING}
  });
};
