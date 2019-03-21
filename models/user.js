const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username : {
        type:String,
        unique: true,
        lowercase: true
    },
    password : {
        type:String
    },
    user_type :{
        type:String
    } 
})

const User = mongoose.model('user', usersSchema);
module.exports = User;