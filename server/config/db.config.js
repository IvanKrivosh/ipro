const app_conf = require('./app.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(app_conf.env.database, app_conf.env.username, app_conf.env.password, {
  host: app_conf.env.host,
  dialect: app_conf.env.dialect,
  pool: {
    max: app_conf.env.max,
    min: app_conf.env.pool.min,
    acquire: app_conf.env.pool.acquire,
    idle: app_conf.env.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.departments = require('../model/department.js')(sequelize, Sequelize);
db.investmentDirections = require('../model/investmentDirection.js')(sequelize, Sequelize);
db.investmentSections = require('../model/investmentSection.js')(sequelize, Sequelize);
db.tituls = require('../model/titul.js')(sequelize, Sequelize);
db.titulStatuses = require('../model/titulStatus.js')(sequelize, Sequelize);
db.federationEntities = require('../model/federationEntity.js')(sequelize, Sequelize);
db.documents = require('../model/document.js')(sequelize, Sequelize);
db.documentKinds = require('../model/documentKind.js')(sequelize, Sequelize);
db.documentTypes = require('../model/documentType.js')(sequelize, Sequelize);
db.files = require('../model/file.js')(sequelize, Sequelize);
db.vatPercents = require('../model/vatPercent.js')(sequelize, Sequelize);
db.completionActs = require('../model/completionAct.js')(sequelize, Sequelize);
db.contracts = require('../model/contract.js')(sequelize, Sequelize);
db.costTypes = require('../model/costType.js')(sequelize, Sequelize);
db.paymentOrders = require('../model/paymentOrder.js')(sequelize, Sequelize);
db.controlStepJobs = require('../model/controlStepJob.js')(sequelize, Sequelize);
db.controlStepTemplates = require('../model/controlStepTemplate.js')(sequelize, Sequelize);
db.titulControlSteps = require('../model/titulControlStep.js')(sequelize, Sequelize);
db.titulControlStepJobs = require('../model/titulControlStepJob.js')(sequelize, Sequelize);
db.objects = require('../model/object')(sequelize, Sequelize);
db.financePlanSections = require('../model/financePlanSection.js')(sequelize, Sequelize);
db.limits = require('../model/limit.js')(sequelize, Sequelize);
db.limitTypes = require('../model/limitType.js')(sequelize, Sequelize);

module.exports = db;
