//inside read_test.js
const assert = require('assert');
const Room = require('../models/room')
let ro;

describe('Delete room details', () => {
    beforeEach((done) => {
      ro = new Room({  name: 'HongHong' });
      ro.save()
          .then(() => done());
    });
    it('removes a room using its instance', (done) => {
      ro.remove()
        .then(() => Room.findOne({ name: 'HongHong' }))
        .then((room) => {
          assert(room === null);
          done();
        });
    });
    it('removes multiple rooms', (done) => {
      Room.remove({ name: 'HongHong' })
        .then(() => Room.findOne({ name: 'HongHong' }))
        .then((room) => {
          assert(room === null);
          done();
        });
    });
  
    it('removes a room', (done) => {
      Room.findOneAndRemove({ name: 'HongHong' })
        .then(() => Room.findOne({ name: 'HongHong' }))
        .then((room) => {
          assert(room === null);
          done();
        });
    });
  
})