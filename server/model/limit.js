//Лимит
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('limit', {
    titulId: {                                  //Титул
      type: DataTypes.INTEGER,
      references: {
        model: 'tituls',
        key: 'id'
      }
    },
    limitTypeId: {                              //Тип лимита
      type: DataTypes.INTEGER,
      references: {
        model: 'limitTypes',
        key: 'id'
      }
    },
    costTypeId: {                               //Вид затрат
      type: DataTypes.INTEGER,
      references: {
        model: 'costTypes',
        key: 'id'
      }
    },
    financePlanSectionId: {                     //Раздел фин плана
      type: DataTypes.INTEGER,
      references: {
        model: 'financePlanSections',
        key: 'id'
      }
    },
    year: {type: DataTypes.INTEGER},            //Год
    month: {type: DataTypes.INTEGER},           //Месяц
    value: {type: DataTypes.DECIMAL(10, 2)},    //Значение
    vatValue: {type: DataTypes.DECIMAL(10, 2)}  //Значение с НДС
  });
};
