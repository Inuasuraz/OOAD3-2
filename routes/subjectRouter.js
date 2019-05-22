const express = require('express');
const Router = express.Router();
const Year = require('../models/year');
const Subject = require('../models/subject')

Router.get('/subjectYearSelect', (req, res) => {
    Year.find({}, (err, result) => {
        res.render(('subjectYearSelect'), { status: 0, message: "0", data: result, username, semester})
    })
})

Router.get('/subjectEdit', (req, res) => {

    Subject.find({ 'year': semester }, (err, result2) => {
        res.render('subjectEdit', { status: 0, message: "0", data: result2, username, semester })
    })

})

Router.post('/subjectEdit', (req, res) => {
    semester = req.body.year

    Subject.find({ 'year': semester }, (err, result2) => {
        res.render('subjectEdit', { status: 0, message: "0", data: result2, username, semester})
    })
})

Router.get('/addSubject', (req, res) => {
    var code = req.body.id
    var name = req.body.firstname
    res.render('addSubject', { status: 0, message: "0", username, code, name , semester})
})

Router.post('/addSubject', (req, res) => {
    var code = req.body.code
    var name = req.body.name
    res.render('addSubject', { status: 3, message: "0", username, code, name , semester })
})


Router.post('/addSubject/submit', (req, res) => {
    const newSubject = new Subject({
        code: req.body.code,
        name: req.body.name,
        year: req.body.year,
    });

    Subject.findOne({ code: req.body.code }, (err, result) => {
        if (result) {

            Subject.findOneAndUpdate({ code: req.body.code }, { "$set": { "code": req.body.code, "name": req.body.name, "year": req.body.year } }, { upsert: true }, function (err, doc) {
                if (err) console.log("ERR")
                else console.log("OK")
            });

            Subject.find({}, (err, result) => {

                // res.render('studentEdit', { status: 2, message: "แก้ไขข้อมูลสำเร็จ", data: result, username });
                res.redirect('/subjectEdit')

            });

        } else {
            newSubject.save((err, result) => {
                if (err) { console.log(err) }
                else {
                    console.log(result);
                    res.redirect('/subjectEdit')
                }
            });
        }
    });


});

Router.get('/subjectEdit/delete/:id', async (req, res) => {
    Subject.findOne({ code: req.params.id }, await function (err, result) {
        result.remove();

        console.log(result);
        console.log("HELLO")


        res.redirect('/subjectEdit');
    });
});

module.exports = Router;