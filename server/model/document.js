//Документ
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('document', {
    number: {type: DataTypes.STRING},       //Номер документа
    date: {type: DataTypes.DATEONLY},       //Дата документа
    documentTypeId: {                       //Тип документа
      type: DataTypes.INTEGER,
      references: {
        model: 'documentTypes',
        key: 'id'
      }
    },
    description: {type: DataTypes.STRING},  //Описание
    titulId: {                              //Титул
      type: DataTypes.INTEGER,
      references: {
        model: 'tituls',
        key: 'id'
      }
    },
    departmentId: {                         //Подразделение, составившее документ
      type: DataTypes.INTEGER,
      references: {
        model: 'departments',
        key: 'id'
      }
    },
    filePath: {type: DataTypes.STRING},     //Путь к основному файлу
    sum: {type: DataTypes.DECIMAL(10, 2)},  //Сумма документа
    vatPercentId: {                         //Процент НДС
      type: DataTypes.INTEGER,
      references: {
        model: 'vatPercents',
        key: 'id'
      }
    },
    isClosed: {type: DataTypes.BOOLEAN},    //Признак "Закрыт"
    comments: {type: DataTypes.STRING},      //Примечания
    documentKindId: {                       //Вид документа
    type: DataTypes.INTEGER,
      references: {
      model: 'documentKind',
        key: 'id'
    }
  },
    idFile: {                       //id файла
      type: DataTypes.INTEGER,
      references: {
        model: 'file',
        key: 'id'
      }
    }
  });
};
