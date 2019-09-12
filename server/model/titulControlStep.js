//Контрольные этапы в титуле
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('titulControlStep', {
    titulId: {                          //Титул
      type: DataTypes.INTEGER,
      references: {
        model: 'tituls',
        key: 'id'
      }
    },
    templateId: {                       //Шаблон контрольных этапов
      type: DataTypes.INTEGER,
      references: {
        model: 'controlStepTemplates',
        key: 'id'
      }
    }
  });
};
