//Тип документа
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('documentType', {
    name: {type: DataTypes.STRING}
  });
};
