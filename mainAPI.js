const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const path = require('path')
const port = 5000;
const mongoose = require('mongoose');
const swal = require('sweetalert')
const Router2 = require('./routes/router');
const MainRouter = require('./routes/mainRouter')
const CourseRouter = require('./routes/courseRouter')
const RoomRouter = require('./routes/roomRouter')
const SubjectRouter = require('./routes/subjectRouter')
const ExamRouter = require('./routes/examRouter')
const StudentRouter = require('./routes/studentRouter')
const InstructorRouter = require('./routes/instructorRouter')
const YearRouter = require('./routes/yearRouter')

var username;
var year;
var subjectId;
var instructorId;
var group = 1;
var student;
var roomId;
var courseId;
var courseId2;
var examRoom;
var studentObjId;
var teacherObjId;

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
mongoose.connect('mongodb+srv://admin:1212312121@cluster0-vxefs.gcp.mongodb.net/test?retryWrites=true');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.get('/',(req,res)=>{
    res.render('loginPage',{status: 0 , message : ""})
});

app.use('/',MainRouter)
app.use('/',CourseRouter)
app.use('/',RoomRouter)
app.use('/',SubjectRouter)
app.use('/',ExamRouter)
app.use('/',StudentRouter)
app.use('/',InstructorRouter)
app.use('/',YearRouter)

// // mainRouter
// app.use('/main', MainRouter);
// app.use('/mainPage', MainRouter);

// // courseRouter
// app.use('/courseYearSelect',CourseRouter)
// app.use('/courseEdit',CourseRouter)
// app.use('/addCourse',CourseRouter)
// app.use('/courseEdit',CourseRouter)

// //roomRouter
// app.use('/roomYearSelect',RoomRouter)
// app.use('/roomEdit',RoomRouter)
// app.use('/addRoom',RoomRouter)

// //subjectRouter
// app.use('/subjectYearSelect',SubjectRouter)
// app.use('/subjectEdit',SubjectRouter)
// app.use('/addSubject',SubjectRouter)

// //examRouter
// app.use('/exam',ExamRouter)
// app.use('/examEdit',ExamRouter)

// //studentRouter
// app.use('/addStudentEdit',StudentRouter)
// app.use('/studentEdit',StudentRouter)
// app.use('/addStudentEdit',StudentRouter)
// app.use('/student',StudentRouter)

// //instructorRouter
// app.use('/instructorEdit',InstructorRouter)
// app.use('/addInstructorEdit',InstructorRouter)
// app.use('/teacher',InstructorRouter)

// //yearRouter
// app.use('/addYear',YearRouter)

app.listen(port,()=>{

console.log('Hello')
})

module.exports = app;