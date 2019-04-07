const express = require('express');
const User = require('../models/user');
const Instructor = require('../models/instructor');
const Room = require('../models/room');
const Router = express.Router();
const Student = require('../models/student');
const Year = require('../models/year');
const Course = require('../models/course')
const Subject = require('../models/subject')
var ObjectId = require('mongodb').ObjectID;

var username;
var year;



Router.route('/').get(function (req, res) {
    res.render('loginPage', { status: 0, message: "" })
});

//  ---------------------- Main -----------------------------

Router.post('/main', (req, res) => {
    username = req.body.username
    let password = req.body.password

    User.findOne({ username }, (err, result) => {
        if (err) { console.log(err) }
        if (result) {
            if (result.password == password) {
                console.log(result);
                res.render('mainPage', { username });
            } else {
                console.log("Password wrong");
                res.render('loginPage', { status: 1, message: "Password is wrong" })
            }
        } else {
            console.log("Username not found");
            res.render('loginPage', { status: 1, message: "Username not found" })
        }
    });
});


Router.get('/mainPage', (req, res) => {
    res.render('mainPage', { username })
});

// -----------------------------------------------------------------

// ---------------------- InstructorEdit ----------------------------

Router.get('/instructorEdit', (req, res) => {
    Instructor.find({}, (err, result) => {
        console.log(result);
        res.render('instructorEdit', { status: 0, message: "0", data: result, username });
    });
});

//-------------------- Instructor Add ------------------------

Router.get('/addInstructorEdit',(req,res) =>{
    var id = req.body.id
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch
    var year = req.body.year
    res.render('addInstructorEdit',{ status: 0, message: "0", username,id,firstname,lastname,faculty,branch,year })
})

Router.post('/addInstructorEdit',(req,res) =>{
    var id = req.body.id
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch

    console.log(firstname)
    console.log(lastname)

    res.render('addInstructorEdit',{ status: 3, message: "0", username,id,firstname,lastname,faculty,branch,year})
})


//--------------------------------------------------------


Router.get('/instructorEdit/delete/:id', async (req, res) => {
    Instructor.findOne({ user_id: req.params.id }, await function (err, result) {
        result.remove();
        console.log(result);

        res.redirect('/instructorEdit');
    });
});

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

// -------------------------------------------------------------------

// studentEdit2
Router.get('/addStudentEdit',(req,res) =>{
    var id = req.body.id
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch
    var year = req.body.year
    res.render('addStudentEdit',{ status: 0, message: "0", username,id,firstname,lastname,faculty,branch,year })
})

Router.post('/addStudentEdit',(req,res) =>{
    var id = req.body.id
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var faculty = req.body.faculty
    var branch = req.body.branch
    var year = req.body.year

    console.log(firstname)
    console.log(lastname)

    res.render('addStudentEdit',{ status: 3, message: "0", username,id,firstname,lastname,faculty,branch,year})
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

//-----Sunny-----

Router.get('/buildingEdit', (req, res) => {
    Room.find({}, (err, result) => {
        console.log(result);
        res.render('buildingEdit', { status: 0, message: "0", data: result, username });
    });
});

Router.get('/roomEdit/:id', (req, res) => {
    console.log(req.params.id)
    Room.find({ name: req.params.id }, (err, result) => {
        console.log(result);
        res.render('roomEdit', { status: 0, message: "0", data: result, username });
    });
})

Router.get('/roomEdit/del/:id', async (req, res) => {
    Room.findOne({ user_id: req.params.id }, await function (err, result) {
        result.remove();
        console.log(result);

        res.redirect('/instructorEdit');
    });
});

Router.post('/roomEdit/submit/:id', (req, res) => {
    var day = req.body.day;
    var time = req.body.time;
    var num = req.body.num;
    var sub = req.body.sub;
    console.log(req.params.id)
    console.log(day)
    console.log(time)
    console.log(num)
    console.log(sub)
    if (day == "monday") {
        console.log("1")
        Room.updateOne({ 'name': req.params.id, 'monday._id': time }, {
            $set: {
                'monday.$.sub': sub,
                'monday.$.num': num
            }
        }, function (err, result) {
            console.log(result);
        });
    } else if (day == "tuesday") {
        console.log("2")
        Room.updateOne({ 'name': req.params.id, 'tuesday._id': time }, {
            $set: {
                'tuesday.$.sub': sub,
                'tuesday.$.num': num
            }
        }, function (err, result) {
            console.log(result);
        });
    } else if (day == "wednesday") {
        console.log("3")
        Room.updateOne({ 'name': req.params.id, 'wednesday._id': time }, {
            $set: {
                'wednesday.$.sub': sub,
                'wednesday.$.num': num
            }
        }, function (err, result) {
            console.log(result);
        });
    } else if (day == "thursday") {
        console.log("4")
        Room.updateOne({ 'name': req.params.id, 'thursday._id': time }, {
            $set: {
                'thursday.$.sub': sub,
                'thursday.$.num': num
            }
        }, function (err, result) {
            console.log(result);
        });
    } else if (day == "friday") {
        console.log("5")
        Room.updateOne({ 'name': req.params.id, 'friday._id': time }, {
            $set: {
                'friday.$.sub': sub,
                'friday.$.num': num
            }
        }, function (err, result) {
            console.log(result);
        });
    } else if (day == "saturday") {
        console.log("6")
        Room.updateOne({ 'name': req.params.id, 'saturday._id': time }, {
            $set: {
                'saturday.$.sub': sub,
                'saturday.$.num': num
            }
        }, function (err, result) {
            console.log(result);
        });
    } else if (day == "sunday") {
        console.log("7")
        Room.updateOne({ 'name': req.params.id, 'sunday._id': time }, {
            $set: {
                'sunday.$.sub': sub,
                'sunday.$.num': num
            }
        }, function (err, result) {
            console.log(result);
        });
    }
    res.redirect(req.get('referer'));

});



//  Year Select (Sunny)
Router.get('/yearSelect', (req, res) => {
    Year.find({}, (err, result) => {
        res.render(('yearSelect'), { status: 0, message: "0", data: result, username })
    })

})  

Router.post('/semesterEdit', (req, res) => {
    year = req.body.year
    Instructor.find({}, (err, result1) => {
        Course.find({ 'year': year }, (err, result2) => {
            res.render('semesterEdit', { status: 0, message: "0", data: result2, teacher: result1, username, year })
        })

    })

})

Router.get('/semesterEdit', (req, res) => {
    Instructor.find({}, (err, result1) => {
        Course.find({ 'year': year }, (err, result2) => {
            res.render('semesterEdit', { status: 0, message: "0", data: result2, teacher: result1, username, year })
        })
    })

})

Router.post('/semesterEdit/add', (req, res) => {
    var subject_code = req.body.code
    var subject_name = req.body.name
    var group = req.body.group
    var teacher1 = req.body.teacher1
    var teacher2 = req.body.teacher2
    var count = req.body.count
    var newSubjectForCourse = new Course({
        year: year,
        subject_code: subject_code,
        subject_name: subject_name,
        group: group,
        teacher1: teacher1,
        teacher2: teacher2,
        nisit: []
    })
    Course.insertMany(newSubjectForCourse)
    res.redirect('/semesterEdit');
})

Router.get('/semesterEdit/delete/:id', async (req, res) => {
    Course.findOneAndDelete(ObjectId(req.params.id), (err, result) => {
        res.redirect(req.get('referer'));

    });
});

Router.get('/addYear',(req,res) =>{
    res.render('addYear', { status: 0, message: "0", username})
})

Router.post('/addYear/add',(req,res) =>{
    var add = req.body.year+"/"+req.body.term
    Year.find({'year':add},(req,result) =>{
        if (result){

        }else{
            var newYear = new Year({
                year: add
            })
            Year.insertMany(newYear)
        }
    })
    res.redirect('/mainPage')
})


//-------------------------ARMMY----------------------------------------------------

Router.get('/semesterEdit/addStudent/:id', (req, res) => {
    Course.findOne({ subject_code: req.params.id }, (err, result) => {
        res.render('addStudent', { status: 0, message: "0", data: result, username, id: req.params.id });
    });

})

Router.post('/semesterEdit/addStudent/:id', (req, res) => {
    var flag = 0;
    Course.findOne({ subject_code: req.params.id }, (err, result) => {

        for (i = 0; i < result.nisit.length; i++) {
            // console.log(result.nisit[i].user_id)
            if (req.body.id == result.nisit[i].user_id) {

                flag = 1;
                break;
            }
        }

        if (flag == 1) {

            Course.update(
                { subject_code : req.params.id, "nisit.user_id": req.body.id }, 
                { "$set": { "nisit.$.firstname": req.body.firstname, "nisit.$.lastname": req.body.lastname,
                "nisit.$.faculty": req.body.faculty,"nisit.$.branch": req.body.branch,"nisit.$.year": req.body.year, }}, 
                function(err, doc) {
                    if (err) console.log(err)
                        else res.redirect('/semesterEdit/addStudent/' + req.params.id);
              })

              
        } else {
            Course.findOneAndUpdate({ subject_code: req.params.id }, {
                $push: {
                    nisit: {
                        user_id: req.body.id,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        faculty: req.body.faculty,
                        branch: req.body.branch,
                        year: req.body.year

                    }
                }
            }, function (err, doc) {
                if (err) console.log(err)
                else res.redirect('/semesterEdit/addStudent/' + req.params.id);
            });

        }
    });


});

Router.get('/semesterEdit/delete/:id/:index', (req, res) => {
    // console.log(req.params.id+"    "+req.params.index);
    Course.findOneAndUpdate({ subject_code: req.params.id }, { $pull: { nisit: { _id: req.params.index } } }, { safe: true }, function (err, doc) {
        if (err) console.log(err)
        else res.redirect(req.get('referer'));
    });

});


//----------------ADD SUBJECT------------
Router.get('/subjectYearSelect', (req, res) => {
    Year.find({}, (err, result) => {
        res.render(('subjectYearSelect'), { status: 0, message: "0", data: result, username })
    })

})

Router.get('/subjectEdit', (req, res) => {

    Subject.find({ 'year': year }, (err, result2) => {
        res.render('subjectEdit', { status: 0, message: "0", data: result2, username, year })
    })

})

Router.post('/subjectEdit', (req, res) => {
    year = req.body.year

    Subject.find({ 'year': year }, (err, result2) => {
        res.render('subjectEdit', { status: 0, message: "0", data: result2, username, year })
    })
})

Router.get('/addSubject',(req,res) =>{
    var code = req.body.id
    var name = req.body.firstname
    res.render('addSubject',{ status: 0, message: "0", username,code,name,year})
})

Router.post('/addSubject',(req,res) =>{
        var code = req.body.code
        var name = req.body.name
        res.render('addSubject',{ status: 3, message: "0", username,code,name,year})
})






Router.post('/addSubject/submit', (req, res) => {
    const newSubject = new Subject({
        code: req.body.code,
        name: req.body.name,
        year: req.body.year,
    });

    Subject.findOne({ code: req.body.code }, (err, result) => {
        if (result) {

            Subject.findOneAndUpdate({ code: req.body.code  }, { "$set": { "code": req.body.code, "name": req.body.name, "year": req.body.year } }, { upsert: true }, function (err, doc) {
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

//------------------------------End Of Arm-----------------------------------------

Router.post('/roomEdit/open/:id', (req, res) => {


    Course.findOneAndUpdate({ subject_code: req.params.id }, {
        $push: {
            nisit: {
                user_id: req.body.id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                faculty: req.body.faculty,
                branch: req.body.branch,
                year: req.body.year

            }
        }
    }, function (err, doc) {
        if (err) console.log(err)
        else console.log("OK")
    });
});


/* Router.get('/buildingEdit/roomEdit/:name',(req,res)=>{
    Room.findOne({name : req.params.name}, (err,result)=>{
        console.log(result);
        res.render('roomEdit' , {status: 0 , message : "0", data : result , username});
    });
}); */

module.exports = Router;
