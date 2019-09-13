const db = require('../config/db.config.js');
const ControlStep = db.controlStepTemplates;
const ControlStepJob = db.controlStepJobs;

exports.getControlStepTemplates = (req, res) => {
  ControlStep.findAll({raw: true}).then(controlStepTemplates => {
    res.json(controlStepTemplates);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getControlStepJobs = (req, res) => {
  let query =
    'SELECT *, case "isHead" when true then \'Да\' else \'Нет\' end as "isHeadString" FROM "controlStepJobs"';

  if (req.query.templateId != null) {
    query += ` WHERE "templateId" = ${req.query.templateId}`;
  }

  db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT})
    .then(controlStepJobs => {
      res.json(controlStepJobs);
    }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};
