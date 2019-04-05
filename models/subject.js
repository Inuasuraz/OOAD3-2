const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subject_code : {
        type:String,
    },
    subject_name : {
        type:String
    }
})

const Subject = mongoose.model('subjects', subjectSchema);
module.exports = Subject;