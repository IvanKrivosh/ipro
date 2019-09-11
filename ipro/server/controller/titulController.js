const db = require('../config/db.config.js');

const Titul = db.tituls;

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
  Titul.findAll({raw: true}).then(tituls => {
    res.json(tituls);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};
