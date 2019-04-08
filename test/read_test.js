//inside read_test.js
const assert = require('assert');
const Room = require('../models/room')
let ro;

describe('Reading room details', () => {
    beforeEach((done) => {
      ro = new Room({  name: 'HongHong' });
      ro.save()
          .then(() => done());
    });
    it('finds room with the name of HongHong', (done) => {
        Room.findOne({ name: 'HongHong' })
            .then((room) => {
                assert(room.name === 'HongHong'); 
                room.remove();
                done();
        });
    })
})