//Тип лимита
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('limitType', {
    name: {type: DataTypes.STRING}
  });
};
