const request = require('request');

const { db } = require('../utils');

exports.getAll = (req, res) => {
  db.collection('covid_statistics')
    .findOne()
    .then((results) => {
      res.status(200).json(results);
    });
};

exports.getGeoJSON = (req, res) => {
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
};

exports.getSingleCountry = (req, res) => {
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
};

exports.getAllCountryTimeline = (req, res) => {
  var options = {
    url: 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
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
};

exports.getSingleTimeline = (req, res) => {
  let countryName = req.params.country.toUpperCase();
  console.log(countryName);

  let timeline;
  var options = {
    url: 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
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
};
