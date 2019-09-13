const db = require('../config/db.config.js');
const ControlStep = db.controlStepTemplates;
const ControlStepJob = db.controlStepJobs;
const TitulControlStep = db.titulControlSteps;
const TitulControlStepJob = db.titulControlStepJobs;

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

exports.createTitulControlSteps = (req, res) => {
  let start = new Date(2000, 1, 1);
  let end = new Date();

  TitulControlStep.create({
    templateId: req.query.templateId,
    titulId: req.query.titulId
  }).then(titulControlStep => {
      ControlStepJob.findAll({
        raw: true,
        where: {
          templateId: req.query.templateId
        }
      }).then(async controlStepJobs => {
        let titulControlStepJobs = [];
        for (let controlStepJob of controlStepJobs) {
          let titulControlStepJob = await TitulControlStepJob.create({
            titulControlStepId: titulControlStep.id,
            controlStepJobId: controlStepJob.id,
            planStartDate: new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
            planEndDate: new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
            factStartDate: new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
            factEndDate: new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
          });
          titulControlStepJobs.push(titulControlStepJob);
        }
        res.status(201).json(titulControlStepJobs);
      }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
      });
    }
  ).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getTitulControlStepJobs = (req, res) => {
  let query = `SELECT *`
};
