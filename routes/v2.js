const express = require('express');
const router = express.Router();
const { getWorldStats, getAllCountriesStats, getSingleCountryStats, getAllCountriesTimeline, getSingleCountryTimeline } = require('../controllers/v2');



router.route('/world-stats').get(getWorldStats);
router.route('/all-countries-stats').get(getAllCountriesStats);
router.route('/country-stats/:country').get(getSingleCountryStats);
router.route('/all-countries-timeline').get(getAllCountriesTimeline);
router.route('/country-timeline/:country').get(getSingleCountryTimeline);

module.exports = router;