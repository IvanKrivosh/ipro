const db = require('../config/db.config.js');
const Contract = db.contracts;
const Act = db.completionActs;

exports.getContracts = (req, res) => {

  let query =
    `select t.number as "numberTitul", s.name as "nameStatus", c.*
from contracts c 
left join tituls t on t.id = c."titulId"
left join statuses s on s.id = c."idStatus"`;

  db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT})
    .then(contr => {
      res.json(contr);
    }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getActs = (req, res) => {
  let query =
    `SELECT a.*, c."number" AS "contractNumber", ct."name" AS "costTypeName", dt."name" AS "documentTypeName"
    FROM "completionActs" a 
    JOIN "contracts" c 
    ON c."id" = a."contractId"
    JOIN "costTypes" ct 
    ON ct."id" = a."costTypeId"
    JOIN "documentTypes" dt
    ON dt."id" = a."documentTypeId"`;

  if (req.query.contractId != null) {
    query += ` WHERE a."contractId" = ${req.query.contractId}`;
  }

  if (req.query.id != null) {
    query += ` WHERE a."id" = ${req.query.id}`;
  }

  db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT})
    .then(acts => {
      res.json(acts);
    }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.postAct = (req, res) => {
  Act.create(req.body).then(act => {
    console.log(act);
    res.status(201).json(act.dataValues);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getOrders = (req, res) => {
  let query =
    'SELECT o.*, c."number" AS "contractNumber", ct."name" AS "costTypeName"' +
    'FROM "paymentOrders" o ' +
    'JOIN "contracts" c ' +
    'ON c."id" = o."contractId" ' +
    'JOIN "costTypes" ct ' +
    'ON ct."id" = o."costTypeId"';

  if (req.query.contractId != null) {
    query += ` WHERE o."contractId" = ${req.query.contractId}`;
  }

  if (req.query.id != null) {
    query += ` WHERE o."id" = ${req.query.id}`;
  }

  db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT})
    .then(orders => {
      res.json(orders);
    }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};
