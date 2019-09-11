const express = require('express');
const router = express.Router();

const titulController = require('../controller/titulController.js');
const upload = require('../controller/upload');

router.get('/titul/:id', titulController.getTitulById);
router.get('/tituls', titulController.getTituls);

router.post('/upload', upload);

module.exports = router;

