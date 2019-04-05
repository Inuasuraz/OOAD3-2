const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yearSchema = new Schema({
    year: {
        type: String,
        lowercase: true
    }
})

const Year = mongoose.model('years', yearSchema);
module.exports = Year;
