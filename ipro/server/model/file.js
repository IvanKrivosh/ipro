//Файл
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('file', {
    name: {type: DataTypes.STRING},       //Наименование
    extension: {type: DataTypes.STRING},  //Расширение
    path: {type: DataTypes.STRING},       //Путь в файловой системе
    documentId: {                         //Ссылка на документ
      type: DataTypes.INTEGER,
      references: {
        model: 'documents',
        key: 'id'
      }
    }
  });
};
