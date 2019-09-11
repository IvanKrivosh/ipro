const express = require('express');
const router = express.Router();

const titulController = require('../controller/titulController.js');
const upload = require('../controller/upload');
const dictionaryController = require('../controller/dictionaryController')

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

module.exports = router;

