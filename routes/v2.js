const express = require('express');
const router = express.Router();
const {
  getWorldStats,
  getAllCountriesStats,
  getSingleCountryStats,
  getAllCountriesTimeline,
  getSingleCountryTimeline,
} = require('../controllers/v2');

router.route('/world-stats').get(getWorldStats);

/**
 * @route     GET /all-countries-stats
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * For API Documentation
 * @api {get} /all-countries-stats Get All Countries
 * @apiVersion 2.0.0
 * @apiName Get All Countries
 * @apiGroup V2
 *
 * @apiDescription Get every country data
 *
 * @apiSuccess (200) {Object} response  Response Object containing desired information.
 * @apiSuccess (200) {Object} response.pagination  Object containning pagination information.
 * @apiSuccess (200) {Array} response.data  Array containing client objects.
 * @apiSuccessExample {json} Success-Response Example:
 * HTTP/1.1 200 OK
 * [
 *   {
 *       "activeCases": 2,
 *       "confirmedCases": 2530,
 *       "recoveredCases": 2444,
 *       "fatalCases": 84,
 *       "newCases": 0,
 *       "location": {
 *           "type": "Point",
 *           "coordinates": [
 *               -61.7964,
 *               17.0608
 *           ]
 *       },
 *       "fatalityRatio": 3.3201581027667983,
 *       "incidentRate": 1291.7653786455355,
 *       "country": "Antigua and Barbuda",
 *       "lastUpdated": "2021-07-08T03:21:26.000Z",
 *       "subGroups": 2
 *   },
 *   {
 *       "activeCases": 574657,
 *       "confirmedCases": 9168103,
 *       "recoveredCases": 8399024,
 *       "fatalCases": 194422,
 *       "newCases": 19423,
 *       "location": {
 *           "type": "Point",
 *           "coordinates": [
 *               -63.6167,
 *               -38.4161
 *           ]
 *       },
 *       "fatalityRatio": 2.1211150858239747,
 *       "incidentRate": 10164.142105577697,
 *       "country": "Argentina",
 *       "lastUpdated": "2021-07-08T03:21:26.000Z",
 *       "subGroups": 2
 *   },
 *]
 */
router.route('/all-countries-stats').get(getAllCountriesStats);

/**
 * @route     GET /country-stats/:country
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * For API Documentation
 * @api {get} /country-stats/:country Get Covid Data By Country
 * @apiVersion 2.0.0
 * @apiName Get Covid Data By Country
 * @apiGroup V2
 *
 * @apiDescription Get the latest update on a country
 *
 * @apiParam (Url Parameters) {String} country Country Name.
 *
 * @apiSuccess (200) {Array} response  Array containing data objects.
 * @apiSuccessExample {json} Success-Response Example:
 * HTTP/1.1 200 OK
 * {
 *    [
 *       {
 *           "location": {
 *               "type": "Point",
 *               "coordinates": [
 *                   8.6753,
 *                   9.082
 *               ]
 *           },
 *           "state": "",
 *           "stateCountry": "Nigeria",
 *           "activeCases": 1580,
 *           "confirmedCases": 168110,
 *           "fatalCases": 2122,
 *           "recoveredCases": 164408,
 *           "newCases": 0,
 *           "incidentRate": 81.551536241314,
 *           "fatalityRatio": 1.2622687526024627,
 *           "country": "Nigeria",
 *           "lastUpdated": "2021-07-08T03:21:26.000Z"
 *       },
 *   ]
 *  }
 */
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
