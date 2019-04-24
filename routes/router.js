// const express = require('express');
// const User = require('../models/user');
// const Instructor = require('../models/instructor');
// const Router = express.Router();
// const Student = require('../models/student');
// const Year = require('../models/year');
// const Course = require('../models/course')
// const Subject = require('../models/subject')
// const Room = require('../models/room')
// const Exam = require('../models/exam')


// var username;
// var year;

// //Variable about course
// var subjectId;
// var instructorId;
// var group = 1;
// var student;
// var roomId;
// var courseId;


// var studentObjId;
// var teacherObjId;



//  ---------------------- Main -----------------------------

// Router.post('/main', (req, res) => {
//     username = req.body.username
//     let password = req.body.password

//     User.findOne({ username }, (err, result) => {
//         if (err) { console.log(err) }
//         if (result) {
//             if (result.password == password) {
//                 console.log(result);
//                 res.render('mainPage', { username });
//             } else {
//                 console.log("Password wrong");
//                 res.render('loginPage', { status: 1, message: "Password is wrong" })
//             }
//         } else {
//             Student.findOne({'user_id': username},(err,result2) =>{
//                 if (err) { console.log(err) }
//                 if (result2) {
//                     studentObjId = result2._id
//                     console.log(studentObjId+" eiei")
//                     if (username === password) {
//                         res.render('student/mainStudent', { username });
//                     } else {
//                         console.log("Password wrong");
//                         res.render('loginPage', { status: 1, message: "Password is wrong" })
//                     }
//                 }else{
//                     Instructor.findOne({'user_id': username},(err,result3) =>{
//                         if (err) { console.log(err) }
//                         if (result3) {
//                             teacherObjId = result3._id
//                             console.log(teacherObjId+" lnw")
//                             if (username === password) {
//                                 res.render('teacher/mainTeacher', { username });
//                             } else {
//                                 console.log("Password wrong");
//                                 res.render('loginPage', { status: 1, message: "Password is wrong" })
//                             }
//                         }else{
//                             console.log("Username not found");
//                             res.render('loginPage', { status: 1, message: "Username not found" })
//                         }
//                     })
//                 }
//             })
            
//         }
//     });
// });


// Router.get('/mainPage', (req, res) => {
//     res.render('mainPage', { username })
// });

// -----------------------------------------------------------------

// ---------------------- InstructorEdit ----------------------------

// Router.get('/instructorEdit', (req, res) => {
//     Instructor.find({}, (err, result) => {
//         console.log(result);
//         res.render('instructorEdit', { status: 0, message: "0", data: result, username });
//     });
// });

//-------------------- Instructor Add ------------------------

// Router.get('/addInstructorEdit', (req, res) => {
//     var id = req.body.id
//     var firstname = req.body.firstname
//     var lastname = req.body.lastname
//     var faculty = req.body.faculty
//     var branch = req.body.branch
//     var year = req.body.year
//     res.render('addInstructorEdit', { status: 0, message: "0", username, id, firstname, lastname, faculty, branch, year })
// })

// Router.post('/addInstructorEdit', (req, res) => {
//     var id = req.body.id
//     var firstname = req.body.firstname
//     var lastname = req.body.lastname
//     var faculty = req.body.faculty
//     var branch = req.body.branch

//     console.log(firstname)
//     console.log(lastname)

//     res.render('addInstructorEdit', { status: 3, message: "0", username, id, firstname, lastname, faculty, branch, year })
// })


// //--------------------------------------------------------


// Router.get('/instructorEdit/delete/:id', async (req, res) => {
//     Instructor.findOne({ user_id: req.params.id }, await function (err, result) {
//         result.remove();
//         console.log(result);

//         res.redirect('/instructorEdit');
//     });
// });

// Router.post('/addinstructorEdit/submit', (req, res) => {
//     const newInstructor = new Instructor({
//         user_id: req.body.id,
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         faculty: req.body.faculty,
//         branch: req.body.branch
//     });

//     Instructor.findOne({ user_id: req.body.id }, (err, result) => {
//         if (result) {

//             Instructor.findOneAndUpdate({ user_id: req.body.id }, { "$set": { "firstname": req.body.firstname, "lastname": req.body.lastname, "faculty": req.body.faculty, "branch": req.body.branch } }, { upsert: true }, function (err, doc) {
//                 if (err) console.log("ERR")
//                 else console.log("OK")
//             });

//             Instructor.find({}, (err, result) => {

//                 res.render('instructorEdit', { status: 2, message: "แก้ไขข้อมูลสำเร็จ", data: result, username });

//             });

//         } else {
//             newInstructor.save((err, result) => {
//                 if (err) { console.log(err) }
//                 else {
//                     console.log(result);
//                     res.render('instructorEdit', { status: 2, message: "เพิ่มข้อมูลสำเร็จ", data: result, username });
//                 }
//             });
//         }
//     });


// });

// -------------------------------------------------------------------

// // studentEdit2
// Router.get('/addStudentEdit', (req, res) => {
//     var id = req.body.id
//     var firstname = req.body.firstname
//     var lastname = req.body.lastname
//     var faculty = req.body.faculty
//     var branch = req.body.branch
//     var year = req.body.year
//     res.render('addStudentEdit', { status: 0, message: "0", username, id, firstname, lastname, faculty, branch, year })
// })

// Router.post('/addStudentEdit', (req, res) => {
//     var id = req.body.id
//     var firstname = req.body.firstname
//     var lastname = req.body.lastname
//     var faculty = req.body.faculty
//     var branch = req.body.branch
//     var year = req.body.year

//     console.log(firstname)
//     console.log(lastname)

//     res.render('addStudentEdit', { status: 3, message: "0", username, id, firstname, lastname, faculty, branch, year })
// })

// // ---------------------- studentEdit ---------------------------------

// Router.get('/studentEdit', (req, res) => {
//     Student.find({}, (err, result) => {
//         // console.log(result);
//         res.render('studentEdit', { status: 0, message: "0", data: result, username });
//     });
// });

// Router.post('/addStudentEdit/submit', (req, res) => {
//     const newStudent = new Student({
//         user_id: req.body.id,
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         faculty: req.body.faculty,
//         branch: req.body.branch,
//         year: req.body.year
//     });

//     Student.findOne({ user_id: req.body.id }, (err, result) => {
//         if (result) {

//             Student.findOneAndUpdate({ user_id: req.body.id }, { "$set": { "firstname": req.body.firstname, "lastname": req.body.lastname, "faculty": req.body.faculty, "branch": req.body.branch, "year": req.body.year } }, { upsert: true }, function (err, doc) {
//                 if (err) console.log("ERR")
//                 else console.log("OK")
//             });

//             Student.find({}, (err, result) => {

//                 res.render('studentEdit', { status: 2, message: "แก้ไขข้อมูลสำเร็จ", data: result, username });
//                 // res.redirect('/studentEdit')

//             });

//         } else {
//             newStudent.save((err, result) => {
//                 if (err) { console.log(err) }
//                 else {
//                     console.log(result);
//                     res.render('studentEdit', { status: 2, message: "เพิ่มข้อมูลสำเร็จ", data: result, username });
//                 }
//             });
//         }
//     });


// });

// Router.get('/studentEdit/delete/:id', async (req, res) => {
//     Student.findOne({ user_id: req.params.id }, await function (err, result) {
//         result.remove();

//         console.log(result);
//         console.log("HELLO")


//         res.redirect('/studentEdit');
//     });
// });

//-----Sunny-----

// Router.get('/buildingEdit', (req, res) => {
//     Class.find({}, (err, result) => {
//         console.log(result);
//         res.render('buildingEdit', { status: 0, message: "0", data: result, username });
//     });
// });

// Router.get('/classEdit/:id', (req, res) => {
//     console.log(req.params.id)
//     Class.find({ name: req.params.id }, (err, result) => {
//         console.log(result);
//         res.render('classEdit', { status: 0, message: "0", data: result, username });
//     });
// })

// Router.get('/classEdit/del/:id', async (req, res) => {
//     Class.findOne({ user_id: req.params.id }, await function (err, result) {
//         result.remove();
//         console.log(result);

//         res.redirect('/instructorEdit');
//     });
// });

// Router.post('/classEdit/submit/:id', (req, res) => {
//     var day = req.body.day;
//     var time = req.body.time;
//     var num = req.body.num;
//     var sub = req.body.sub;
//     console.log(req.params.id)
//     console.log(day)
//     console.log(time)
//     console.log(num)
//     console.log(sub)
//     if (day == "monday") {
//         console.log("1")
//         Class.updateOne({ 'name': req.params.id, 'monday._id': time }, {
//             $set: {
//                 'monday.$.sub': sub,
//                 'monday.$.num': num
//             }
//         }, function (err, result) {
//             console.log(result);
//         });
//     } else if (day == "tuesday") {
//         console.log("2")
//         Class.updateOne({ 'name': req.params.id, 'tuesday._id': time }, {
//             $set: {
//                 'tuesday.$.sub': sub,
//                 'tuesday.$.num': num
//             }
//         }, function (err, result) {
//             console.log(result);
//         });
//     } else if (day == "wednesday") {
//         console.log("3")
//         Class.updateOne({ 'name': req.params.id, 'wednesday._id': time }, {
//             $set: {
//                 'wednesday.$.sub': sub,
//                 'wednesday.$.num': num
//             }
//         }, function (err, result) {
//             console.log(result);
//         });
//     } else if (day == "thursday") {
//         console.log("4")
//         Class.updateOne({ 'name': req.params.id, 'thursday._id': time }, {
//             $set: {
//                 'thursday.$.sub': sub,
//                 'thursday.$.num': num
//             }
//         }, function (err, result) {
//             console.log(result);
//         });
//     } else if (day == "friday") {
//         console.log("5")
//         Class.updateOne({ 'name': req.params.id, 'friday._id': time }, {
//             $set: {
//                 'friday.$.sub': sub,
//                 'friday.$.num': num
//             }
//         }, function (err, result) {
//             console.log(result);
//         });
//     } else if (day == "saturday") {
//         console.log("6")
//         Class.updateOne({ 'name': req.params.id, 'saturday._id': time }, {
//             $set: {
//                 'saturday.$.sub': sub,
//                 'saturday.$.num': num
//             }
//         }, function (err, result) {
//             console.log(result);
//         });
//     } else if (day == "sunday") {
//         console.log("7")
//         Class.updateOne({ 'name': req.params.id, 'sunday._id': time }, {
//             $set: {
//                 'sunday.$.sub': sub,
//                 'sunday.$.num': num
//             }
//         }, function (err, result) {
//             console.log(result);
//         });
//     }
//     res.redirect(req.get('referer'));

// });



//  Year Select (Sunny)

// Router.get('/yearSelect', (req, res) => {
//     Year.find({}, (err, result) => {
//         res.render(('yearSelect'), { status: 0, message: "0", data: result, username })
//     })

// })  

// Router.post('/semesterEdit', (req, res) => {
//     year = req.body.year
//     Instructor.find({}, (err, result1) => {
//         Course.find({ 'year': year }, (err, result2) => {
//             res.render('semesterEdit', { status: 0, message: "0", data: result2, teacher: result1, username, year })
//         })

//     })

// })

// Router.get('/semesterEdit', (req, res) => {
//     Instructor.find({}, (err, result1) => {
//         Course.find({ 'year': year }, (err, result2) => {
//             res.render('semesterEdit', { status: 0, message: "0", data: result2, teacher: result1, username, year })
//         })
//     })

// })

// Router.post('/semesterEdit/add', (req, res) => {
//     var subject_code = req.body.code
//     var subject_name = req.body.name
//     var group = req.body.group
//     var teacher1 = req.body.teacher1
//     var teacher2 = req.body.teacher2
//     var count = req.body.count
//     var newSubjectForCourse = new Course({
//         year: year,
//         subject_code: subject_code,
//         subject_name: subject_name,
//         group: group,
//         teacher1: teacher1,
//         teacher2: teacher2,
//         nisit: []
//     })
//     Course.insertMany(newSubjectForCourse)
//     res.redirect('/semesterEdit');
// })

// Router.get('/semesterEdit/delete/:id', async (req, res) => {
//     Course.findOneAndDelete(ObjectId(req.params.id), (err, result) => {
//         res.redirect(req.get('referer'));

//     });
// });

// Router.get('/addYear', (req, res) => {
//     res.render('addYear', { status: 0, message: "0", username })
// })

// Router.post('/addYear/add', (req, res) => {
//     var add = req.body.year + "/" + req.body.term
//     Year.findOne({ 'year': add }, (req, result) => {
//         if (result) {
//             console.log(result)
//         } else {
//             var newYear = new Year({
//                 year: add
//             })
//             Year.insertMany(newYear)
//         }
//     })
//     res.redirect('/mainPage')
// })


//-------------------------ARMMY----------------------------------------------------

// Router.get('/semesterEdit/addStudent/:id', (req, res) => {
//     Course.findOne({ subject_code: req.params.id }, (err, result) => {
//         res.render('addStudent', { status: 0, message: "0", data: result, username, id: req.params.id });
//     });

// })

// Router.post('/semesterEdit/addStudent/:id', (req, res) => {
//     var flag = 0;
//     Course.findOne({ subject_code: req.params.id }, (err, result) => {

//         for (i = 0; i < result.nisit.length; i++) {
//             // console.log(result.nisit[i].user_id)
//             if (req.body.id == result.nisit[i].user_id) {

//                 flag = 1;
//                 break;
//             }
//         }

//         if (flag == 1) {

//             Course.update(
//                 { subject_code: req.params.id, "nisit.user_id": req.body.id },
//                 {
//                     "$set": {
//                         "nisit.$.firstname": req.body.firstname, "nisit.$.lastname": req.body.lastname,
//                         "nisit.$.faculty": req.body.faculty, "nisit.$.branch": req.body.branch, "nisit.$.year": req.body.year,
//                     }
//                 },
//                 function (err, doc) {
//                     if (err) console.log(err)
//                     else res.redirect('/semesterEdit/addStudent/' + req.params.id);
//                 })


//         } else {
//             Course.findOneAndUpdate({ subject_code: req.params.id }, {
//                 $push: {
//                     nisit: {
//                         user_id: req.body.id,
//                         firstname: req.body.firstname,
//                         lastname: req.body.lastname,
//                         faculty: req.body.faculty,
//                         branch: req.body.branch,
//                         year: req.body.year

//                     }
//                 }
//             }, function (err, doc) {
//                 if (err) console.log(err)
//                 else res.redirect('/semesterEdit/addStudent/' + req.params.id);
//             });

//         }
//     });


// });

// Router.get('/semesterEdit/delete/:id/:index', (req, res) => {
//     // console.log(req.params.id+"    "+req.params.index);
//     Course.findOneAndUpdate({ subject_code: req.params.id }, { $pull: { nisit: { _id: req.params.index } } }, { safe: true }, function (err, doc) {
//         if (err) console.log(err)
//         else res.redirect(req.get('referer'));
//     });

// });
//----------------ADD COURSE----------
// Router.get('/courseYearSelect', (req, res) => {
//     Year.find({}, (err, result) => {
//         res.render(('courseYearSelect'), { status: 0, message: 0, data: result, username })
//     })
// })

// Router.post('/courseEdit', (req, res) => {
//     if (year == null) {
//         year = req.body.year
//     } else {
//         if (year == req.body.year) {

//         } else {
//             year = req.body.year
//         }
//     }

//     Course.find({ 'year': year }).populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
//         res.render('courseEdit', { status: 0, message: "0", data: result, username, year })
//     })

// })

// Router.get('/courseEdit', (req, res) => {

//     Course.find({ 'year': year }).populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
//         res.render('courseEdit', { status: 0, message: "0", data: result, username, year })
//     })

// })

// Router.get('/addCourse/addSubject', (req, res) => {
//     Subject.find({ 'year': year }, (err, result) => {
//         res.render(('courseAddSubject'), { status: 0, message: "0", data: result, username, year })
//     })
// })

// Router.post('/addCourse/addInstructor', (req, res) => {
//     Subject.findOne({ 'code': req.body.code }, (err, result) => {
//         subjectId = result._id;
//         Instructor.find({}, (err, result2) => {
//             res.render(('courseAddInstructor'), {
//                 status: 0,
//                 message: "0",
//                 data: result2,
//                 username,
//                 year
//             })
//         })
//     })
// })

// Router.post('/addCourse/addRoom', (req, res) => {
//     instructorId = req.body.checkbox;
//     Room.find({ 'year': year }, (err, result) => {
//         res.render(('courseAddRoom'), {
//             status: 0,
//             message: "0",
//             data: result,
//             username,
//             year
//         })
//     })

// })

// Router.post('/addCourse/addFinish', (req, res) => {
//     roomId = req.body.roomId;
//     Course.find({ 'subject': subjectId }, (err, result) => {
//         if (result) {
//             console.log(result)
//             group = result.length + 1
//             newCourse = new Course({
//                 year: year,
//                 subject: subjectId,
//                 group: group,

//                 instructor: instructorId,
//                 room: roomId,
//                 student: []
//             })
//         } else {
//             newCourse = new Course({
//                 year: year,
//                 subject: subjectId,
//                 group: "1",
//                 instructor: instructorId,
//                 room: roomId,
//                 student: []
//             })
//         }
//         newCourse.save((err, result) => {
//             if (err) { console.log(err) }
//         });
//     })


//     Course.find({ 'year': year }).populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
//         res.render('courseEdit', { status: 0, message: "2", data: result, username, year })
//     })
// })

// Router.post('/courseEdit/addStudent', (req, res) => {
//     courseId = req.body.courseId;

//     Course.findOne({ '_id': courseId }).populate('student').exec((err, result) => {
//         group = result.group
//         subjectId = result.subject
//         res.render('courseAddStudent', { status: 0, message: "2", data: result.student, username, year })
//     })
// })

// Router.get('/courseEdit/addStudent', (req, res) => {

//     Course.findOne({ '_id': courseId }).populate('student').exec((err, result) => {
//         res.render('courseAddStudent', { status: 0, message: "2", data: result.student, username, year })
//     })
// })

// Router.get('/courseEdit/addStudentEdit', (req, res) => {


//     var id = req.body.id
//     var firstname = req.body.firstname
//     var lastname = req.body.lastname
//     var faculty = req.body.faculty
//     var branch = req.body.branch
//     res.render(('courseAddStudentEdit'), { status: 0, message: "0", username, id, firstname, lastname, faculty, branch, year, courseId })
// })

// Router.post('/courseEdit/addStudentEdit', (req, res) => {


//     var id = req.body.id
//     var firstname = req.body.firstname
//     var lastname = req.body.lastname
//     var faculty = req.body.faculty
//     var branch = req.body.branch
//     res.render(('courseAddStudentEdit'), { status: 3, message: "0", username, id, firstname, lastname, faculty, branch, year, courseId })
// })

// Router.post('/courseEdit/addStudent/add', (req, res) => {
//     console.log(courseId)

//     newStudent = new Student({
//         user_id: req.body.id,
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         faculty: req.body.faculty,
//         branch: req.body.branch,
//         year: year
//     })

//     Student.findOne({ user_id: req.body.id }, (err, result) => {
//         if (result) {
//             Student.findOneAndUpdate({ user_id: req.body.id }, { "$set": { "firstname": req.body.firstname, "lastname": req.body.lastname, "faculty": req.body.faculty, "branch": req.body.branch, "year": req.body.year } }, { upsert: true }, function (err, doc) {
//                 Course.findOne({ student: result._id, year: year ,group: group,subject: subjectId}, (err, result2) => {
//                     if (result2) {
//                         res.redirect('/courseEdit/addStudent')
//                     } else {
//                         Course.findOneAndUpdate({ _id: courseId }, {
//                             $push: {
//                                 student: result._id
//                             }
//                         }, function (err, doc) {
//                             if (err) console.log(err)
//                             else res.redirect('/courseEdit/addStudent')
//                         });
//                     }
//                 })

//             });

//         } else {
//             newStudent.save((err, result) => {
//                 if (err) { console.log(err) }
//                 else {

//                     Course.findOneAndUpdate({ _id: courseId }, {
//                         $push: {
//                             student: result._id
//                         }
//                     }, function (err, doc) {
//                         if (err) {
//                             console.log(err)
//                         } else {
//                             res.redirect('/courseEdit/addStudent')

//                         }
//                     });
//                 }
//             });


//         }
//     });

// })

// Router.get('/courseEdit/delete/:id', (req, res) => {
//     Course.findOne({ _id: req.params.id }, (err, result) => {
//         result.remove();
//         res.redirect('/courseEdit');
//     });
// })

// Router.get('/courseEdit/deleteStudent/:id', (req, res) => {
//     Course.findOneAndUpdate({ _id: courseId }, { $pull: { student: req.params.id } }, { safe: true }, function (err, doc) {
//         if (err) console.log(err)
//         else res.redirect(req.get('referer'));
//     });
// })

//----------------ADD Room------------
// Router.get('/roomYearSelect', (req, res) => {
//     Year.find({}, (err, result) => {
//         res.render(('roomYearSelect'), { status: 0, message: "0", data: result, username })
//     })
// })

// Router.get('/roomEdit', (req, res) => {

//     Room.find({ 'year': year }, (err, result2) => {
//         res.render('roomEdit', { status: 0, message: "0", data: result2, username, year })
//     })

// })

// Router.post('/roomEdit', (req, res) => {
//     year = req.body.year

//     Room.find({ 'year': year }, (err, result) => {
//         res.render(('roomEdit'), { status: 0, message: "0", data: result, username, year })
//     })
// })

// Router.get('/addRoom', (req, res) => {
//     res.render('addRoom', { status: 0, message: "0", username, year })
// })

// Router.post('/addRoom/submit', (req, res) => {
//     const newRoom = new Room({
//         building: req.body.building,
//         name: req.body.room,
//         roomType: req.body.type,
//         year: req.body.year
//     });

//     Room.findOne({ name: req.body.name }, (err, result) => {
//         if (result) {
//             Room.findOneAndUpdate({ name: req.body.room }, { "$set": { "building": req.body.building, "roomType": req.body.type, "year": req.body.year } }, { upsert: true }, function (err, doc) {
//                 if (err) console.log("ERR")
//                 else console.log("OK")
//             });

//             Subject.find({}, (err, result) => {

//                 // res.render('studentEdit', { status: 2, message: "แก้ไขข้อมูลสำเร็จ", data: result, username });
//                 res.redirect('/roomEdit')

//             });

//         } else {
//             newRoom.save((err, result) => {
//                 if (err) { console.log(err) }
//                 else {
//                     console.log(result);
//                     res.redirect('/roomEdit')
//                 }
//             });
//         }
//     });
// });

// Router.get('/roomEdit/delete/:id', async (req, res) => {
//     Room.findOne({ name: req.params.id }, await function (err, result) {
//         result.remove();

//         console.log(result);
//         console.log("HELLO")


//         res.redirect('/roomEdit');
//     });
// });


//----------------ADD SUBJECT------------

// Router.get('/subjectYearSelect', (req, res) => {
//     Year.find({}, (err, result) => {
//         res.render(('subjectYearSelect'), { status: 0, message: "0", data: result, username })
//     })
// })

// Router.get('/subjectEdit', (req, res) => {

//     Subject.find({ 'year': year }, (err, result2) => {
//         res.render('subjectEdit', { status: 0, message: "0", data: result2, username, year })
//     })

// })

// Router.post('/subjectEdit', (req, res) => {
//     year = req.body.year

//     Subject.find({ 'year': year }, (err, result2) => {
//         res.render('subjectEdit', { status: 0, message: "0", data: result2, username, year })
//     })
// })

// Router.get('/addSubject', (req, res) => {
//     var code = req.body.id
//     var name = req.body.firstname
//     res.render('addSubject', { status: 0, message: "0", username, code, name, year })
// })

// Router.post('/addSubject', (req, res) => {
//     var code = req.body.code
//     var name = req.body.name
//     res.render('addSubject', { status: 3, message: "0", username, code, name, year })
// })


// Router.post('/addSubject/submit', (req, res) => {
//     const newSubject = new Subject({
//         code: req.body.code,
//         name: req.body.name,
//         year: req.body.year,
//     });

//     Subject.findOne({ code: req.body.code }, (err, result) => {
//         if (result) {

//             Subject.findOneAndUpdate({ code: req.body.code }, { "$set": { "code": req.body.code, "name": req.body.name, "year": req.body.year } }, { upsert: true }, function (err, doc) {
//                 if (err) console.log("ERR")
//                 else console.log("OK")
//             });

//             Subject.find({}, (err, result) => {

//                 // res.render('studentEdit', { status: 2, message: "แก้ไขข้อมูลสำเร็จ", data: result, username });
//                 res.redirect('/subjectEdit')

//             });

//         } else {
//             newSubject.save((err, result) => {
//                 if (err) { console.log(err) }
//                 else {
//                     console.log(result);
//                     res.redirect('/subjectEdit')
//                 }
//             });
//         }
//     });


// });

// Router.get('/subjectEdit/delete/:id', async (req, res) => {
//     Subject.findOne({ code: req.params.id }, await function (err, result) {
//         result.remove();

//         console.log(result);
//         console.log("HELLO")


//         res.redirect('/subjectEdit');
//     });
// });

//------------------------------End Of Arm-----------------------------------------

// Exam
// var courseId2;
// var examRoom;

// Router.get('/exam/examYearSelect', (req, res) => {
//     Year.find({}, (err, result) => {
//         res.render(('exam/examYearSelect'), { status: 0, message: 0, data: result, username })
//     })
// })

// Router.post('/exam/examEdit', (req, res) => {
//     if (year == null) {
//         year = req.body.year
//     } else {
//         if (year == req.body.year) {

//         } else {
//             year = req.body.year
//         }
//     }

//     Exam.find({ 'year': year }).populate({
//         path: 'course',
//         populate: [{ path: 'subject' }]
//     }).populate('room').exec((err, result) => {
//         res.render('exam/examEdit', { status: 0, message: "0", data: result, username, year })
//     })

// })

// Router.get('/exam/examEdit', (req, res) => {
//     Exam.find({ 'year': year }).populate({
//         path: 'course',
//         populate: [{ path: 'subject' }]
//     }).populate('room').exec((err, result) => {
//         res.render('exam/examEdit', { status: 0, message: "0", data: result, username, year })
//     })

// })

// Router.get('/exam/addExam', (req, res) => {
//     Course.find({ 'year': year }).populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
//         res.render(('exam/addExam'), { status: 0, message: "0", data: result, username, year })
//     })
// })

// Router.post('/exam/addExam/addExamRoom', (req, res) => {
//     courseId2 = req.body.id
//     console.log(courseId2)
//     Room.find({ 'year': year }, (err, result) => {
//         res.render(('exam/addExamRoom'), {
//             status: 0,
//             message: "0",
//             data: result,
//             username,
//             year
//         })
//     })

// })

// Router.post('/exam/addExam/addDate', (req, res) => {
//     examRoom = req.body.roomId
//     console.log(examRoom)
//     res.render('exam/addExamDate', { status: 0, message: "0", username, year })

// })

// Router.post('/exam/addExam/finish', (req, res) => {
//     Exam.findOne({}, (err, result) => {
//         if (result) {
//             newExam = new Exam({
//                 year: year,
//                 course: courseId2,
//                 room: examRoom,
//                 date: req.body.date,
//                 start: req.body.start,
//                 end: req.body.end
//             })
//         } else {
//             newExam = new Exam({
//                 year: year,
//                 course: courseId2,
//                 room: examRoom,
//                 date: req.body.date,
//                 start: req.body.start,
//                 end: req.body.end
//             })
//         }
//         newExam.save((err, result) => {
//             if (err) { console.log(err) } else {
//                 res.redirect('/exam/examEdit')
//             }
//         });
//     })

// })

// Router.get('/examEdit/delete/:id', (req, res) => {
//     Exam.findOne({ _id: req.params.id }, (err, result) => {
//         result.remove()
//         res.redirect('/exam/examEdit');
//     });

// })

// Router.post('/exam/examStudent',(req,res) =>{
//     Exam.find({_id: req.body.examId}).populate({
//         path: 'course',
//         populate: [{ path: 'student' }]}).exec((err, result) => {
//             res.render(('exam/examStudent'), { status: 0, message: "0", data: result, username, year })
//         })
// })

// end Exam

// student

// Router.get('/student/mainStudent',(req,res) =>{
//     res.render('student/mainStudent', { username });
// })

// Router.get('/student/studentYearSelect', (req, res) => {
//     Year.find({}, (err, result) => {
//         res.render(('student/studentYearSelect'), { status: 0, message: 0, data: result, username })
//     })
// })

// Router.post('/student/studentSubject',(req,res) =>{
//     if (year == null) {
//         year = req.body.year
//     } else {
//         if (year == req.body.year) {

//         } else {
//             year = req.body.year
//         }
//     }
//     Course.find({$and:[{"year":year},{student: { "$in" : [studentObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
//         console.log(result)
//         res.render('student/studentSubject', { status: 0, message: "0", data: result, username, year })
//     })
// })

// Router.get('/student/studentSubject',(req,res) =>{
//     if (year == null) {
//         year = req.body.year
//     } else {
//         if (year == req.body.year) {

//         } else {
//             year = req.body.year
//         }
//     }
//     Course.find({$and:[{"year":year},{student: { "$in" : [studentObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
//         console.log(result)
//         res.render('student/studentSubject', { status: 0, message: "0", data: result, username, year })
//     })
// })

// Router.post('/student/studentExam', (req, res) => {
//     courseId = req.body.courseId;
//     var subjectId = req.body.subjectId
//     var subjectName = req.body.subjectName
//     var examroom

//     Exam.findOne({'course': courseId},(err,result)=>{
//         console.log(result)
//         if (result){
//             Room.findOne({'_id': result.room},(err,resultRoom) =>{
//                 examroom = resultRoom
//                 Course.findOne({ '_id': courseId }).populate('student').exec((err, result1) => {
//                     res.render('student/studentExamList', { status: 0, message: "2", data: result1.student,data2: result,room:resultRoom, username, year ,subjectId,subjectName})
//                 })
//             })
            
//         }else{
//             Course.find({$and:[{"year":year},{student: { "$in" : [studentObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result1) => {
//                 console.log(result)
//                 res.render('student/studentSubject', { status: 1, message: "ยังไม่มีการสอบ", data: result1, username, year })
//             })
            
//         }
//     })
    
// })

// end student

//teacher
// Router.get('/teacher/mainTeacher',(req,res) =>{
//     res.render('teacher/mainTeacher', { username });
// })

// Router.get('/teacher/teacherYearSelect', (req, res) => {
//     Year.find({}, (err, result) => {
//         res.render(('teacher/teacherYearSelect'), { status: 0, message: 0, data: result, username })
//     })
// })

// Router.post('/teacher/teacherSubject',(req,res) =>{
//     if (year == null) {
//         year = req.body.year
//     } else {
//         if (year == req.body.year) {

//         } else {
//             year = req.body.year
//         }
//     }
//     Course.find({$and:[{"year":year},{instructor: { "$in" : [teacherObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result) => {
//         console.log(result)
//         res.render('teacher/teacherSubject', { status: 0, message: "0", data: result, username, year })
//     })
// })

// Router.post('/teacher/teacherExam', (req, res) => {
//     courseId = req.body.courseId;
//     var subjectId = req.body.subjectId
//     var subjectName = req.body.subjectName
//     var examroom

//     Exam.findOne({'course': courseId},(err,result)=>{
//         console.log(result)
//         if (result){
//             Room.findOne({'_id': result.room},(err,resultRoom) =>{
//                 examroom = resultRoom
//                 Course.findOne({ '_id': courseId }).populate('student').exec((err, result1) => {
//                     res.render('teacher/teacherExamList', { status: 0, message: "2", data: result1.student,data2: result,room:resultRoom, username, year ,subjectId,subjectName})
//                 })
//             })
            
//         }else{
//             Course.find({$and:[{"year":year},{instructor: { "$in" : [teacherObjId]}}]}).populate('course').populate('subject').populate('instructor').populate('room').populate('student').exec((err, result1) => {
//                 console.log(result)
//                 res.render('teacher/teacherSubject', { status: 1, message: "ยังไม่มีการสอบ", data: result1, username, year })
//             })
            
//         }
//     })
    
// })
//end teacher

// Router.post('/classEdit/open/:id', (req, res) => {


//     Course.findOneAndUpdate({ subject_code: req.params.id }, {
//         $push: {
//             nisit: {
//                 user_id: req.body.id,
//                 firstname: req.body.firstname,
//                 lastname: req.body.lastname,
//                 faculty: req.body.faculty,
//                 branch: req.body.branch,
//                 year: req.body.year

//             }
//         }
//     }, function (err, doc) {
//         if (err) console.log(err)
//         else console.log("OK")
//     });
// });


/* Router.get('/buildingEdit/roomEdit/:name',(req,res)=>{
    Class.findOne({name : req.params.name}, (err,result)=>{
        console.log(result);
        res.render('roomEdit' , {status: 0 , message : "0", data : result , username});
    });
}); */

// module.exports = Router;
