const express = require('express');
const Router = express.Router();
const Student = require('../models/student');
const Year = require('../models/year');
const Course = require('../models/course')
const Room = require('../models/room')
const Exam = require('../models/exam')


//Variable about course


Router.get('/addStudentEdit', (req, res) => {
    var id = req.body.id
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch
    var year = req.body.year
    res.render('addStudentEdit', { status: 0, message: "0", username, id, firstname, lastname, faculty, branch, year })
})

Router.post('/addStudentEdit', (req, res) => {
    var id = req.body.id
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch
    var year = req.body.year

    console.log(firstname)
    console.log(lastname)

    res.render('addStudentEdit', { status: 3, message: "0", username, id, firstname, lastname, faculty, branch, year })
})

// ---------------------- studentEdit ---------------------------------

Router.get('/studentEdit', (req, res) => {
    Student.find({}, (err, result) => {
        // console.log(result);
        res.render('studentEdit', { status: 0, message: "0", data: result, username });
    });
});

Router.post('/addStudentEdit/submit', (req, res) => {
    const newStudent = new Student({
        user_id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        faculty: req.body.faculty,
        branch: req.body.branch,
        year: req.body.year
    });

    Student.findOne({ user_id: req.body.id }, (err, result) => {
        if (result) {

            Student.findOneAndUpdate({ user_id: req.body.id }, { "$set": { "firstname": req.body.firstname, "lastname": req.body.lastname, "faculty": req.body.faculty, "branch": req.body.branch, "year": req.body.year } }, { upsert: true }, function (err, doc) {
                if (err) console.log("ERR")
                else console.log("OK")
            });

            Student.find({}, (err, result) => {

                res.render('studentEdit', { status: 2, message: "แก้ไขข้อมูลสำเร็จ", data: result, username });
                // res.redirect('/studentEdit')

            });

        } else {
            newStudent.save((err, result) => {
                if (err) { console.log(err) }
                else {
                    console.log(result);
                    res.render('studentEdit', { status: 2, message: "เพิ่มข้อมูลสำเร็จ", data: result, username });
                }
            });
        }
    });


});

Router.get('/studentEdit/delete/:id', async (req, res) => {
    Student.findOne({ user_id: req.params.id }, await function (err, result) {
        result.remove();

        console.log(result);
        console.log("HELLO")


        res.redirect('/studentEdit');
    });
});

Router.get('/student/mainStudent',(req,res) =>{
    Year.find({},(err,result) =>{
        if (err){
        }else{
            res.render('student/mainStudent', { username,year,data:result});
        }
    })
})

Router.get('/student/studentYearSelect', (req, res) => {
    Year.find({}, (err, result) => {
        res.render(('student/studentYearSelect'), { status: 0, message: 0, data: result, username })
    })
})

Router.post('/student/studentSubject',(req,res) =>{
        year = req.body.year
    Course.find({$and:[{"year":year},{student: { "$in" : [studentObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
        console.log(result)
        res.render('student/studentSubject', { status: 0, message: "0", data: result, username, year })
    })
})

Router.get('/student/studentSubject',(req,res) =>{
    Course.find({$and:[{"year":year},{student: { "$in" : [studentObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
        console.log(result)
        res.render('student/studentSubject', { status: 0, message: "0", data: result, username, year })
    })
})

Router.post('/student/studentExam', (req, res) => {
    courseId = req.body.courseId;
    var subjectId = req.body.subjectId
    var subjectName = req.body.subjectName
    var examroom

    Exam.findOne({'course': courseId},(err,result)=>{
        console.log(result)
        if (result){
            Room.findOne({'_id': result.room},(err,resultRoom) =>{
                examroom = resultRoom
                Course.findOne({ '_id': courseId }).populate('student').exec((err, result1) => {
                    res.render('student/studentExamList', { status: 0, message: "2", data: result1.student,data2: result,room:resultRoom, username, year ,subjectId,subjectName})
                })
            })
            
        }else{
            Course.find({$and:[{"year":year},{student: { "$in" : [studentObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result1) => {
                console.log(result)
                res.render('student/studentSubject', { status: 1, message: "ยังไม่มีการสอบ", data: result1, username, year })
            })
            
        }
    })
    
})

module.exports = Router;