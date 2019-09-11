//Вид затрат
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('costType', {
    name: {type: DataTypes.STRING}
  });
};
