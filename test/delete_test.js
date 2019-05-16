//inside read_test.js
const assert = require('assert');
const Room = require('../models/room')
const Subject = require('../models/subject');

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
    it('removes a subject using its instance', (done) => {
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
  
    it('removes a subject', (done) => {
      Subject.findOneAndRemove({ name: '886006459' })
        .then(() => Subject.findOne({ name: '886006459' }))
        .then((subjects) => {
          assert(subjects === null);
          done();
        });
    });
  
})