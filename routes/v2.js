const express = require('express');
const router = express.Router();
const { getWorldStats, getAllCountriesStats, getSingleCountryStats, getAllCountriesTimeline, getSingleCountryTimeline } = require('../controllers/v2');



router.route('/world-stats').get(getWorldStats);
router.route('/all-countries-stats').get(getAllCountriesStats);
router.route('/country-stats/:country').get(getSingleCountryStats);

/**
 * @route     GET /all-countries-timeline
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * For API Documentation
 * @api {get} /all-countries-timeline Get Covid Timeline For All Countries
 * @apiVersion 2.0.0
 * @apiName Get Covid Timeline For All Countries
 * @apiGroup V2
 *
 * @apiDescription Get the timeline of the daily cases for all countries
 *
 * @apiSuccess (200) {Array} response  Array containing data objects.
 * @apiSuccessExample {json} Success-Response Example:
 * HTTP/1.1 200 OK
 * {
 *    "Afghanistan": [
 *         {
 *         "cases": 0,
 *         "country": "Afghanistan",
 *         "date": "2020-01-21T23:00:00.000Z"
 *         },
 *         {
 *         "cases": 2,
 *         "country": "Afghanistan",
 *         "date": "2020-01-22T23:00:00.000Z"
 *         },
 *       ],
 *    "Cuba": [
 *         {
 *         "cases": 0,
 *         "country": "Cuba",
 *         "date": "2020-01-21T23:00:00.000Z"
 *         },
 *         {
 *         "cases": 2,
 *         "country": "Cuba",
 *         "date": "2020-01-22T23:00:00.000Z"
 *         },
 *       ],
 * }
 */
router.route('/all-countries-timeline').get(getAllCountriesTimeline);

/**
 * @route     GET /country-timeline/:country
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * For API Documentation
 * @api {get} /country-timeline/:country Get Covid Timeline For A Country
 * @apiVersion 2.0.0
 * @apiName Get Covid Timeline For A Country
 * @apiGroup V2
 *
 * @apiDescription Get the timeline of daily cases in a country from January 2020 to date
 *
 * @apiParam (Url Parameters) {String} country Country Name.
 *
 * @apiSuccess (200) {Array} response  Array containing data objects.
 * @apiSuccessExample {json} Success-Response Example:
 * HTTP/1.1 200 OK
 * {
 *    [
 *        {
 *             "cases": 8,
 *             "country": "Nigeria",
 *             "date": "2020-03-18T00:00:00.000Z"
 *         },
 *         {
 *             "cases": 8,
 *             "country": "Nigeria",
 *             "date": "2020-03-19T00:00:00.000Z"
 *         },
 *         {
 *             "cases": 12,
 *             "country": "Nigeria",
 *             "date": "2020-03-20T00:00:00.000Z"
 *         },
 *    ]
 * }
 */
router.route('/country-timeline/:country').get(getSingleCountryTimeline);

module.exports = router;