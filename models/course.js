const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({

    year: {
        type: String
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
    },
    group: {
        type: String
    },
    instructor: [{
        type: Schema.Types.ObjectId,
        ref: 'instructor'
    }],
    student: [{
        type: Schema.Types.ObjectId,
        ref: 'student'
    }],
    room: {
        type: Schema.Types.ObjectId,
        ref: 'room'
    }
})

const Course = mongoose.model('course', courseSchema);
module.exports = Course;