const express = require('express');
const router = express.Router();
const { getAll, getGeoJSON, getSingleCountry, getAllCountryTimeline, getSingleTimeline } = require('../controllers/v1');

/**
 * @route     GET /all
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * For API Documentation
 * @api {get} /all Get All Countries
 * @apiVersion 1.0.0
 * @apiName Get All Countries
 * @apiGroup V1
 *
 * @apiDescription Get the world data, as well as every country data
 *
 * @apiSuccess (200) {Object} response  Response Object containing desired information.
 * @apiSuccess (200) {Object} response.pagination  Object containning pagination information.
 * @apiSuccess (200) {Array} response.data  Array containing client objects.
 * @apiSuccessExample {json} Success-Response Example:
 * HTTP/1.1 200 OK
 * {
 *   {
 *   "_id": "5eda3cb82be7631edc9ae898",
 *   "total_confirmed": 6632985,
 *   "total_deaths": 391136,
 *   "total_recovered": 2869963,
 *   "total_active": 3426940,
 *   "last_date_updated": "2020-06-05T12:38:13.003Z",
 *   "country_statistics": [
 *       {
 *           "country": "Australia",
 *           "code": "AU",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_australia.png",
 *           "coordinates": [
 *               133.775136,
 *               -25.274398
 *           ],
 *           "confirmed": 7247,
 *           "deaths": 102,
 *           "recovered": 6683,
 *           "states": [
 *               {
 *                   "key": "5v50p",
 *                   "name": "Victoria",
 *                   "address": "Victoria, Australia",
 *                   "latitude": -37.8136,
 *                   "longitude": 144.9631,
 *                   "confirmed": "1681",
 *                   "deaths": "19",
 *                   "active": "76",
 *                   "recovered": "1586"
 *               },
 *               {
 *                   "key": "z28cy",
 *                   "name": "Western Australia",
 *                   "address": "Western Australia, Australia",
 *                   "latitude": -31.9505,
 *                   "longitude": 115.8605,
 *                   "confirmed": "592",
 *                   "deaths": "9",
 *                   "active": "26",
 *                   "recovered": "557"
 *               }
 *           ]
 *       },
 *
 *       {
 *           "country": "Ecuador",
 *           "code": "EC",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_ecuador.png",
 *           "coordinates": [
 *               -78.183406,
 *               -1.831239
 *           ],
 *           "confirmed": 40966,
 *           "deaths": 3486,
 *           "recovered": 20019,
 *           "states": [
 *               {
 *                   "key": "4b5w3",
 *                   "name": "Ecuador",
 *                   "address": "Ecuador",
 *                   "latitude": -1.8312,
 *                   "longitude": -78.1834,
 *                   "confirmed": "40966",
 *                   "deaths": "3486",
 *                   "active": "17461",
 *                   "recovered": "20019"
 *               }
 *           ]
 *       },
 *
 *       {
 *           "country": "Nigeria",
 *           "code": "NG",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_nigeria.png",
 *           "coordinates": [
 *               8.675277,
 *               9.081999
 *           ],
 *           "confirmed": 11516,
 *           "deaths": 323,
 *           "recovered": 3535,
 *           "states": [
 *               {
 *                   "key": "vbbqa",
 *                   "name": "Nigeria",
 *                   "address": "Nigeria",
 *                   "latitude": 9.082,
 *                   "longitude": 8.6753,
 *                   "confirmed": "11516",
 *                   "deaths": "323",
 *                   "active": "7658",
 *                   "recovered": "3535"
 *               }
 *           ]
 *       },
 *   ]
 * }
 *}
 */

router.route('/all').get(getAll);

/**
 * @route     GET /geojson
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * For API Documentation
 * @api {get} /geojson Get Covid GeoData
 * @apiVersion 1.0.0
 * @apiName Get Covid GeoData
 * @apiGroup V1
 *
 * @apiDescription Get data in GeoJSON format, which is optimised for populating maps
 *
 * @apiSuccess (200) {Array} response  Array containing data objects.
 * @apiSuccessExample {json} Success-Response Example:
 * HTTP/1.1 200 OK
 * {
 *    [
 *        {
 *           "type": "Feature",
 *           "geometry": {
 *               "type": "Point",
 *               "coordinates": [
 *                   -4.7278,
 *                   37.5443
 *               ]
 *           },
 *           "properties": {
 *               "key": 0,
 *               "country": "Spain",
 *               "name": "Andalusia",
 *               "address": "Andalusia, Spain",
 *               "confirmed": 12743,
 *               "deaths": 1404,
 *               "recovered": 10671,
 *               "active": 668,
 *               "total_cases": 24818
 *           }
 *       },
 *       {
 *           "type": "Feature",
 *           "geometry": {
 *               "type": "Point",
 *               "coordinates": [
 *                   -0.9057,
 *                   41.5976
 *               ]
 *           },
 *           "properties": {
 *               "key": 1,
 *               "country": "Spain",
 *               "name": "Aragon",
 *               "address": "Aragon, Spain",
 *               "confirmed": 5734,
 *               "deaths": 826,
 *               "recovered": 3772,
 *               "active": 1136,
 *               "total_cases": 10332
 *           }
 *       },
 *    ]
 * }
 */

router.route('/geojson').get(getGeoJSON);

/**
 * @route     GET /country/:country
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * For API Documentation
 * @api {get} /country/:country Get Covid Data By Country
 * @apiVersion 1.0.0
 * @apiName Get Covid Data By Country
 * @apiGroup V1
 *
 * @apiDescription Get the latest update on a country
 *
 * @apiParam (Url Parameters) {String} country Country Name.
 *
 * @apiSuccess (200) {Array} response  Array containing data objects.
 * @apiSuccessExample {json} Success-Response Example:
 * HTTP/1.1 200 OK
 * {
 *    "country": "Nigeria",
 *    "code": "NG",
 *    "flag": "https://assets.hackbotone.com/images/flags/flag_nigeria.png",
 *    "coordinates": [
 *        8.675277,
 *        9.081999
 *    ],
 *    "confirmed": 11516,
 *    "deaths": 323,
 *    "recovered": 3535,
 *    "states": [
 *        {
 *            "key": "t1df0",
 *            "name": "Nigeria",
 *            "address": "Nigeria",
 *            "latitude": 9.082,
 *            "longitude": 8.6753,
 *            "confirmed": "11516",
 *            "deaths": "323",
 *            "active": "7658",
 *            "recovered": "3535"
 *        }
 *    ]
 *  }
 */

router.route('/country/:country').get(getSingleCountry);

/**
 * @route     GET /timeline/all
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * For API Documentation
 * @api {get} /timeline/all Get Covid Timeline For All Countries
 * @apiVersion 1.0.0
 * @apiName Get Covid Timeline For All Countries
 * @apiGroup V1
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
 *         {
 *         "cases": 5,
 *         "country": "Afghanistan",
 *         "date": "2020-01-23T23:00:00.000Z"
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
 *         {
 *         "cases": 5,
 *         "country": "Cuba",
 *         "date": "2020-01-23T23:00:00.000Z"
 *         },
 *       ],
 * }
 */

router.route('/timeline/all').get(getAllCountryTimeline);

/**
 * @route     GET /timeline/:country
 * @access    Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * For API Documentation
 * @api {get} /timeline/:country Get Covid Timeline For A Country
 * @apiVersion 1.0.0
 * @apiName Get Covid Timeline For A Country
 * @apiGroup V1
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
 *         {
 *             "cases": 22,
 *             "country": "Nigeria",
 *             "date": "2020-03-21T00:00:00.000Z"
 *         },
 *         {
 *             "cases": 30,
 *             "country": "Nigeria",
 *             "date": "2020-03-22T00:00:00.000Z"
 *         },
 *         {
 *             "cases": 40,
 *             "country": "Nigeria",
 *             "date": "2020-03-23T00:00:00.000Z"
 *         },
 *    ]
 * }
 */

router.route('/timeline/:country').get(getSingleTimeline);

module.exports = router;
