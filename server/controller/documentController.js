const db = require('../config/db.config.js');
const Document = db.documents;

exports.getDocuments = (req, res) => {
  let query =
    `select d.*, t.number as "numberTitul",
dt.name as "documentTypeName",
dep.name as "departmentName",
round((d.sum / 100 * v.percent), 2) as "vatValue",
f."stringKey"
from documents d
join tituls t on t.id = d."titulId"
join "documentTypes" dt on dt.id = d."documentTypeId"
join "vatPercents" v on v.id = d."vatPercentId"
join departments dep on dep.id = d."departmentId"
left join files f on f.id = d."idFile"`;

  if (req.query.id != null) {
    query += ` WHERE d."id" = ${req.query.id}`;
  }

  db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT})
    .then(docs => {
      res.json(docs);
    }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });

};

exports.updateDocument = (req, res) => {
  const id = req.query.id;
  Document.update( req.body,
    {
      where: {id: id} }).then(() => {
      res.status(200).json({id: id});
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};
