const express = require('express');
const concessionaireController = require('../controllers/concessionaireController');

const router = express.Router();

router.get('/', concessionaireController.getAll);
router.post('/', concessionaireController.create);

module.exports = router;