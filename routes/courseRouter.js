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
        res.render(('courseYearSelect'), { status: 0, message: 0, data: result, username , semester})
    })
})

Router.post('/courseEdit', (req, res) => {
    semester = req.body.year
    Course.find({ 'year': semester }).populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
        res.render('courseEdit', { status: 0, message: "0", data: result, username , semester })
    })

})

Router.get('/courseEdit', (req, res) => {

    Course.find({ 'year': semester }).populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
        res.render('courseEdit', { status: 0, message: "0", data: result, username , semester})
    })

})

Router.get('/addCourse/addSubject', (req, res) => {
    Subject.find({ 'year': semester }, (err, result) => {
        res.render(('courseAddSubject'), { status: 0, message: "0", data: result, username , semester })
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
                semester
            })
        })
    })
})

Router.post('/addCourse/addRoom', (req, res) => {
    instructorId = req.body.checkbox;
    Room.find({ 'year': semester }, (err, result) => {
        res.render(('courseAddRoom'), {
            status: 0,
            message: "0",
            data: result,
            username,
            semester
        })
    })

})

Router.post('/addCourse/addFinish', (req, res) => {
    roomId = req.body.roomId;
    Course.find({ 'subject': subjectId }, (err, result) => {
        if (result) {
            // console.log(result)
            group = result.length + 1
            newCourse = new Course({
                subject: subjectId,
                group: group,
                instructor: instructorId,
                room: roomId,
                student: [],
                year: semester
            })
        } else {
            newCourse = new Course({
                subject: subjectId,
                group: "1",
                instructor: instructorId,
                room: roomId,
                student: [],
                year: semester
            })
        }
        newCourse.save((err, result) => {
            if (err) { console.log(err) }
        });
    })


    Course.find({ 'year': semester }).populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
        res.render('courseEdit', { status: 0, message: "2", data: result, username, semester })
    })
})

Router.post('/courseEdit/addStudent', (req, res) => {
    courseId = req.body.courseId;
    console.log(courseId)

    Course.findOne({ '_id': courseId }).populate('student').exec((err, result) => {
        group = result.group
        subjectId = result.subject
        res.render('courseAddStudent', { status: 0, message: "2", data: result.student, username , semester })
    })
})

Router.get('/courseEdit/addStudent', (req, res) => {

    Course.findOne({ '_id': courseId }).populate('student').exec((err, result) => {
        res.render('courseAddStudent', { status: 0, message: "2", data: result.student, username, semester })
    })
})

Router.get('/courseEdit/addStudentEdit', (req, res) => {


    var id = req.body.id
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch
    var stdYear = req.body.year
    Student.find({}, (err ,result)=>{
        //  console.log(result)
        res.render(('courseAddStudentEdit'), { status: 0, message: "0", username, id, firstname, lastname, faculty,semester , branch, courseId,stdYear , data:result})
    })
})

Router.post('/courseEdit/addStudentEdit', (req, res) => {
    var id = req.body.id
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch
    var stdYear = req.body.year
    Student.findOne({user_id : id}, (err ,result)=>{
        res.render(('courseAddStudentEdit'), { status: 3, message: "0", username, id, firstname, lastname, faculty,semester , branch, courseId,stdYear , data:result})
    })

    
})

Router.post('/courseEdit/addStudent/add', (req, res) => {
    console.log(req.body.year)

    newStudent = new Student({
        user_id: req.body.id_std,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        faculty: req.body.faculty,
        branch: req.body.branch,
        year: req.body.year
    })

    Student.findOne({ user_id: req.body.id_std }, (err, result) => {
        if (result) {
            Student.findOneAndUpdate({ user_id: req.body.id_std }, { "$set": { "firstname": req.body.firstname, "lastname": req.body.lastname, "faculty": req.body.faculty, "branch": req.body.branch, "year": req.body.year } }, { upsert: true }, function (err, doc) {
                Course.findOne({ student: result._id, year: semester ,group: group,subject: subjectId}, (err, result2) => {
                    if (result2) {
                        res.render('courseAddStudent', { status: 5, message: "2", data: [], username, semester })
                    } else {
                        Course.findOneAndUpdate({ _id: courseId }, {
                            $push: {
                                student: result._id
                            }
                        }, function (err, doc) {
                            if (err) console.log(err)
                            else res.render('courseAddStudent', { status: 6, message: "2", data: [], username, semester })
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