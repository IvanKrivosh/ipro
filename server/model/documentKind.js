//Вид документа
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('documentKind', {
    name: {type: DataTypes.STRING}
  });
};
