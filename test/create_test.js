// inside create_test.js
const assert = require('assert');
const Room = require('../models/room')
const Course = require('../models/course')
const Subject = require('../models/subject');

describe('Creating Subject', () => {
    it('creates new Subject', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        subject = new Subject({
            code:'886006459',
            name: 'Sex Education',
            year: '2561/2'
        });
        subject.save() //takes some time and returns a promise
            .then(() => {
                assert(!subject.isNew); //if poke is saved to db it is not new
                done();
            });
    });
});

// describe('Creating Course', () => {
//     it('creates Course group1 year 2556/2', (done) => {
//         //assertion is not included in mocha so 
//         //require assert which was installed along with mocha
//         course = new Course({
//             subject: '5cceb4981c9d440000db54bc',
//             instructor: ['5cceb9e91c9d440000db54bd'],
//             student:[],
//             group: '1',
//             year: '2561/2',
    
//         });
//         course.save() //takes some time and returns a promise
//             .then(() => {
//                 assert(!course.isNew); //if poke is saved to db it is not new
//                 done();
//             });
//     });
// });