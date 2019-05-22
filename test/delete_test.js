//inside read_test.js
const assert = require('assert');
const Room = require('../models/room')
const Subject = require('../models/subject');
const Exam = require('../models/exam');

describe('Delete Subject', () => {
    beforeEach((done) => {
        subject = new Subject({
            code:'886006459',
            name: 'Sex Education',
            year: '2561/2'
        });
      subject.save()
          .then(() => done());
    });
    it('removes a exam using its instance', (done) => {
      subject.remove()
        .then(() => Subject.findOne({ name: '886006459' }))
        .then((subjects) => {
          assert(subjects === null);
          done();
        });
    });
    it('removes multiple subjects', (done) => {
      Subject.remove({ name: '886006459' })
        .then(() => Subject.findOne({ name: '886006459' }))
        .then((subjects) => {
          assert(subjects === null);
          done();
        });
    });
  
    it('removes a exam', (done) => {
      Subject.findOneAndRemove({ name: '886006459' })
        .then(() => Subject.findOne({ name: '886006459' }))
        .then((subjects) => {
          assert(subjects === null);
          done();
        });
    });
  
})

describe('Delete Exam', () => {
  beforeEach((done) => {
    exam = new Exam({
      course: '5cceb4981c9d440000db54bc',
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
  it('removes a exam using its instance', (done) => {
    exam.remove()
      .then(() => Exam.findOne({ course: '5cceb4981c9d440000db54bc',date: '17/08/2540', start: '18.00'}))
      .then((exams) => {
        assert(exams === null);
        done();
      });
  });
  it('removes multiple Exam', (done) => {
    Exam.remove({course: '5cceb4981c9d440000db54bc',date: '17/08/2540', start: '18.00' })
      .then(() => Exam.findOne({course: '5cceb4981c9d440000db54bc',date: '17/08/2540', start: '18.00' }))
      .then((exams) => {
        assert(exams === null);
        done();
      });
  });

  it('removes a exam', (done) => {
    Exam.findOneAndRemove({ course: '5cceb4981c9d440000db54bc',date: '17/08/2540', start: '18.00' })
      .then(() => Exam.findOne({ course: '5cceb4981c9d440000db54bc',date: '17/08/2540', start: '18.00' }))
      .then((exams) => {
        assert(exams === null);
        done();
      });
  });

})