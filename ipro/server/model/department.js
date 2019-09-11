//Подразделение
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('department', {
    name: {type: DataTypes.STRING}
  });
};
