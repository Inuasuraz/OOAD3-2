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
    room: {
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

const Exam = mongoose.model('exam', examSchema);
module.exports = Exam;