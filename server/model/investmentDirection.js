//Направление инвестиций
module.exports = (sequelize, DataTypes) => {
  const InvestmentDirection = sequelize.define('investmentDirection', {
    name: {type: DataTypes.STRING}
  });
  return InvestmentDirection;
};
