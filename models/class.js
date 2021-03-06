const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name : {
        type:String,
        unique: true
    },
    roomType : {
        type:String
    },
    monday: [
            {   _id:{
                type:String
            },
                sub:{
                    type:String
                },
                num:{
                    type:String
                }
            }
        ],
    tuesday: [
        {   _id:{
            type:String
        },
            sub:{
                type:String
            },
            num:{
                type:String
            }
        }
    ],
    wednesday: [
        {   _id:{
            type:String
        },
            sub:{
                type:String
            },
            num:{
                type:String
            }
        }
    ],
    thursday: [
        {   _id:{
            type:String
        },
            sub:{
                type:String
            },
            num:{
                type:String
            }
        }
    ],
    friday:[
        {   _id:{
            type:String
        },
            sub:{
                type:String
            },
            num:{
                type:String
            }
        }
    ],
    saturday: [
        {   _id:{
            type:String
        },
            sub:{
                type:String
            },
            num:{
                type:String
            }
        }
    ],
    sunday: [
        {   _id:{
            type:String
        },
            sub:{
                type:String
            },
            num:{
                type:String
            }
        }
    ]
})

const Class = mongoose.model('classes', classSchema);
module.exports = Class;