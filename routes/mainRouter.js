const express = require('express');
const Router = express.Router();
const User = require('../models/user');
const Student = require('../models/student');
const Instructor = require('../models/instructor');
const Year = require('../models/year');


Router.post('/main', (req, res) => {
    username = req.body.username
    let password = req.body.password
    year = "2561/2"


    User.findOne({ username }, (err, result) => {
        if (err) { console.log(err) }
        if (result) {
            if (result.password == password) {
                console.log(result);
                Year.find({},(err,result) =>{
                    if (err){
                        
                    }else{
                        res.render('mainPage', {username,year,data:result});
                    }
                })
                
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
                        Year.find({},(err,result) =>{
                            if (err){
                                
                            }else{
                                res.render('student/mainStudent', { username,year,data:result});
                            }
                        })
                        
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
                                Year.find({},(err,result) =>{
                                    if (err){
                                        
                                    }else{
                                        res.render('teacher/mainTeacher', {username,year,data:result});
                                    }
                                })
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
    Year.find({},(err,result) =>{
        if (err){
            
        }else{
            res.render('mainPage', {username,year,data:result});
        }
    })
});

module.exports = Router;