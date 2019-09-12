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
};
