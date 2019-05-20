const express = require('express');
const Router = express.Router();
const Room = require('../models/room')
const Year = require('../models/year');

Router.get('/roomYearSelect', (req, res) => {
    Year.find({}, (err, result) => {
        res.render(('roomYearSelect'), { status: 0, message: "0", data: result, username })
    })
})

Router.get('/roomEdit', (req, res) => {

    Room.find({ 'year': semester }, (err, result2) => {
        res.render('roomEdit', { status: 0, message: "0", data: result2, username, semester })
    })

})

Router.post('/roomEdit', (req, res) => {
    semester = req.body.year

    Room.find({ 'year': semester }, (err, result) => {
        res.render(('roomEdit'), { status: 0, message: "0", data: result, username, semester })
    })
})

Router.get('/addRoom', (req, res) => {
    res.render('addRoom', { status: 0, message: "0", username, semester })
})

Router.post('/addRoom/submit', (req, res) => {
    const newRoom = new Room({
        building: req.body.building,
        name: req.body.room,
        roomType: req.body.type,
        semester: req.body.year
    });

    Room.findOne({ name: req.body.name }, (err, result) => {
        if (result) {
            Room.findOneAndUpdate({ name: req.body.room }, { "$set": { "building": req.body.building, "roomType": req.body.type, "year": req.body.year } }, { upsert: true }, function (err, doc) {
                if (err) console.log("ERR")
                else console.log("OK")
            });

            Subject.find({}, (err, result) => {

                // res.render('studentEdit', { status: 2, message: "แก้ไขข้อมูลสำเร็จ", data: result, username });
                res.redirect('/roomEdit')

            });

        } else {
            newRoom.save((err, result) => {
                if (err) { console.log(err) }
                else {
                    console.log(result);
                    res.redirect('/roomEdit')
                }
            });
        }
    });
});

Router.get('/roomEdit/delete/:id', async (req, res) => {
    Room.findOne({ name: req.params.id }, await function (err, result) {
        result.remove();

        console.log(result);
        console.log("HELLO")


        res.redirect('/roomEdit');
    });
});

module.exports = Router;