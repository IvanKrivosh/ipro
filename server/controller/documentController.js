const db = require('../config/db.config.js');
const Document = db.documents;

exports.getDocuments = (req, res) => {
  let query =
    `select d.*, t.number as "numberTitul",
dt.name as "documentTypeName",
dep.name as "departmentName",
(d.sum / 100 * v.percent) as "vatValue"
from documents d
join tituls t on t.id = d."titulId"
join "documentTypes" dt on dt.id = d."documentTypeId"
join "vatPercents" v on v.id = d."vatPercentId"
join departments dep on dep.id = d."departmentId"`;

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
