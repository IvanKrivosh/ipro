//Подразделение
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('department', {
    name: {type: DataTypes.STRING}
  });
  return Department;
};
