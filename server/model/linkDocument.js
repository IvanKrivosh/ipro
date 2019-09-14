//Связуюущая таблица актов и документов
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('linkDocument', {
    documentId: {                                     // Документ
      type: DataTypes.INTEGER,
      references: {
        model: 'documents',
        key: 'id'
      }
    },
    completionActId: {                                 // Акт выполнения
      type: DataTypes.INTEGER,
      references: {
        model: 'completionActs',
        key: 'id'
      }
    }
  });
};
