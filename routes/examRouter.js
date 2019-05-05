const express = require('express');
const Router = express.Router();
const Year = require('../models/year');
const Course = require('../models/course')
const Room = require('../models/room')
const Exam = require('../models/exam')




Router.get('/exam/examYearSelect', (req, res) => {
    Year.find({}, (err, result) => {
        res.render(('exam/examYearSelect'), { status: 0, message: 0, data: result, username })
    })
})

Router.post('/exam/examEdit', (req, res) => {
    year = req.body.year

    Exam.find({ 'year': year }).populate({
        path: 'course',
        populate: [{ path: 'subject' }]
    }).populate('room').exec((err, result) => {
        res.render('exam/examEdit', { status: 0, message: "0", data: result, username, year })
    })

})

Router.get('/exam/examEdit', (req, res) => {
    Exam.find({ 'year': year }).populate({
        path: 'course',
        populate: [{ path: 'subject' }]
    }).populate('room').exec((err, result) => {
        res.render('exam/examEdit', { status: 0, message: "0", data: result, username, year })
    })

})

Router.get('/exam/addExam', (req, res) => {
    Course.find({ 'year': year }).populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
        res.render(('exam/addExam'), { status: 0, message: "0", data: result, username, year })
    })
})

Router.post('/exam/addExam/addExamRoom', (req, res) => {
    courseId2 = req.body.id
    console.log(courseId2)
    Room.find({ 'year': year }, (err, result) => {
        res.render(('exam/addExamRoom'), {
            status: 0,
            message: "0",
            data: result,
            username,
            year
        })
    })

})

Router.post('/exam/addExam/addDate', (req, res) => {
    examRoom = req.body.roomId
    console.log(examRoom)
    res.render('exam/addExamDate', { status: 0, message: "0", username, year })

})

Router.post('/exam/addExam/finish', (req, res) => {
    Exam.findOne({}, (err, result) => {
        if (result) {
            newExam = new Exam({
                year: year,
                course: courseId2,
                room: examRoom,
                date: req.body.date,
                start: req.body.start,
                end: req.body.end
            })
        } else {
            newExam = new Exam({
                year: year,
                course: courseId2,
                room: examRoom,
                date: req.body.date,
                start: req.body.start,
                end: req.body.end
            })
        }
        newExam.save((err, result) => {
            if (err) { console.log(err) } else {
                res.redirect('/exam/examEdit')
            }
        });
    })

})

Router.get('/examEdit/delete/:id', (req, res) => {
    Exam.findOne({ _id: req.params.id }, (err, result) => {
        result.remove()
        res.redirect('/exam/examEdit');
    });

})

Router.post('/exam/examStudent',(req,res) =>{
    Exam.find({_id: req.body.examId}).populate({
        path: 'course',
        populate: [{ path: 'student' }]}).exec((err, result) => {
            res.render(('exam/examStudent'), { status: 0, message: "0", data: result, username, year })
        })
})

module.exports = Router;