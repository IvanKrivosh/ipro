//Файл
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('file', {
    uid: {type: DataTypes.STRING},       //Наименование
    name: {type: DataTypes.STRING},       //Наименование
    documentId: {                         //Ссылка на документ
      type: DataTypes.INTEGER,
      references: {
        model: 'documents',
        key: 'id'
      }
    },
    path: {type: DataTypes.STRING}        //Путь в файловой системе
  });
};
