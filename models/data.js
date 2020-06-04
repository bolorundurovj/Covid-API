const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    total_confirmed: {type: Number},
    total_deaths: {type: Number},
    total_recovered: {type: Number},
    total_active: {type: Number},
    last_date_updated: {type: String},
    country_statistics: {type: Array}
});

module.exports = mongoose.model('Data', dataSchema);