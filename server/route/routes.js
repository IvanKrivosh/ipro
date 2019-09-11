const express = require('express');
const router = express.Router();

const titulController = require('../controller/titulController.js');

router.get('/titul/:id', titulController.getTitulById);
router.get('/tituls', titulController.getTituls);

module.exports = router;

