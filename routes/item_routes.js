const express = require('express');
const itemController = require('../controllers/item_controller');
// const router = express.json();
const router = express.Router();

const bodyParser = require('body-parser');

// Configura bodyParser para procesar datos POST.
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/getUser', itemController.getItems);
router.post('/envioUser', itemController.sendItems);
router.post('/registro', itemController.addItem);
router.post('/verificacion', itemController.verifyItem);

module.exports = router;
