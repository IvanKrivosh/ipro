//Статус титула
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('titulStatus', {
    name: {type: DataTypes.STRING}
  });
};
