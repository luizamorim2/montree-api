const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const validate = require('../middlewares/validate');
const { createItemSchema } = require('../validators/itemValidator');

router.post('/', validate(createItemSchema), itemController.create);
router.get('/', itemController.getAll);

module.exports = router;