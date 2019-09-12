//Акт выполненных работ
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('completionAct', {
    contractId: {                                     //Договор
      type: DataTypes.INTEGER,
      references: {
        model: 'contracts',
        key: 'id'
      }
    },
    documentNumber: {type: DataTypes.STRING},         //Номер документа
    documentTypeId: {                                 //Тип документа
      type: DataTypes.INTEGER,
      references: {
        model: 'documentTypes',
        key: 'id'
      }
    },
    costTypeId: {                                     //Вид затрат
      type: DataTypes.INTEGER,
      references: {
        model: 'costTypes',
        key: 'id'
      }
    },
    objectId: {                                       //Объект
      type: DataTypes.INTEGER,
      references: {
        model: 'objects',
        key: 'id'
      }
    },
    documentDate: {type: DataTypes.DATEONLY},         //Дата документа
    sum: {type: DataTypes.DECIMAL(10, 2)},            //Сумма по документу
    vat: {type: DataTypes.DECIMAL(10, 2)},            //В т.ч. НДС
    estimateText: {type: DataTypes.TEXT},             //Текст сметы
    estimateFileId: {                                 //Файл сметы
      type: DataTypes.INTEGER,
      references: {
        model: 'files',
        key: 'id'
      }
    },
    ks2Text: {type: DataTypes.TEXT},                  //Текст КС-2
    ks2FileId: {                                      //Файл КС-2
      type: DataTypes.INTEGER,
      references: {
        model: 'files',
        key: 'id'
      }
    },
  });
};
