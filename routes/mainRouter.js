const express = require('express');
const Router = express.Router();
const User = require('../models/user');
const Student = require('../models/student');
const Instructor = require('../models/instructor');


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
            Student.findOne({'user_id': username},(err,result2) =>{
                if (err) { console.log(err) }
                if (result2) {
                    studentObjId = result2._id
                    console.log(studentObjId+" eiei")
                    if (username === password) {
                        res.render('student/mainStudent', { username });
                    } else {
                        console.log("Password wrong");
                        res.render('loginPage', { status: 1, message: "Password is wrong" })
                    }
                }else{
                    Instructor.findOne({'user_id': username},(err,result3) =>{
                        if (err) { console.log(err) }
                        if (result3) {
                            teacherObjId = result3._id
                            console.log(teacherObjId+" lnw")
                            if (username === password) {
                                res.render('teacher/mainTeacher', { username });
                            } else {
                                console.log("Password wrong");
                                res.render('loginPage', { status: 1, message: "Password is wrong" })
                            }
                        }else{
                            console.log("Username not found");
                            res.render('loginPage', { status: 1, message: "Username not found" })
                        }
                    })
                }
            })
            
        }
    });
});

Router.get('/mainPage', (req, res) => {
    res.render('mainPage', { username })
});

module.exports = Router;