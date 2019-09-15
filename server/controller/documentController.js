const db = require('../config/db.config.js');
const Document = db.documents;

exports.getDocuments = (req, res) => {
  let query =
    `select d.*, f.name as "mainFileName", t.number as "numberTitul",
dt.name as "documentTypeName",
dep.name as "departmentName",
d.vat as "vatValue",
f."stringKey"
from documents d
left join tituls t on t.id = d."titulId"
left join "documentTypes" dt on dt.id = d."documentTypeId"
left join "vatPercents" v on v.id = d."vatPercentId"
left join departments dep on dep.id = d."departmentId"
left join files f on f.id = d."idFile"`;

  let clauses = [];

  if (req.query.id != null) {
    clauses.push(`d."id" = ${req.query.id}`);
  }

  if (req.query.numberTitul != null) {
    clauses.push(`t."number" LIKE \'${req.query.numberTitul}%\'`);
  }

  if (req.query.number != null) {
    clauses.push(`d."number" LIKE \'${req.query.number}%\'`);
  }

  if (req.query.description != null) {
    clauses.push(`d."description" LIKE \'${req.query.description}%\'`);
  }

  if (req.query.sumStart != null) {
    clauses.push(`d.sum >= ${req.query.sumStart}`);
  }

  if (req.query.sumEnd != null) {
    clauses.push(`d.sum <= ${req.query.sumEnd}`);
  }

  if (req.query.dateStart != null) {
    clauses.push(`extract(epoch from d.date) >= (${req.query.dateStart - 3000000})`);
  }

  if (req.query.dateEnd != null) {
    clauses.push(`extract(epoch from d.date) <= (${req.query.dateEnd - 3000000})`);
  }

  if (req.query.idType != null) {
    clauses.push(`d."documentTypeId" = ${req.query.idType}`);
  }

  if (clauses.length > 0) {
    query += ' WHERE ' + clauses.join(' AND ');
  }

  query += ' order by d.id';

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

exports.postDocument = (req, res) => {
  Document.create(req.body).then(doc => {
    console.log(doc);
    res.status(201).json(doc.dataValues);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};
