const express = require('express');
const Router = express.Router();
const Year = require('../models/year');
const Course = require('../models/course')
const Subject = require('../models/subject')
const Instructor = require('../models/instructor');
const Room = require('../models/room')
const Student = require('../models/student');



Router.get('/courseYearSelect', (req, res) => {
    Year.find({}, (err, result) => {
        res.render(('courseYearSelect'), { status: 0, message: 0, data: result, username })
    })
})

Router.post('/courseEdit', (req, res) => {
    year = req.body.year
    Course.find({ 'year': year }).populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
        res.render('courseEdit', { status: 0, message: "0", data: result, username, year })
    })

})

Router.get('/courseEdit', (req, res) => {

    Course.find({ 'year': year }).populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
        res.render('courseEdit', { status: 0, message: "0", data: result, username, year })
    })

})

Router.get('/addCourse/addSubject', (req, res) => {
    Subject.find({ 'year': year }, (err, result) => {
        res.render(('courseAddSubject'), { status: 0, message: "0", data: result, username, year })
    })
})

Router.post('/addCourse/addInstructor', (req, res) => {
    Subject.findOne({ 'code': req.body.code }, (err, result) => {
        subjectId = result._id;
        Instructor.find({}, (err, result2) => {
            res.render(('courseAddInstructor'), {
                status: 0,
                message: "0",
                data: result2,
                username,
                year
            })
        })
    })
})

Router.post('/addCourse/addRoom', (req, res) => {
    instructorId = req.body.checkbox;
    Room.find({ 'year': year }, (err, result) => {
        res.render(('courseAddRoom'), {
            status: 0,
            message: "0",
            data: result,
            username,
            year
        })
    })

})

Router.post('/addCourse/addFinish', (req, res) => {
    roomId = req.body.roomId;
    Course.find({ 'subject': subjectId }, (err, result) => {
        if (result) {
            console.log(result)
            group = result.length + 1
            newCourse = new Course({
                year: year,
                subject: subjectId,
                group: group,

                instructor: instructorId,
                room: roomId,
                student: []
            })
        } else {
            newCourse = new Course({
                year: year,
                subject: subjectId,
                group: "1",
                instructor: instructorId,
                room: roomId,
                student: []
            })
        }
        newCourse.save((err, result) => {
            if (err) { console.log(err) }
        });
    })


    Course.find({ 'year': year }).populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
        res.render('courseEdit', { status: 0, message: "2", data: result, username, year })
    })
})

Router.post('/courseEdit/addStudent', (req, res) => {
    courseId = req.body.courseId;
    console.log(courseId)

    Course.findOne({ '_id': courseId }).populate('student').exec((err, result) => {
        group = result.group
        subjectId = result.subject
        res.render('courseAddStudent', { status: 0, message: "2", data: result.student, username, year })
    })
})

Router.get('/courseEdit/addStudent', (req, res) => {

    Course.findOne({ '_id': courseId }).populate('student').exec((err, result) => {
        res.render('courseAddStudent', { status: 0, message: "2", data: result.student, username, year })
    })
})

Router.get('/courseEdit/addStudentEdit', (req, res) => {


    var id = req.body.id
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch
    var stdYear = req.body.year
    res.render(('courseAddStudentEdit'), { status: 0, message: "0", username, id, firstname, lastname, faculty, branch, year, courseId ,stdYear})
})

Router.post('/courseEdit/addStudentEdit', (req, res) => {


    var id = req.body.id
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch
    var stdYear = req.body.year
    res.render(('courseAddStudentEdit'), { status: 3, message: "0", username, id, firstname, lastname, faculty, branch, year, courseId,stdYear })
})

Router.post('/courseEdit/addStudent/add', (req, res) => {
    console.log(courseId)

    newStudent = new Student({
        user_id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        faculty: req.body.faculty,
        branch: req.body.branch,
        year: year
    })

    Student.findOne({ user_id: req.body.id }, (err, result) => {
        if (result) {
            Student.findOneAndUpdate({ user_id: req.body.id }, { "$set": { "firstname": req.body.firstname, "lastname": req.body.lastname, "faculty": req.body.faculty, "branch": req.body.branch, "year": req.body.year } }, { upsert: true }, function (err, doc) {
                Course.findOne({ student: result._id, year: year ,group: group,subject: subjectId}, (err, result2) => {
                    if (result2) {
                        res.redirect('/courseEdit/addStudent')
                    } else {
                        Course.findOneAndUpdate({ _id: courseId }, {
                            $push: {
                                student: result._id
                            }
                        }, function (err, doc) {
                            if (err) console.log(err)
                            else res.redirect('/courseEdit/addStudent')
                        });
                    }
                })

            });

        } else {
            newStudent.save((err, result) => {
                if (err) { console.log(err) }
                else {

                    Course.findOneAndUpdate({ _id: courseId }, {
                        $push: {
                            student: result._id
                        }
                    }, function (err, doc) {
                        if (err) {
                            console.log(err)
                        } else {
                            res.redirect('/courseEdit/addStudent')

                        }
                    });
                }
            });


        }
    });

})

Router.get('/courseEdit/delete/:id', (req, res) => {
    Course.findOne({ _id: req.params.id }, (err, result) => {
        result.remove();
        res.redirect('/courseEdit');
    });
})

Router.get('/courseEdit/deleteStudent/:id', (req, res) => {
    Course.findOneAndUpdate({ _id: courseId }, { $pull: { student: req.params.id } }, { safe: true }, function (err, doc) {
        if (err) console.log(err)
        else res.redirect(req.get('referer'));
    });
})

module.exports = Router;