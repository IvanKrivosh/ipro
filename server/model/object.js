//Объект
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('object', {
    name: {type: DataTypes.STRING},                     //Наименование
    number: {type: DataTypes.STRING},                   //Инвентарный номер
    titulId: {                                          //Титул
      type: DataTypes.INTEGER,
      references: {
        model: 'tituls',
        key: 'id'
      }
    },
    objectType: {type: DataTypes.STRING},               //Тип объекта
    objectKind: {type: DataTypes.STRING},
    physicalDeterioration: {type: DataTypes.INTEGER},   //Физический износ
    accountingDeterioration: {type: DataTypes.INTEGER}, //Бухгалтерский износ
    comments: {type: DataTypes.STRING}                  //Примечания
  });
};
