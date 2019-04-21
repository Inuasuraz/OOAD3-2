const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({

    year: {
        type: String
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course'
    },
    roomExam: {
        type: Schema.Types.ObjectId,
        ref: 'room'
    },
    date:{
        type: String
    },
    start:{
        type: String
    },
    end:{
        type: String
    }
    
})

const Exam = mongoose.model('exams', examSchema);
module.exports = Exam;