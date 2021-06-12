const mongoose = require('mongoose');

const caseSchema = mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: 'NA',
    },
    stateCountry: {
      type: String,
      default: 'NA',
    },
    lastUpdated: {
      type: Date,
      required: true,
    },
    activeCases: {
      type: Number,
      default: 0,
    },
    confirmedCases: {
      type: Number,
      default: 0,
    },
    fatalCases: {
      type: Number,
      default: 0,
    },
    recoveredCases: {
      type: Number,
      default: 0,
    },
    incidentRate: {
      type: Number,
      default: 0,
    },
    fatalityRatio: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Case', caseSchema);
