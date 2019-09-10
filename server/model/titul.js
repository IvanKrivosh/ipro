const Department = require('./department').Department;
const InvestmentDirection = require('./investmentDirection').InvestmentDirection;
const InvestmentSection = require('./investmentSection').InvestmentSection;
const TitulStatus = require('./titulStatus').TitulStatus;

//Титул
module.exports = (sequelize, DataTypes) => {
  const Titul = sequelize.define('titul', {
    name: {type: DataTypes.STRING},                   //Название
    number: {type: DataTypes.STRING},                 //Номер титула
    statusId: {                                       //Статус титула
      type: DataTypes.INTEGER,
      references: {
        model: 'titulStatuses',
        key: 'id'
      }
    },
    startYear: {type: DataTypes.INTEGER},             //Год начала
    startMonth: {type: DataTypes.INTEGER},            //Месяц начала
    endYear: {type: DataTypes.INTEGER},               //Год окончания
    endMonth: {type: DataTypes.INTEGER},              //Месяц окончания
    customerId: {                                     //Заказчик
      type: DataTypes.INTEGER,
      references: {
        model: 'departments',
        key: 'id'
      }
    },
    performerId: {                                    //Исполнитель
      type: DataTypes.INTEGER,
      references: {
        model: 'departments',
        key: 'id'
      }
    },
    investmentDirectionId: {                          //Направление инвестиций
      type: DataTypes.INTEGER,
      references: {
        model: 'investmentDirections',
        key: 'id'
      }
    },
    investmentSectionId: {                            //Раздел ИПР
      type: DataTypes.INTEGER,
      references: {
        model: 'investmentSections',
        key: 'id'
      }
    },
    belonging: {type: DataTypes.STRING},              //Принадлежность к важным объектам, программам
    includeCriteria: {type: DataTypes.STRING},        //Критерий включения в ИПР
    includePriority: {type: DataTypes.STRING},        //Приоритет включения
    targetProgram: {type: DataTypes.STRING},          //Целевая программа
    minenergoCriteria: {type: DataTypes.STRING},      //Критерий Минэнерго
    sociallySignificant: {type: DataTypes.STRING},    //Признак социально значимого объекта
    titulType: {type: DataTypes.STRING},              //Тип титула
    importance: {type: DataTypes.STRING},             //Степень важности
    curator: {type: DataTypes.STRING},                //Куратор
    aims: {type: DataTypes.STRING},                   //Цели проекта
    problems: {type: DataTypes.STRING},               //Решаемые задачи
    address: {type: DataTypes.STRING},                //Адрес
    comments: {type: DataTypes.STRING}                //Примечания
  });
  return Titul;
};
