// inside create_test.js
const assert = require('assert');
const Room = require('../models/room')
const Course = require('../models/course')
const Subject = require('../models/subject');
const Exam = require('../models/exam');

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

describe('Creating Exam', () => {
    it('creates Exam', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        exam = new Exam({
            course: '5cceb4981c9d440000db54bc',
            instructor: ['5cceb9e91c9d440000db54bd'],
            room: '5cceb4981c9d440000db54bc',
            date: '17/08/2540',
            start: '18.00',
            end: '20.00',
            year: '2561/2',
    
        });
        exam.save() //takes some time and returns a promise
            .then(() => {
                assert(!exam.isNew); //if poke is saved to db it is not new
                done();
            });
    });
});