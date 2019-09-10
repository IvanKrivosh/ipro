//Статус титула
module.exports = (sequelize, DataTypes) => {
  const TitulStatus = sequelize.define('titulStatus', {
    name: {type: DataTypes.STRING}
  });
  return TitulStatus;
};
