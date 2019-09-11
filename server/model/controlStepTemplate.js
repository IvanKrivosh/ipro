//Шаблон контрольных этапов
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('controlStepTemplate', {
    name: {type: DataTypes.STRING},                 //Наименование
    description: {type: DataTypes.STRING},          //Описание
    orderNumber: {type: DataTypes.INTEGER},         //Порядковый номер
    isShown: {type: DataTypes.BOOLEAN}              //Признак "Отображать"
  });
};
