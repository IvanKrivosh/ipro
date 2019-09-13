const db = require('../config/db.config.js');
const ControlStep = db.controlStepTemplates;
const ControlStepJob = db.controlStepJobs;
const TitulControlStep = db.titulControlSteps;
const TitulControlStepJob = db.titulControlStepJobs;

exports.getControlStepTemplates = async (req, res) => {
  try {
    let controlStepTemplates = await ControlStep.findAll({raw: true});
    res.json(controlStepTemplates);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  }
};

exports.getControlStepJobs = async (req, res) => {
  try {
    let query =
      'SELECT *, case "isHead" when true then \'Да\' else \'Нет\' end as "isHeadString" FROM "controlStepJobs"';

    if (req.query.templateId != null) {
      query += ` WHERE "templateId" = ${req.query.templateId}`;
    }

    let controlStepJobs = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT});
    res.json(controlStepJobs);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  }
};

exports.createTitulControlSteps = async (req, res) => {
  let start = new Date(2000, 1, 1);
  let end = new Date();

  try {
    let titulControlStep = await TitulControlStep.create({
      templateId: req.query.templateId,
      titulId: req.query.titulId
    });

    let controlStepJobs = await ControlStepJob.findAll({
      raw: true,
      where: {
        templateId: req.query.templateId
      }
    });

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
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  }
};

exports.getTitulControlStepJobs = async (req, res) => {
  if (req.query.titulId == null || req.query.templateId == null) {
    res.status(400).json({msg: "error", details: '"titulId" and "templateId" must not be empty'});
    return;
  }

  let query = `SELECT tj.*, j."name" AS "jobName", j."type" AS "jobType", j."number" AS "jobNumber" 
  FROM "titulControlStepJobs" tj 
  JOIN "controlStepJobs" j ON j."id" = tj."controlStepJobId"
  JOIN "titulControlSteps" s ON s."id" = tj."titulControlStepId"
  WHERE s."titulId" = ${req.query.titulId} AND j."templateId" = ${req.query.templateId}`;

  try {
    let titulControlStepJobs = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT});
    res.json(titulControlStepJobs);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  }
};
