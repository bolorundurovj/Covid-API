const express = require('express');
const router = express.Router();
const { getWorldStats } = require('../controllers/v2');



router.route('/world-stats').get(getWorldStats);
router.route('/all-countries').get(getWorldStats);

module.exports = router;