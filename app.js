const express = require('express');
const request = require('request');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

require('dotenv').config();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Covid19 API',
      description: "An API for all the Covid19 data you'll need",
      contact: {
        name: 'Bolorunduro Valiant-Joshua',
      },
      servers: ['http://localhost:4915'],
    },
  },
  apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const Data = require('./models/data');
const countryList = require('./countries.json');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 4915;

//mongodb://localhost:27017/covid19Api
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
          //console.log(results);

          if (results.length > 0) {
            results.forEach((result) => {
              totalActive =
                parseInt(result.Active !== undefined ? result.Active : '0') +
                totalActive;
              totalRecovered += parseInt(result.Recovered);
              totalConfirmed += parseInt(result.Confirmed);
              totalDeaths += parseInt(result.Deaths);
              //console.log(i);
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
  // console.log(country_statistics);

  return country_statistics;
}

/**
 * @swagger
 *
 * /all:
 *  get:
 *    description: Get the world data, as well as every country data
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.get('/all', (req, res) => {
  db.collection('covid_statistics')
    .findOne()
    .then((results) => {
      res.status(200).json(results);
    });
});

/**
 * @swagger
 *
 * /geojson:
 *  get:
 *    description: Get data in GeoJSON format, which is optimised for populating maps
 *    responses:
 *      '200':
 *        description: A successful response
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
 * @swagger
 *
 * /country/{country}:
 *  get:
 *    description: Get the latest update on each country
 *    parameters:
 *       - name: country
 *         description: Country's name
 *         type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.get('/country/:country', (req, res) => {
  let toFind = req.params.country.toUpperCase();
  let newResult;
  db.collection('covid_statistics')
    .findOne()
    .then((results) => {
      // for(var i = 0; i < results.country_statistics.length; i++){
      //     if(results.country_statistics[i].country == (/toFind/i)){
      //         res.status(200).json(results.country_statistics[i]);
      //     }
      //     else{
      //         res.json("Country not found");
      //     }
      //     console.log(toFind);

      // };

      if (results) {
        results.country_statistics.forEach((result) => {
          let countryName = result.country.toUpperCase();

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
 * @swagger
 *
 * /timeline/all:
 *  get:
 *    description: Get the timeline of the daily cases for all countries
 *    responses:
 *      '200':
 *        description: A successful response
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

    res.json(mainData);
  });
});

/**
 * @swagger
 *
 * /timeline/{country}:
 *  get:
 *    description: Get the timeline of daily cases in a country from January 2020 to date
 *    parameters:
 *       - name: country
 *         description: Country's name
 *         type: string
 *    responses:
 *      '200':
 *        description: A successful response
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

app.listen(port, () => {
  console.log(`Live on http://localhost:${port}`);
});
