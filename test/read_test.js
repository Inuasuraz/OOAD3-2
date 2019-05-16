//inside read_test.js
const assert = require('assert');
const Exam = require('../models/exam');
const Subject = require('../models/subject');
const Instructor = require('../models/instructor');
let room;

//room read
describe('Reading subject details', () => {
    beforeEach((done) => {
      subject = new Subject({
          code:'886006459',
          name: 'Sex Education',
          year: '2561/2'
    });
      subject.save()
          .then(() => done());
    });
    it('finds subject with the code of Subject', (done) => {
        Subject.findOne({code: '886006459'})
            .then((subjects) => {
                assert(subjects.name === 'Sex Education'); 
                assert(subjects.year === '2561/2'); 
                done();
        });
    })
})

describe('Reading Exam details', () => {
    beforeEach((done) => {
        exam = new Exam({
            course: '5cdd53871c9d4400008963fb',
            instructor: ['5cceb9e91c9d440000db54bd'],
            room: '5cceb4981c9d440000db54bc',
            date: '17/08/2540',
            start: '18.00',
            end: '20.00',
            year: '2561/2',
    
        });
      exam.save()
          .then(() => done());
    });
    it('finds exam with the code of Exam', (done) => {
        Exam.findOne({course: '5cdd53871c9d4400008963fb',date: '17/08/2540', start: '18.00' }).populate('course').then((exams) => {
                assert(exams.year === '2561/2'); 
                assert(exams.course.group === '1'); 
                done();
        });
    })
})