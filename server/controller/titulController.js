const db = require('../config/db.config.js');
const Titul = db.tituls;
const Op = db.Sequelize.Op;

exports.getTitulById = (req, res) => {
  Titul.findByPk(req.params.id).then(titul => {
    res.json(titul);
    if (titul != null) {
      console.log('get id = ' + titul.id);
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getTituls = (req, res) => {
  let query =
    'SELECT t.*, e."name" as "entityName", c."name" as "customerName", p."name" as "performerName", ' +
    'to_char(to_timestamp("startMonth"::text, \'MM\'), \'TMmonth\') || \' \' || "startYear" as "start",' +
    'to_char(to_timestamp("endMonth"::text, \'MM\'), \'TMmonth\') || \' \' || "endYear" as "end" ' +
    'FROM "tituls" t ' +
    'LEFT JOIN "departments" c ' +
    'ON c."id" = t."customerId" ' +
    'LEFT JOIN "departments" p ' +
    'ON p."id" = t."performerId" ' +
    'LEFT JOIN "federationEntities" e ' +
    'ON e."id" = t."federationEntityId"';

  let clauses = [];

  if (req.query.number != null) {
    clauses.push('t."number" LIKE \'' + req.query.number + '%\'');
  }

  if (req.query.name != null) {
    clauses.push('t."name" LIKE \'%' + req.query.name + '%\'');
  }

  if (req.query.customerId != null) {
    clauses.push('t."customerId" = ' + req.query.customerId);
  }

  if (req.query.performerId != null) {
    clauses.push('t."performerId" = ' + req.query.performerId);
  }

  if (req.query.year != null) {
    clauses.push('t."startYear" <= ' + req.query.year + ' AND t."endYear" >= ' + req.query.year);
  }

  if (clauses.length > 0) {
    query += ' WHERE ' + clauses.join(' AND ');
  }

  db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT})
    .then(orders => {
      res.json(orders);
    }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

/*exports.getTituls = (req, res) => {
  let where = {};

  if (req.query.number != null) {
    where.number = {[Op.like]: req.query.number + '%'};
  }

  if (req.query.name != null) {
    where.name = {[Op.like]: '%' + req.query.name + '%'};
  }

  if (req.query.customerId != null) {
    where.customerId = req.query.customerId;
  }

  if (req.query.performerId != null) {
    where.performerId = req.query.performerId;
  }

  if (req.query.year != null) {
    where.startYear = {[Op.lte]: req.query.year};
    where.endYear = {[Op.gte]: req.query.year};
  }

  Titul.findAll({
    where: where,
    raw: true
  }).then(tituls => {
    res.json(tituls);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};*/
