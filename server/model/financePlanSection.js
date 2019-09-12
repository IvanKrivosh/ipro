//Раздел фин плана
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('financePlanSection', {
    name: {type: DataTypes.STRING}
  });
};
