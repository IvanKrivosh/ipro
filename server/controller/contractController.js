const db = require('../config/db.config.js');
const Contract = db.contracts;

exports.getContracts = (req, res) => {
  Contract.findAll({raw: true}).then(contracts => {
    res.json(contracts);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getActs = (req, res) => {
  let query =
    'SELECT a.*, c."number" AS "contractNumber", ct."name" AS "costTypeName", dt."name" AS "documentTypeName"' +
    'FROM "completionActs" a ' +
    'JOIN "contracts" c ' +
    'ON c."id" = a."contractId" ' +
    'JOIN "costTypes" ct ' +
    'ON ct."id" = a."costTypeId" ' +
    'JOIN "documentTypes" dt ' +
    'ON dt."id" = a."documentTypeId"';
  db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT})
    .then(acts => {
      res.json(acts);
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
    'ON ct."id" = o."costTypeId" ';
  db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT})
    .then(orders => {
      res.json(orders);
    }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};
