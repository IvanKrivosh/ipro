//Работа по контрольным этапам
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('controlStepJob', {
    number: {type: DataTypes.STRING},               //Номер пункта
    templateId: {                                   //Шаблон контрольных этапов
      type: DataTypes.INTEGER,
      references: {
        model: 'controlStepTemplates',
        key: 'id'
      }
    },
    type: {type: DataTypes.STRING},                 //Вид этапа
    isHead: {type: DataTypes.BOOLEAN},              //Признак "Головной этап"
    name: {type: DataTypes.STRING},                 //Наименование
    minenergoName: {type: DataTypes.STRING},        //Наименование этапов Минэнерго
    planStartDate: {type: DataTypes.STRING},        //Планируемая дата начала
    planEndDate: {type: DataTypes.STRING},          //Планируемая дата окончания
    factStartDate: {type: DataTypes.STRING},        //Фактическая дата начала
    factEndDate: {type: DataTypes.STRING},          //Фактическая дата окончания
    planCost: {type: DataTypes.STRING},             //Планируемая стоимость без НДС
    factCost: {type: DataTypes.STRING},             //Фактическая стоимость без НДС
    completionPercent: {type: DataTypes.STRING},    //Процент выполнения
    documentConnection: {type: DataTypes.STRING}    //Типы документов для связи
  });
};
