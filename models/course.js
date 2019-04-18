const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({

    _id: {
        type: String
    },
    year: {
        type: String
    },
    subject_code: {
        type: String
    },
    subject_name: {
        type: String
    },
    group: {
        type: String
    },
    teacher1: {
        type: String
    },
    teacher2: {
        type: String
    },
    nisit: [
        {
        user_id: {
            type: String
        },
        firstname:{
            type: String
        },
        lastname:{
            type: String
        },
        faculty:{
            type: String
        },
        branch:{
            type: String
        },
        year:{
            type: String
        }
        }
    ]
})

const Course = mongoose.model('course', courseSchema);
module.exports = Course;