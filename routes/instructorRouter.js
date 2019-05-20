const express = require('express');
const Router = express.Router();
const Instructor = require('../models/instructor');
const Year = require('../models/year');
const Course = require('../models/course')
const Room = require('../models/room')
const Exam = require('../models/exam')

// ---------------------- InstructorEdit ----------------------------

Router.get('/instructorEdit', (req, res) => {
    Instructor.find({}, (err, result) => {
        console.log(result);
        res.render('instructorEdit', { status: 0, message: "0", data: result, username });
    });
});

//-------------------- Instructor Add ------------------------

Router.get('/addInstructorEdit', (req, res) => {
    var id = req.body.id
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch
    var year = req.body.year
    res.render('addInstructorEdit', { status: 0, message: "0", username, id, firstname, lastname, faculty, branch, year })
})

Router.post('/addInstructorEdit', (req, res) => {
    var id = req.body.id
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch

    console.log(firstname)
    console.log(lastname)

    res.render('addInstructorEdit', { status: 3, message: "0", username, id, firstname, lastname, faculty, branch, year })
})


//--------------------------------------------------------


Router.get('/instructorEdit/delete/:id', async (req, res) => {
    Instructor.findOne({ user_id: req.params.id }, await function (err, result) {
        result.remove();
        console.log(result);

        res.redirect('/instructorEdit');
    });
});

///------------BUGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG---------------//
/// ------------ |------------///
///--------------V------------///
Router.post('/addinstructorEdit/submit', (req, res) => {
    const newInstructor = new Instructor({
        user_id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        faculty: req.body.faculty,
        branch: req.body.branch
    });

    Instructor.findOne({ user_id: req.body.id }, (err, result) => {
        if (result) {

            Instructor.findOneAndUpdate({ user_id: req.body.id }, { "$set": { "firstname": req.body.firstname, "lastname": req.body.lastname, "faculty": req.body.faculty, "branch": req.body.branch } }, { upsert: true }, function (err, doc) {
                if (err) console.log("ERR")
                else console.log("OK")
            });

            Instructor.find({}, (err, result) => {

                res.render('instructorEdit', { status: 2, message: "แก้ไขข้อมูลสำเร็จ", data: result, username });

            });

        } else {
            newInstructor.save((err, result) => {
                if (err) { console.log(err) }
                else {
                    console.log(result);
                    res.render('instructorEdit', { status: 2, message: "เพิ่มข้อมูลสำเร็จ", data: result, username });
                }
            });
        }
    });


});

//-------------------------------------------------------------

Router.get('/teacher/mainTeacher',(req,res) =>{
    Year.find({},(err,result) =>{
        if (err){
            
        }else{
            res.render('teacher/mainTeacher', {username,year,data:result});
        }
    })
})

Router.get('/teacher/teacherYearSelect', (req, res) => {
    Year.find({}, (err, result) => {
        res.render(('teacher/teacherYearSelect'), { status: 0, message: 0, data: result, username })
    })
})

Router.post('/teacher/teacherSubject',(req,res) =>{
    year = req.body.year
    Course.find({$and:[{"year":year},{instructor: { "$in" : [teacherObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
        console.log(result)
        res.render('teacher/teacherSubject', { status: 0, message: "0", data: result, username, year })
    })
})
Router.get('/teacher/teacherSubject',(req,res) =>{
    Course.find({$and:[{"year":year},{instructor: { "$in" : [teacherObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
        console.log(result)
        res.render('teacher/teacherSubject', { status: 0, message: "0", data: result, username, year })
    })
})

Router.post('/teacher/teacherExam', (req, res) => {
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
                    res.render('teacher/teacherExamList', { status: 0, message: "2", data: result1.student,data2: result,room:resultRoom, username, year ,subjectId,subjectName})
                })
            })
            
        }else{
            Course.find({$and:[{"year":year},{instructor: { "$in" : [teacherObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result1) => {
                console.log(result)
                res.render('teacher/teacherSubject', { status: 1, message: "ยังไม่มีการสอบ", data: result1, username, year })
            })
            
        }
    })
    
})

module.exports = Router;
