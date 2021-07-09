const express = require('express');
const router = express.Router();
const { getWorldStats, getAllCountriesStats, getSingleCountryStats } = require('../controllers/v2');



router.route('/world-stats').get(getWorldStats);
router.route('/all-countries-stats').get(getAllCountriesStats);
router.route('/country-stats/:country').get(getSingleCountryStats);

module.exports = router;