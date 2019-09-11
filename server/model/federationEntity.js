//Субъект Федерации
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('federationEntity', {
    name: {type: DataTypes.STRING}
  });
};
