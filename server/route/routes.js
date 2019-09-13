const express = require('express');
const router = express.Router();

const titulController = require('../controller/titulController.js');
const uploadController = require('../controller/uploadController');
const dictionaryController = require('../controller/dictionaryController');
const contractController = require('../controller/contractController');
const controlStepController = require('../controller/controlStepController');
const documentController = require('../controller/documentController');

router.get('/titul/:id', titulController.getTitulById);
router.get('/tituls', titulController.getTituls);

router.post('/upload', uploadController.upload);
router.get('/files', uploadController.getFiles);
router.get('/file', uploadController.download);

router.get('/departments', dictionaryController.getDepartments);
router.get('/documentKinds', dictionaryController.getDocumentKinds);
router.get('/documentTypes', dictionaryController.getDocumentTypes);
router.get('/federationEntities', dictionaryController.getFederationEntities);
router.get('/investmentDirections', dictionaryController.getInvestmentDirections);
router.get('/investmentSections', dictionaryController.getInvestmentSections);
router.get('/titulStatuses', dictionaryController.getTitulStatuses);
router.get('/vatPercents', dictionaryController.getVatPercents);
router.get('/costTypes', dictionaryController.getCostTypes);
router.get('/limitTypes', dictionaryController.getLimitTypes);
router.get('/objects', dictionaryController.getObjects);

router.get('/contracts', contractController.getContracts);
router.get('/acts', contractController.getActs);
router.get('/orders', contractController.getOrders);
router.post('/act', contractController.postAct);

router.get('/controlStepTemplates', controlStepController.getControlStepTemplates);
router.get('/controlStepJobs', controlStepController.getControlStepJobs);
router.post('/titulControlSteps', controlStepController.createTitulControlSteps);
router.get('/titulControlStepJobs', controlStepController.getTitulControlStepJobs);

router.get('/documents', documentController.getDocuments);


module.exports = router;

