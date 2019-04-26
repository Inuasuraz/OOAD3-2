const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    building : {
        type:String
    },
    name : {
        type:String,
        unique: true
    },
    roomType : {
        type:String
    },
    year : {
        type:String
    }
})

const Room = mongoose.model('room', roomSchema);
module.exports = Room;