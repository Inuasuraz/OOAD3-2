
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const studentSchema = new Schema({
    user_id: {
        type: String,
        unique: true
    },
    firstname: {

    },
    lastname: {
        type: String
    },
    faculty: {
        type: String
    },
    branch: {
        type: String
    },
    year: {
        type: String
    },
    password: {
        type: String,default: "password"
    },
    user_type: {
        type: String
    }


})


const Student = mongoose.model('student', studentSchema);
module.exports = Student;
