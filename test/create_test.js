// inside create_test.js
const assert = require('assert');
const Room = require('../models/room')

describe('Creating documents', () => {
    it('creates a BoxBox', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        const ro = new Room({ name: 'BoxBox' });
        ro.save() //takes some time and returns a promise
            .then(() => {
                assert(!ro.isNew); //if poke is saved to db it is not new

                Room.findOne({ name: 'BoxBox' })  //remove now Instead remove collection
                    .then((room) => {
                    room.remove();
                });

                done();
            });
    });
});