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
  let where = {};
  if (req.query.templateId != null) {
    where.templateId = req.query.templateId;
  }
  ControlStepJob.findAll({
    raw: true,
    where: where
  }).then(controlStepJobs => {
    res.json(controlStepJobs);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};
