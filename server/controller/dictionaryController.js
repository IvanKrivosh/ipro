const db = require('../config/db.config.js');

const Department = db.departments;
const DocumentKind = db.documentKinds;
const DocumentType = db.documentTypes;
const FederationEntity = db.federationEntities;
const InvestmentDirection = db.investmentDirections;
const InvestmentSection = db.investmentSections;
const TitulStatus = db.titulStatuses;
const VatPercent = db.vatPercents;
const CostType = db.costTypes;
const LimitType = db.limitTypes;
const Objects = db.objects;

exports.getDepartments = (req, res) => {
  Department.findAll({raw: true}).then(departments => {
    res.json(departments);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getDocumentKinds = (req, res) => {
  DocumentKind.findAll({raw: true}).then(documentKinds => {
    res.json(documentKinds);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getDocumentTypes = (req, res) => {
  DocumentType.findAll({raw: true}).then(documentTypes => {
    res.json(documentTypes);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getFederationEntities = (req, res) => {
  FederationEntity.findAll({raw: true}).then(federationEntities => {
    res.json(federationEntities);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getInvestmentDirections = (req, res) => {
  InvestmentDirection.findAll({raw: true}).then(investmentDirections => {
    res.json(investmentDirections);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getInvestmentSections = (req, res) => {
  InvestmentSection.findAll({raw: true}).then(investmentSections => {
    res.json(investmentSections);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getTitulStatuses = (req, res) => {
  TitulStatus.findAll({raw: true}).then(titulStatuses => {
    res.json(titulStatuses);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getVatPercents = (req, res) => {
  VatPercent.findAll({raw: true}).then(vatPercents => {
    res.json(vatPercents);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getCostTypes = (req, res) => {
  CostType.findAll({raw: true}).then(costTypes => {
    res.json(costTypes);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getLimitTypes = (req, res) => {
  LimitType.findAll({raw: true}).then(limitTypes => {
    res.json(limitTypes);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};

exports.getObjects = (req, res) => {
  Objects.findAll({raw: true}).then(objects => {
    res.json(objects);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: "error", details: err});
  });
};
