
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const studentSchema = new Schema({
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
    year : {
        type:String
    }

})


const Student = mongoose.model('student', studentSchema);
module.exports = Student;
