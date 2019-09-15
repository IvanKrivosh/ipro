//Договор
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('contract', {
    number: {type: DataTypes.STRING},                 //Номер договора
    titulId: {                                        //Титул
      type: DataTypes.INTEGER,
      references: {
        model: 'tituls',
        key: 'id'
      }
    },
    contractor: {type: DataTypes.STRING},             //Подрядчик
    subject: {type: DataTypes.STRING},                //Предмет договора
    signDate: {type: DataTypes.DATEONLY},             //Дата подписания
    startDate: {type: DataTypes.DATEONLY},            //Дата начала работ
    endDate: {type: DataTypes.DATEONLY},              //Дата окончания работ
    sum: {type: DataTypes.DECIMAL(10, 2)},            //Сумма по договору
    completedSum: {type: DataTypes.DECIMAL(10, 2)},   //Выполнено
    payment: {type: DataTypes.DECIMAL(10, 2)},        //Оплата с учетом аванса и возврата
    debtor: {type: DataTypes.DECIMAL(10, 2)},         //Задолженность дебиторская
    creditor: {type: DataTypes.DECIMAL(10, 2)},       //Задолженность кредиторская
    status: {type: DataTypes.STRING},                  //Статус
    idStatus: {type: DataTypes.INTEGER}               // id статуса
  });
};
