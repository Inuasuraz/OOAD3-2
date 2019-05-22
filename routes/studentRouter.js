const express = require('express');
const Router = express.Router();
const Student = require('../models/student');
const Year = require('../models/year');
const Course = require('../models/course')
const Room = require('../models/room')
const Exam = require('../models/exam')
<<<<<<< HEAD



//Variable about course
var year;
=======

Router.post('/addStudentEdit', (req, res) => {
    // var id = req.body.id
    // var firstname = req.body.firstname
    // var lastname = req.body.lastname
    // var faculty = req.body.faculty
    // var branch = req.body.branch
    // var year = req.body.year

    // console.log(firstname)
    // console.log(lastname)

    res.render('addStudentEdit', { status: 3, message: "0", username, semester})
})

Router.get('/studentEdit', (req, res) => {
    Student.find({}, (err, result) => {
        // console.log(result);
        res.render('studentEdit', { status: 0, message: "0", data: result, username , semester});
    });
});
>>>>>>> addCourse

Router.get('/addStudentEdit', (req, res) => {
    var id = req.body.id
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch
    var year = req.body.year

        // res.render('addStudentEdit', { status: 0, message: "0", username, id, password ,firstname, lastname, faculty, branch , year , semester, password})
  
    res.render('addStudentEdit', { status: 0, message: "0", username, id, firstname, lastname, faculty, branch ,year , password: "", user_type: "", semester})
})

Router.post('/studentEdit/editData', (req, res) => {
    var id = req.body.id
    // var password = req.body.password
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch
    var year = req.body.year

    Student.findOne({ user_id: req.body.id }, (err, result) => {
        console.log(result)
        console.log(result.password)
        res.render('addStudentEdit', { status: 4, message: "0", username, id  ,firstname, lastname, faculty, branch , year , semester, password: result.password})
    });

    console.log(firstname)
    console.log(lastname)

    
})

Router.post('/studentEdit/editData/Submit', (req, res) => {
    const newStudent = new Student({
        user_id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        faculty: req.body.faculty,
        branch: req.body.branch,
        year: req.body.year,
        password: req.body.password,
        user_type: "student"
    });

    Student.findOne({ user_id: req.body.id }, (err, result) => {
        if (result) {

            Student.findOneAndUpdate({ user_id: req.body.id }, { "$set": { "firstname": req.body.firstname, "lastname": req.body.lastname, "faculty": req.body.faculty, "branch": req.body.branch, "year": req.body.year, "password": req.body.password , "user_type": "student" } }, { upsert: true }, function (err, doc) {
                if (err) console.log("ERR")
                else console.log("OK")
            });

            Student.find({}, (err, result) => {

                res.render('studentEdit', { status: 2, message: "แก้ไขข้อมูลสำเร็จ", data: result, username });
                // res.redirect('/studentEdit')

            });

                // res.render('addStudentEdit', { status: 3, message: "รหัสประจำตัวซ้ำกับในระบบ", username , semester });
            

        }
        //  else {
        //     newStudent.save((err, result) => {
        //         if (err) { console.log(err) }
        //         else {
        //             console.log(result);
        //             res.render('studentEdit', { status: 2, message: "เพิ่มข้อมูลสำเร็จ", data: result, username , semester});
        //         }
        //     });
        // }
    });


});

Router.get('/student/studentExamTable', (req,res) =>{
    res.render('student/studentExamTable')
})

Router.post('/addStudentEdit/submit', (req, res) => {
    const newStudent = new Student({
        user_id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        faculty: req.body.faculty,
        branch: req.body.branch,
        year: req.body.year,
        password: req.body.password,
        user_type: "student"
    });

    Student.findOne({ user_id: req.body.id }, (err, result) => {
        if (result) {

            // Student.findOneAndUpdate({ user_id: req.body.id }, { "$set": { "firstname": req.body.firstname, "lastname": req.body.lastname, "faculty": req.body.faculty, "branch": req.body.branch, "year": req.body.year } }, { upsert: true }, function (err, doc) {
            //     if (err) console.log("ERR")
            //     else console.log("OK")
            // });

            // Student.find({}, (err, result) => {

                // res.render('studentEdit', { status: 2, message: "แก้ไขข้อมูลสำเร็จ", data: result, username });
            //     // res.redirect('/studentEdit')

            // });

                res.render('addStudentEdit', { status: 3, message: "รหัสประจำตัวซ้ำกับในระบบ", username , semester, id: "",firstname: "", lastname: "", faculty: "", branch: "" , year: "" , semester: "", password: ""});
            

        } else {
            newStudent.save((err, result) => {
                if (err) { console.log(err) }
                else {
                    console.log(result);
                    res.render('studentEdit', { status: 2, message: "เพิ่มข้อมูลสำเร็จ", data: result, username , semester});
                }
            });
        }
    });


});

Router.get('/studentEdit/delete/:id', async (req, res) => {
    Student.findOne({ user_id: req.params.id }, await function (err, result) {
        result.remove();
        res.redirect('/studentEdit');
    });
});

Router.get('/student/mainStudent',(req,res) =>{
    Year.find({},(err,result) =>{
        if (err){
        }else{
            res.render('student/mainStudent', { username,data:result , semester});
        }
    })
})

Router.get('/student/studentYearSelect', (req, res) => {
    Year.find({}, (err, result) => {
        res.render(('student/studentYearSelect'), { status: 0, message: 0, data: result, username , semester})
    })
})

Router.post('/student/studentSubject',(req,res) =>{
<<<<<<< HEAD
    year = req.body.year
    Course.find({$and:[{"year":year},{student: { "$in" : [studentObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
        
        console.log(result[0])
        res.render('student/studentSubject', { status: 0, message: "0", data: result, username, year })
=======
    Course.find({$and:[{"year":semester},{student: { "$in" : [studentObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
        console.log(result)
        res.render('student/studentSubject', { status: 0, message: "0", data: result, username , semester})
>>>>>>> addCourse
    })
})

Router.get('/student/studentSubject',(req,res) =>{
<<<<<<< HEAD

    year = req.body.year
    Course.find({$and:[{"year":year},{student: { "$in" : [studentObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
=======
    Course.find({$and:[{"year":semester},{student: { "$in" : [studentObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
>>>>>>> addCourse
        console.log(result)
        res.render('student/studentSubject', { status: 0, message: "0", data: result, username, semester })
    })
})

Router.post('/student/studentExam', (req, res) => {
    courseId = req.body.courseId;
    console.log(courseId)
    var subjectId = req.body.subjectId
    console.log(subjectId)
    var subjectName = req.body.subjectName
    var examroom

    Exam.findOne({'course': courseId},(err,result)=>{
        console.log(result)
        if (result){
            Room.findOne({'_id': result.room},(err,resultRoom) =>{
                examroom = resultRoom
<<<<<<< HEAD
                Course.findOne({$and:[{"year":year},{student: { "$in" : [studentObjId]}},{ '_id':courseId }]}).populate('student').exec((err, result1) => {
                    res.render('student/studentExamList', { status: 0, message: "2", data: result1.student,data2: result,room:resultRoom, username, year ,subjectId,subjectName})
=======
                Course.findOne({ '_id': courseId }).populate('student').exec((err, result1) => {
                    res.render('student/studentExamList', { status: 0, message: "2", data: result1.student,data2: result,room:resultRoom, username,subjectId,subjectName , semester})
>>>>>>> addCourse
                })
            })
            
        }else{
            Course.find({$and:[{"year":semester},{student: { "$in" : [studentObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result1) => {
                console.log(result)
                res.render('student/studentSubject', { status: 1, message: "ยังไม่มีการสอบ", data: result1, username, semester})
            })
            
        }
    })
    
})

module.exports = Router;