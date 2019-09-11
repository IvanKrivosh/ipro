//Распоряжение на оплату
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('paymentOrder', {
    contractId: {                                     //Договор
      type: DataTypes.INTEGER,
      references: {
        model: 'contracts',
        key: 'id'
      }
    },
    number: {type: DataTypes.STRING},                 //Уникальный номер РНО
    costTypeId: {                                     //Вид затрат
      type: DataTypes.INTEGER,
      references: {
        model: 'costTypes',
        key: 'id'
      }
    },
    paymentType: {type: DataTypes.STRING},            //Тип оплаты (аванс/погашение КЗ)
    paymentDate: {type: DataTypes.DATEONLY},          //Дата оплаты
    sum: {type: DataTypes.DECIMAL(10, 2)},            //Сумма оплаченная
    vat: {type: DataTypes.DECIMAL(10, 2)}             //В т.ч. НДС
  });
};
