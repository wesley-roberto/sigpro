const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

router.get('/', companyController.getAll);
router.post('/', companyController.create);

module.exports = router;