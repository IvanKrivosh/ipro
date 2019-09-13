//Работа по контрольным этапам в титуле
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('titulControlStepJob', {
    titulControlStepId: {                           //Контрольные этапы в титуле
      type: DataTypes.INTEGER,
      references: {
        model: 'titulControlSteps',
        key: 'id'
      }
    },
    controlStepJobId: {                             //Работа по контрольным этапам
      type: DataTypes.INTEGER,
      references: {
        model: 'controlStepJobs',
        key: 'id'
      }
    },
    planStartDate: {type: DataTypes.DATEONLY},        //Планируемая дата начала
    planEndDate: {type: DataTypes.DATEONLY},          //Планируемая дата окончания
    factStartDate: {type: DataTypes.DATEONLY},        //Фактическая дата начала
    factEndDate: {type: DataTypes.DATEONLY},          //Фактическая дата окончания
    defaultReason: {type: DataTypes.STRING},          //Основные причины невыполнения
    suggestions: {type: DataTypes.STRING},            //Предложения по корректирующим мероприятиям по устранению отставания
    planCost: {type: DataTypes.DECIMAL(10, 2)},       //Планируемая стоимость без НДС
    factCost: {type: DataTypes.DECIMAL(10, 2)},       //Фактическая стоимость без НДС
    completionPercent: {type: DataTypes.INTEGER},     //Процент выполнения
    contractId: {                                     //Связь с документами
      type: DataTypes.INTEGER,
      references: {
        model: 'contracts',
        key: 'id'
      }
    }
  });
};
