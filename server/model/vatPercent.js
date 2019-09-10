//Процент НДС
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('vatPercent', {
    percent: {type: DataTypes.INTEGER}
  });
};
