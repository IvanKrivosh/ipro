//Раздел ИПР
module.exports = (sequelize, DataTypes) => {
  const InvestmentSection = sequelize.define('investmentSection', {
    name: {type: DataTypes.STRING}
  });
  return InvestmentSection;
};
