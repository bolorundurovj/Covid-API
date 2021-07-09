//Get World Stats
//Get Country Stats
//Get Country TimeLine
//Get Country Geodata
//Get World Geodata
//Get World Timeline

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

exports.getAllCountries = async (req, res) => {
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
