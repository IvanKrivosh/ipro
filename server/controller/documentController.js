const db = require('../config/db.config.js');
const Document = db.documents;

exports.getDocuments = (req, res) => {
  Document.findAll({raw: true}).then(documents => {
    res.json(documents);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};
