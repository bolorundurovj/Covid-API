//Get World Stats X
//Get All Country Stats X
//Get Country Stats X
//Get Country TimeLine X
//Get World Timeline
//Get All Countries Timeline X

const request = require('request');
const Case = require('../../models/Case');

exports.getWorldStats = async (req, res) => {
  const response = await Case.aggregate([
    {
      $group: {
        _id: null,
        activeCases: { $sum: '$activeCases' },
        confirmedCases: { $sum: '$confirmedCases' },
        recoveredCases: { $sum: '$recoveredCases' },
        fatalCases: { $sum: '$fatalCases' },
        newCases: { $sum: '$newCases' },
        fatalityRatio: { $last: '$fatalityRatio' },
        incidentRate: { $last: '$incidentRate' },
        lastUpdated: { $last: '$lastUpdated' },
        subGroups: { $sum: 1 },
      },
    },
    {
      $unset: ['_id'],
    },
    {
      $sort: {
        country: 1,
      },
    },
  ]);

  return res.status(200).json(response[0]);
};

exports.getAllCountriesStats = async (req, res) => {
  const response = await Case.aggregate([
    {
      $group: {
        _id: '$country',
        activeCases: { $sum: '$activeCases' },
        confirmedCases: { $sum: '$confirmedCases' },
        recoveredCases: { $sum: '$recoveredCases' },
        fatalCases: { $sum: '$fatalCases' },
        newCases: { $sum: '$newCases' },
        location: { $last: '$location' },
        fatalityRatio: { $last: '$fatalityRatio' },
        incidentRate: { $last: '$incidentRate' },
        country: { $last: '$country' },
        lastUpdated: { $last: '$lastUpdated' },
        subGroups: { $sum: 1 },
      },
    },
    {
      $unset: ['_id'],
    },
    {
      $sort: {
        country: 1,
      },
    },
  ]);

  return res.status(200).json(response);
};

exports.getSingleCountryStats = async (req, res, next) => {
  let { country } = req.params;
  country = `^${country}`;
  country = new RegExp(String(country), 'i');
  const response = await Case.aggregate([
    {
      $match: {
        country: { $regex: country },
      },
    },
    {
      $unset: ['_id', '__v', 'createdAt', 'updatedAt'],
    },
    {
      $sort: {
        state: 1,
        stateCountry: 1,
      },
    },
  ]);

  return res.status(200).json(response);
};

exports.getAllCountriesTimeline = async (req, res, next) => {
  const response = await getTimelineData;
  res.status(200).json(response);
};

exports.getSingleCountryTimeline = async (req, res, next) => {
  let { country } = req.params;
  //   country = `^${country}`;
  //   country = new RegExp(String(country), 'i');
  country = country.toLowerCase();
  let response = await getTimelineData;
  response = response[country];
  res.status(200).json(response);
};

const getTimelineData = new Promise((resolve, reject) => {
  const options = {
    url: 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
    method: 'GET',
  };
  request(options, function (error, response, result) {
    if (error) {
      return reject(error);
    }
    try {
      let rows = result.split('\n');
      let mainData = {};
      let headers = rows[0];
      let dates = headers.split(/,(?=\S)/);
      dates.splice(0, 4);
      rows.splice(0, 1);

      rows.forEach((row) => {
        let cols = row.split(/,(?=\S)/);
        let con = cols[1];
        con = String(con).toLowerCase();
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
      resolve(mainData);
    } catch (err) {
      reject(err);
    }
  });
});
