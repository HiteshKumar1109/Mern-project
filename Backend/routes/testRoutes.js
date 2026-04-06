const express = require('express');
const router = express.Router();
const { getAllTests, getTestById } = require('../controllers/testController');

router.get('/', getAllTests);
router.get('/:testId', getTestById);

module.exports = router;
