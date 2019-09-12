const express = require('express');
const router = express.Router();

const titulController = require('../controller/titulController.js');
const upload = require('../controller/upload');
const dictionaryController = require('../controller/dictionaryController')
const contractController = require('../controller/contractController')

router.get('/titul/:id', titulController.getTitulById);
router.get('/tituls', titulController.getTituls);

router.post('/upload', upload);

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

module.exports = router;

