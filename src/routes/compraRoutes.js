const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

router.post('/', compraController.create);
router.get('/', compraController.getAll);

module.exports = router;