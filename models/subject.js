const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    code : {
        type:String,
    },name : {
        type:String
    },year : {
        type:String
    }
})

const Subject = mongoose.model('subject', subjectSchema);
module.exports = Subject;