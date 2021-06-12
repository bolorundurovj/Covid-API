const mongoose = require('mongoose');
const cron = require('node-cron');
const fs = require('fs');
const csv = require('csv-parser');
const request = require('request');
const Case = require('./models/Case');

const countryList = require('./countries.json');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected On: ${conn.connection.host}`);
  return conn;
};

const runCronJob = async () => {
  let db;
  connectDB()
    .then((d) => {
      db = d.connection;
    })
    .catch((err) => {
      console.log(err);
    });
  cron.schedule('23 59 * * * *', () => {
    let date = new Date(Date.now());
    let day = date.getDate();
    let year = date.getUTCFullYear();
    let month = date.getMonth();

    let previousDay = day - 1;
    let correctMonth = month + 1;
    if (previousDay < 10) {
      previousDay = '0' + previousDay;
    }
    if (correctMonth < 10) {
      correctMonth = '0' + correctMonth;
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
          .on('end', async () => {
            if (results.length > 0) {
              const mappedResults = results.map((x) => {
                return {
                  country: x.Country_Region,
                  state: x.Province_State,
                  stateCountry: x.Combined_Key,
                  lastUpdated: x.Last_Update,
                  activeCases: Number(x.Active),
                  confirmedCases: Number(x.Confirmed),
                  fatalCases: Number(x.Deaths),
                  recoveredCases: Number(x.Recovered),
                  incidentRate: Number(x.Incident_Rate),
                  fatalityRatio: Number(x.Case_Fatality_Ratio),
                  location: {
                    coordinates: [Number(x.Long_), Number(x.Lat)],
                  },
                };
              });
              await Case.deleteMany({});
              await Case.insertMany(mappedResults).then(() => {
                  console.log(`Inserted Data for V2+`);
              })
              results.forEach((result) => {
                totalActive =
                  parseInt(result.Active !== undefined ? result.Active : '0') +
                  totalActive;
                totalRecovered += +totalRecovered || 0;
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
};

module.exports = { connectDB, runCronJob };
