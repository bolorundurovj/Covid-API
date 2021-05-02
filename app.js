const express = require('express');
const request = require('request');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

require('dotenv').config();

const app = express();

const Data = require('./models/data');
const countryList = require('./countries.json');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'docs')));

const port = process.env.PORT || 4915;

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'));
db.once('open', function (callback) {
  console.log('Database connection succeeded for covid19 Api');
});

cron.schedule('23 59 * * * *', () => {
  let date = new Date(Date.now());
  let day = date.getDate();
  let year = date.getUTCFullYear();
  let month = date.getMonth();
  let time =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  let previousDay = day - 1;
  let correctMonth = month + 1;

  console.log('Date: ' + date);
  console.log('Day: ' + day);
  console.log('Year: ' + year);
  console.log('Month: ' + month);
  console.log('Time: ' + time);
  console.log('Previous Day: ' + previousDay);

  if (previousDay < 10) {
    previousDay = '0' + previousDay;
    console.log('Day Checked: ' + previousDay);
  }
  if (correctMonth < 10) {
    correctMonth = '0' + correctMonth;
    console.log('Month: ' + correctMonth);
  }

  let newDate = correctMonth + '-' + previousDay + '-' + year;

  let fileName = newDate + '.csv';

  const file = fs.createWriteStream(fileName);

  const results = [];
  let data = [];
  let totalConfirmed = 0;
  let totalDeaths = 0;
  let totalRecovered = 0;
  let totalActive = 0;

  request
    .get(
      `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${fileName}`
    )
    .on('error', function (err) {
      console.error(err);
    })
    .pipe(file)
    .on('finish', () => {
      fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          if (results.length > 0) {
            results.forEach((result) => {
              totalActive =
                parseInt(result.Active !== undefined ? result.Active : '0') +
                totalActive;
              totalRecovered += parseInt(result.Recovered);
              totalConfirmed += parseInt(result.Confirmed);
              totalDeaths += parseInt(result.Deaths);
            });

            countryList.forEach((country) => {
              let countryObj = JSON.parse(JSON.stringify(country));
              let state = getStats(countryObj, results);
              data.push(state);
            });

            var items = {
              total_confirmed: totalConfirmed,
              total_deaths: totalDeaths,
              total_recovered: totalRecovered,
              total_active: totalActive,
              last_date_updated: date,
              country_statistics: data.sort(),
            };

            db.collection('covid_statistics').deleteOne({});
            db.collection('covid_statistics')
              .insertOne(items)
              .then(() => {
                console.log('Automatically Inserted Successfully');
              });
          }
        });
    });
});

function getStats(countryObj, results) {
  const statistics = [];

  let country;
  let code;
  let flag;
  let coordinates;

  let confirmed = 0;
  let deaths = 0;
  let recovered = 0;
  let active = 0;

  let state_name;
  let state_latitude;
  let state_longitude;
  let state_address;
  let state_confirmed_count = 0;
  let state_deaths_count = 0;
  let state_recovered_count = 0;

  let country_statistics;

  results.forEach((result) => {
    if (result.Country_Region == countryObj.country) {
      country = result.Country_Region;
      code = countryObj.code;
      flag = countryObj.flag;
      coordinates = countryObj.coordinates;

      active += parseInt(result.Active);
      recovered += parseInt(result.Recovered);
      deaths += parseInt(result.Deaths);
      confirmed += parseInt(result.Confirmed);

      if (result.Province_State.length > 0) {
        state_name = result.Province_State;
      } else {
        state_name = country;
      }
      state_address = result.Combined_Key;

      if (
        result.Lat !== undefined &&
        result.Lat.length > 0 &&
        result.Long_ !== undefined &&
        result.Long_.length > 0
      ) {
        state_latitude = parseFloat(result.Lat);
        state_longitude = parseFloat(result.Long_);
      } else {
        state_latitude = 0.0;
        state_longitude = 0.0;
      }

      state_confirmed_count = result.Confirmed;
      state_deaths_count = result.Deaths;
      state_recovered_count = result.Recovered;
      state_active_count = result.Active;

      let state_statistics = {
        key: Math.random().toString(36).substr(2, 5),
        name: state_name,
        address: state_address,
        latitude: state_latitude,
        longitude: state_longitude,
        confirmed: state_confirmed_count,
        deaths: state_deaths_count,
        active: state_active_count,
        recovered: state_recovered_count,
      };
      statistics.push(state_statistics);
    }
  });

  country_statistics = {
    country: country,
    code: code,
    flag: flag,
    coordinates: coordinates,
    confirmed: confirmed,
    deaths: deaths,
    recovered: recovered,
    active: active,
    states: statistics.sort(),
  };

  return country_statistics;
}

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
 * @apiGroup Data
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
 *                   "key": "e172v",
 *                   "name": "Australian Capital Territory",
 *                   "address": "Australian Capital Territory, Australia",
 *                   "latitude": -35.4735,
 *                   "longitude": 149.0124,
 *                   "confirmed": "107",
 *                   "deaths": "3",
 *                   "active": "0",
 *                   "recovered": "104"
 *               },
 *               {
 *                   "key": "yyxa9",
 *                   "name": "New South Wales",
 *                   "address": "New South Wales, Australia",
 *                   "latitude": -33.8688,
 *                   "longitude": 151.2093,
 *                   "confirmed": "3110",
 *                   "deaths": "48",
 *                   "active": "348",
 *                   "recovered": "2714"
 *               },
 *               {
 *                   "key": "jcmoa",
 *                   "name": "Northern Territory",
 *                   "address": "Northern Territory, Australia",
 *                   "latitude": -12.4634,
 *                   "longitude": 130.8456,
 *                   "confirmed": "29",
 *                   "deaths": "0",
 *                   "active": "0",
 *                   "recovered": "29"
 *               },
 *               {
 *                   "key": "oalle",
 *                   "name": "Queensland",
 *                   "address": "Queensland, Australia",
 *                   "latitude": -27.4698,
 *                   "longitude": 153.0251,
 *                   "confirmed": "1060",
 *                   "deaths": "6",
 *                   "active": "5",
 *                   "recovered": "1049"
 *               },
 *               {
 *                   "key": "13vmp",
 *                   "name": "South Australia",
 *                   "address": "South Australia, Australia",
 *                   "latitude": -34.9285,
 *                   "longitude": 138.6007,
 *                   "confirmed": "440",
 *                   "deaths": "4",
 *                   "active": "0",
 *                   "recovered": "436"
 *               },
 *               {
 *                   "key": "gfvx5",
 *                   "name": "Tasmania",
 *                   "address": "Tasmania, Australia",
 *                   "latitude": -42.8821,
 *                   "longitude": 147.3272,
 *                   "confirmed": "228",
 *                   "deaths": "13",
 *                   "active": "7",
 *                   "recovered": "208"
 *               },
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
 *       {
 *           "country": "Denmark",
 *           "code": "DK",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_denmark.png",
 *           "coordinates": [
 *               9.501785,
 *               56.26392
 *           ],
 *           "confirmed": 12011,
 *           "deaths": 582,
 *           "recovered": 10820,
 *           "states": [
 *               {
 *                   "key": "jphtd",
 *                   "name": "Faroe Islands",
 *                   "address": "Faroe Islands, Denmark",
 *                   "latitude": 61.8926,
 *                   "longitude": -6.9118,
 *                   "confirmed": "187",
 *                   "deaths": "0",
 *                   "active": "0",
 *                   "recovered": "187"
 *               },
 *               {
 *                   "key": "tb0to",
 *                   "name": "Greenland",
 *                   "address": "Greenland, Denmark",
 *                   "latitude": 71.7069,
 *                   "longitude": -42.6043,
 *                   "confirmed": "13",
 *                   "deaths": "0",
 *                   "active": "0",
 *                   "recovered": "13"
 *               },
 *               {
 *                   "key": "9ucsz",
 *                   "name": "Denmark",
 *                   "address": "Denmark",
 *                   "latitude": 56.2639,
 *                   "longitude": 9.5018,
 *                   "confirmed": "11811",
 *                   "deaths": "582",
 *                   "active": "609",
 *                   "recovered": "10620"
 *               }
 *           ]
 *       },
 *       {
 *           "country": "France",
 *           "code": "FR",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_france.png",
 *           "coordinates": [
 *               2.213749,
 *               46.227638
 *           ],
 *           "confirmed": 189569,
 *           "deaths": 29068,
 *           "recovered": 70094,
 *           "states": [
 *               {
 *                   "key": "ak3hk",
 *                   "name": "French Guiana",
 *                   "address": "French Guiana, France",
 *                   "latitude": 4,
 *                   "longitude": -53,
 *                   "confirmed": "556",
 *                   "deaths": "1",
 *                   "active": "259",
 *                   "recovered": "296"
 *               },
 *               {
 *                   "key": "j4zpt",
 *                   "name": "French Polynesia",
 *                   "address": "French Polynesia, France",
 *                   "latitude": -17.6797,
 *                   "longitude": -149.4068,
 *                   "confirmed": "60",
 *                   "deaths": "0",
 *                   "active": "0",
 *                   "recovered": "60"
 *               },
 *               {
 *                   "key": "3uffp",
 *                   "name": "Guadeloupe",
 *                   "address": "Guadeloupe, France",
 *                   "latitude": 16.265,
 *                   "longitude": -61.551,
 *                   "confirmed": "162",
 *                   "deaths": "14",
 *                   "active": "10",
 *                   "recovered": "138"
 *               },
 *               {
 *                   "key": "415ua",
 *                   "name": "Martinique",
 *                   "address": "Martinique, France",
 *                   "latitude": 14.6415,
 *                   "longitude": -61.0242,
 *                   "confirmed": "200",
 *                   "deaths": "14",
 *                   "active": "88",
 *                   "recovered": "98"
 *               },
 *               {
 *                   "key": "f97oh",
 *                   "name": "Mayotte",
 *                   "address": "Mayotte, France",
 *                   "latitude": -12.8275,
 *                   "longitude": 45.166244,
 *                   "confirmed": "2058",
 *                   "deaths": "25",
 *                   "active": "510",
 *                   "recovered": "1523"
 *               },
 *               {
 *                   "key": "3fzyx",
 *                   "name": "New Caledonia",
 *                   "address": "New Caledonia, France",
 *                   "latitude": -20.904304999999997,
 *                   "longitude": 165.618042,
 *                   "confirmed": "20",
 *                   "deaths": "0",
 *                   "active": "2",
 *                   "recovered": "18"
 *               },
 *               {
 *                   "key": "5p3hg",
 *                   "name": "Reunion",
 *                   "address": "Reunion, France",
 *                   "latitude": -21.1151,
 *                   "longitude": 55.5364,
 *                   "confirmed": "479",
 *                   "deaths": "1",
 *                   "active": "67",
 *                   "recovered": "411"
 *               },
 *               {
 *                   "key": "95qj2",
 *                   "name": "Saint Barthelemy",
 *                   "address": "Saint Barthelemy, France",
 *                   "latitude": 17.9,
 *                   "longitude": -62.8333,
 *                   "confirmed": "6",
 *                   "deaths": "0",
 *                   "active": "0",
 *                   "recovered": "6"
 *               },
 *               {
 *                   "key": "vjtzs",
 *                   "name": "Saint Pierre and Miquelon",
 *                   "address": "Saint Pierre and Miquelon, France",
 *                   "latitude": 46.8852,
 *                   "longitude": -56.3159,
 *                   "confirmed": "1",
 *                   "deaths": "0",
 *                   "active": "0",
 *                   "recovered": "1"
 *               },
 *               {
 *                   "key": "gie7t",
 *                   "name": "St Martin",
 *                   "address": "St Martin, France",
 *                   "latitude": 18.0708,
 *                   "longitude": -63.0501,
 *                   "confirmed": "41",
 *                   "deaths": "3",
 *                   "active": "5",
 *                   "recovered": "33"
 *               },
 *               {
 *                   "key": "fsn16",
 *                   "name": "France",
 *                   "address": "France",
 *                   "latitude": 46.2276,
 *                   "longitude": 2.2137,
 *                   "confirmed": "185986",
 *                   "deaths": "29010",
 *                   "active": "89466",
 *                   "recovered": "67510"
 *               }
 *           ]
 *       },
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
 *       {
 *           "country": "Egypt",
 *           "code": "EG",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_egypt.png",
 *           "coordinates": [
 *               30.802498,
 *               26.820553
 *           ],
 *           "confirmed": 29767,
 *           "deaths": 1126,
 *           "recovered": 7756,
 *           "states": [
 *               {
 *                   "key": "po22y",
 *                   "name": "Egypt",
 *                   "address": "Egypt",
 *                   "latitude": 26.820553000000004,
 *                   "longitude": 30.802497999999996,
 *                   "confirmed": "29767",
 *                   "deaths": "1126",
 *                   "active": "20885",
 *                   "recovered": "7756"
 *               }
 *           ]
 *       },
 *       {
 *           "country": "El Salvador",
 *           "code": "SV",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_el_salvador.png",
 *           "coordinates": [
 *               -88.89653,
 *               13.794185
 *           ],
 *           "confirmed": 2781,
 *           "deaths": 52,
 *           "recovered": 1214,
 *           "states": [
 *               {
 *                   "key": "ez74p",
 *                   "name": "El Salvador",
 *                   "address": "El Salvador",
 *                   "latitude": 13.7942,
 *                   "longitude": -88.8965,
 *                   "confirmed": "2781",
 *                   "deaths": "52",
 *                   "active": "1515",
 *                   "recovered": "1214"
 *               }
 *           ]
 *       },
 *       {
 *           "country": "Equatorial Guinea",
 *           "code": "GQ",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_equatorial_guinea.png",
 *           "coordinates": [
 *               10.267895,
 *               1.650801
 *           ],
 *           "confirmed": 1306,
 *           "deaths": 12,
 *           "recovered": 200,
 *           "states": [
 *               {
 *                   "key": "azd2f",
 *                   "name": "Equatorial Guinea",
 *                   "address": "Equatorial Guinea",
 *                   "latitude": 1.6508,
 *                   "longitude": 10.2679,
 *                   "confirmed": "1306",
 *                   "deaths": "12",
 *                   "active": "1094",
 *                   "recovered": "200"
 *               }
 *           ]
 *       },
 *       {
 *           "country": "Eritrea",
 *           "code": "ER",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_eritrea.png",
 *           "coordinates": [
 *               39.782334,
 *               15.179384
 *           ],
 *           "confirmed": 39,
 *           "deaths": 0,
 *           "recovered": 39,
 *           "states": [
 *               {
 *                   "key": "ma4pn",
 *                   "name": "Eritrea",
 *                   "address": "Eritrea",
 *                   "latitude": 15.1794,
 *                   "longitude": 39.7823,
 *                   "confirmed": "39",
 *                   "deaths": "0",
 *                   "active": "0",
 *                   "recovered": "39"
 *               }
 *           ]
 *       },
 *       {
 *           "country": "Estonia",
 *           "code": "EE",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_estonia.png",
 *           "coordinates": [
 *               25.013607,
 *               58.595272
 *           ],
 *           "confirmed": 1890,
 *           "deaths": 69,
 *           "recovered": 1663,
 *           "states": [
 *               {
 *                   "key": "1ibzl",
 *                   "name": "Estonia",
 *                   "address": "Estonia",
 *                   "latitude": 58.5953,
 *                   "longitude": 25.0136,
 *                   "confirmed": "1890",
 *                   "deaths": "69",
 *                   "active": "158",
 *                   "recovered": "1663"
 *               }
 *           ]
 *       },
 *       {
 *           "country": "Eswatini",
 *           "code": "SZ",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_eswatini.png",
 *           "coordinates": [
 *               31.4659,
 *               -26.5225
 *           ],
 *           "confirmed": 300,
 *           "deaths": 3,
 *           "recovered": 201,
 *           "states": [
 *               {
 *                   "key": "5662g",
 *                   "name": "Eswatini",
 *                   "address": "Eswatini",
 *                   "latitude": -26.5225,
 *                   "longitude": 31.4659,
 *                   "confirmed": "300",
 *                   "deaths": "3",
 *                   "active": "96",
 *                   "recovered": "201"
 *               }
 *           ]
 *       },
 *       {
 *           "country": "Jamaica",
 *           "code": "JM",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_jamaica.png",
 *           "coordinates": [
 *               -77.297508,
 *               18.109581
 *           ],
 *           "confirmed": 591,
 *           "deaths": 10,
 *           "recovered": 368,
 *           "states": [
 *               {
 *                   "key": "ndojt",
 *                   "name": "Jamaica",
 *                   "address": "Jamaica",
 *                   "latitude": 18.1096,
 *                   "longitude": -77.2975,
 *                   "confirmed": "591",
 *                   "deaths": "10",
 *                   "active": "213",
 *                   "recovered": "368"
 *               }
 *           ]
 *       },
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
 *       {
 *           "country": "Slovenia",
 *           "code": "SI",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_slovenia.png",
 *           "coordinates": [
 *               14.995463,
 *               46.151241
 *           ],
 *           "confirmed": 1477,
 *           "deaths": 109,
 *           "recovered": 1359,
 *           "states": [
 *               {
 *                   "key": "nk2q9",
 *                   "name": "Slovenia",
 *                   "address": "Slovenia",
 *                   "latitude": 46.1512,
 *                   "longitude": 14.9955,
 *                   "confirmed": "1477",
 *                   "deaths": "109",
 *                   "active": "9",
 *                   "recovered": "1359"
 *               }
 *           ]
 *       },
 *       {
 *           "country": "Vietnam",
 *           "code": "VN",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_vietnam.png",
 *           "coordinates": [
 *               108.277199,
 *               14.058324
 *           ],
 *           "confirmed": 328,
 *           "deaths": 0,
 *           "recovered": 302,
 *           "states": [
 *               {
 *                   "key": "85wgm",
 *                   "name": "Vietnam",
 *                   "address": "Vietnam",
 *                   "latitude": 14.058323999999999,
 *                   "longitude": 108.277199,
 *                   "confirmed": "328",
 *                   "deaths": "0",
 *                   "active": "26",
 *                   "recovered": "302"
 *               }
 *           ]
 *       },
 *       {
 *           "country": "Zambia",
 *           "code": "ZM",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_zambia.png",
 *           "coordinates": [
 *               27.849332,
 *               -13.133897
 *           ],
 *           "confirmed": 1089,
 *           "deaths": 7,
 *           "recovered": 912,
 *           "states": [
 *               {
 *                   "key": "z3s3b",
 *                   "name": "Zambia",
 *                   "address": "Zambia",
 *                   "latitude": -13.133897,
 *                   "longitude": 27.849332,
 *                   "confirmed": "1089",
 *                   "deaths": "7",
 *                   "active": "170",
 *                   "recovered": "912"
 *               }
 *           ]
 *       },
 *       {
 *           "country": "Zimbabwe",
 *           "code": "ZW",
 *           "flag": "https://assets.hackbotone.com/images/flags/flag_zimbabwe.png",
 *           "coordinates": [
 *               29.154857,
 *               -19.015438
 *           ],
 *           "confirmed": 237,
 *           "deaths": 4,
 *           "recovered": 31,
 *           "states": [
 *               {
 *                   "key": "vs33a",
 *                   "name": "Zimbabwe",
 *                   "address": "Zimbabwe",
 *                   "latitude": -19.015438,
 *                   "longitude": 29.154857,
 *                   "confirmed": "237",
 *                   "deaths": "4",
 *                   "active": "202",
 *                   "recovered": "31"
 *               }
 *           ]
 *       }
 *   ]
 * }
 *}
 */

app.get('/all', (req, res) => {
  db.collection('covid_statistics')
    .findOne()
    .then((results) => {
      res.status(200).json(results);
    });
});

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
 * @apiGroup Data
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

app.get('/geojson', (req, res) => {
  db.collection('covid_statistics')
    .findOne()
    .then((results) => {
      if (results) {
        let data = [];
        let result = JSON.parse(JSON.stringify(results));
        let total_cases = 0;
        let country;

        //For each country
        for (var i = 0; i < result.country_statistics.length; i++) {
          country = result.country_statistics[i].country;

          //For each state
          for (var j = 0; j < result.country_statistics[i].states.length; j++) {
            let state_name;
            let state_address;
            let latitude;
            let longitude;
            let confirmed = 0;
            let deaths = 0;
            let recovered = 0;
            let active = 0;
            let name = result.country_statistics[i].states[j].name;

            result.country_statistics[i].states
              .filter((city) => city.name === name)
              .map((e) => {
                state_name = e.name;
                state_address = e.address;
                latitude = e.latitude;
                longitude = e.longitude;
                confirmed = confirmed + parseInt(e.confirmed);
                deaths = deaths + parseInt(e.deaths);
                recovered = recovered + parseInt(e.recovered);
                active = active + parseInt(e.active);
                total_cases =
                  parseInt(confirmed) + parseInt(deaths) + parseInt(recovered);
              });

            let item = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
              properties: {
                key: j,
                country: country,
                name: state_name,
                address: state_address,
                confirmed: confirmed,
                deaths: deaths,
                recovered: recovered,
                active: active,
                total_cases: total_cases,
              },
            };
            data.push(item);
          }
        }
        data = data.filter((obj, pos, arr) => {
          return (
            arr
              .map((mapObj) => mapObj.properties.name)
              .indexOf(obj.properties.name) == pos
          );
        });
        res.json(data);
      }
    });
});

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
 * @apiGroup Data
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

app.get('/country/:country', (req, res) => {
  let toFind = req.params.country.toUpperCase();
  let newResult;
  db.collection('covid_statistics')
    .findOne()
    .then((results) => {
      if (results) {
        results.country_statistics.forEach((result) => {
          let countryName;
          if (result.country) {
            countryName = result.country.toUpperCase();
          }

          try {
            if (countryName == toFind) {
              newResult = result;
            }
          } catch (err) {
            console.log(err);
          }
        });
        if (newResult != null) {
          res.status(200).json(newResult);
        } else {
          res.status(500).json('Country not in our Database');
        }
      } else {
        newResult = JSON.stringify('No such country');
      }
    });
});

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
 * @apiGroup Data
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

app.get('/timeline/all', (req, res) => {
  var options = {
    url:
      'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
    method: 'GET',
  };
  request(options, function (error, response, result) {
    if (error) res.json(error);

    let rows = result.split('\n');
    let mainData = {};
    let headers = rows[0];
    let dates = headers.split(/,(?=\S)/);
    dates.splice(0, 4);
    rows.splice(0, 1);

    rows.forEach((row) => {
      let cols = row.split(/,(?=\S)/);
      let con = cols[1];
      cols.splice(0, 4);
      mainData[con] = [];

      cols.forEach((value, index) => {
        let dw = {
          cases: +value,
          country: con,
          date: new Date(Date.parse(dates[index])),
        };
        mainData[con].push(dw);
      });
    });

    res.json(mainData);
  });
});

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
 * @apiGroup Data
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

app.get('/timeline/:country', (req, res) => {
  let countryName = req.params.country.toUpperCase();
  console.log(countryName);

  let timeline;
  var options = {
    url:
      'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
    method: 'GET',
  };
  request(options, function (error, response, result) {
    if (error) res.json(error);

    let rows = result.split('\n');
    //console.log(rows);
    let mainData = {};
    let headers = rows[0];
    let dates = headers.split(/,(?=\S)/);
    dates.splice(0, 4);
    rows.splice(0, 1);

    rows.forEach((row) => {
      let cols = row.split(/,(?=\S)/);
      let con = cols[1];
      cols.splice(0, 4);
      //console.log(con, cols);
      mainData[con] = [];

      cols.forEach((value, index) => {
        let dw = {
          cases: +value,
          country: con,
          date: new Date(Date.parse(dates[index])),
        };
        mainData[con].push(dw);
      });
    });

    for (var key in mainData) {
      let newKey = key.toUpperCase();
      if (newKey == countryName) {
        timeline = mainData[key];
      }
    }
    if (timeline != null) {
      res.status(200).json(timeline);
    } else {
      res.status(500).json('Country not in our Database');
    }
  });
});

// Serve documentation
app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './docs/', 'index.html'));
});

app.listen(port, () => {
  console.log(`Live on http://localhost:${port}`);
});
