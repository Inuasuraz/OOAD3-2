
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const instructorSchema = new mongoose.Schema({
    user_id : {
        type:String,
        unique:true
    },
    firstname :{
        type:String
    },
    lastname :{
        type:String
    },
    faculty :{
        type:String
    },
    branch :{
        type:String
    },
    password: {
        type: String
    },
    user_type: {
        type: String
    }
})


const Instructor = mongoose.model('instructor', instructorSchema);
module.exports = Instructor;
