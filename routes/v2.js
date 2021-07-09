const express = require('express');
const router = express.Router();
const {
  getWorldStats,
  getAllCountriesStats,
  getSingleCountryStats,
  getAllCountriesTimeline,
  getSingleCountryTimeline,
} = require('../controllers/v2');

/**
 * @route     GET /world-stats
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * For API Documentation
 * @api {get} /world-stats Get World Stats
 * @apiVersion 2.0.0
 * @apiName Get World Stats
 * @apiGroup V2
 *
 * @apiDescription Get worldwide stats
 *
 * @apiSuccess (200) {number} activeCases  Total Active Cases.
 * @apiSuccess (200) {number} confirmedCases  Total Confirmed Cases.
 * @apiSuccess (200) {number} recoveredCases  Total Recovered Cases.
 * @apiSuccess (200) {number} fatalCases  Total Deaths.
 * @apiSuccess (200) {number} newCases  Total New Cases.
 * @apiSuccess (200) {number} fatalityRatio  Ratio of Deaths to Cases.
 * @apiSuccess (200) {number} incidentRate  Rate at which cases are occuring.
 * @apiSuccess (200) {date} lastUpdated  Date of last entry.
 * @apiSuccessExample {json} Success-Response Example:
 * HTTP/1.1 200 OK
 * {
 *    "activeCases": 51988932,
 *    "confirmedCases": 369687855,
 *    "recoveredCases": 243394199,
 *    "fatalCases": 7994906,
 *    "newCases": 463849,
 *    "fatalityRatio": 3.275939362744284,
 *    "incidentRate": 405.2162807500837,
 *    "lastUpdated": "2021-07-08T03:21:26.000Z",
 *    "subGroups": 7974
 *}
 */

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
 * @apiSuccess (200) {string} country  Country Name.
 * @apiSuccess (200) {number} activeCases  Total Active Cases.
 * @apiSuccess (200) {number} confirmedCases  Total Confirmed Cases.
 * @apiSuccess (200) {number} recoveredCases  Total Recovered Cases.
 * @apiSuccess (200) {number} fatalCases  Total Deaths.
 * @apiSuccess (200) {number} newCases  Total New Cases.
 * @apiSuccess (200) {number} fatalityRatio  Ratio of Deaths to Cases.
 * @apiSuccess (200) {number} incidentRate  Rate at which cases are occuring.
 * @apiSuccess (200) {date} lastUpdated  Date of last entry.
 * @apiSuccess (200) {object} location  GeoJSON Location.
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
 * @apiSuccess (200) {string} country  Country Name.
 * @apiSuccess (200) {string} stateCountry  Country Name w/o State/Province.
 * @apiSuccess (200) {number} activeCases  Total Active Cases.
 * @apiSuccess (200) {number} confirmedCases  Total Confirmed Cases.
 * @apiSuccess (200) {number} recoveredCases  Total Recovered Cases.
 * @apiSuccess (200) {number} fatalCases  Total Deaths.
 * @apiSuccess (200) {number} newCases  Total New Cases.
 * @apiSuccess (200) {number} fatalityRatio  Ratio of Deaths to Cases.
 * @apiSuccess (200) {number} incidentRate  Rate at which cases are occuring.
 * @apiSuccess (200) {date} lastUpdated  Date of last entry.
 * @apiSuccess (200) {object} location  GeoJSON Location.
 * @apiSuccessExample {json} Success-Response Example:
 * HTTP/1.1 200 OK
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
 * @apiSuccess (200) {Object} _  Array containing data arrays.
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
 * @apiSuccess (200) {Array} _  Array containing data objects.
 * @apiSuccessExample {json} Success-Response Example:
 * HTTP/1.1 200 OK
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
 */
router.route('/country-timeline/:country').get(getSingleCountryTimeline);

module.exports = router;
