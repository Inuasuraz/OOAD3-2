//inside read_test.js
const assert = require('assert');
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
