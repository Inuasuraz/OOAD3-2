const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const path = require('path')
const port = 5000;
const User = require('./models/user');
const Instructor = require('./models/instructor');
const mongoose = require('mongoose');
const swal = require('sweetalert')
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
mongoose.connect('mongodb://admin:a12345@ds251223.mlab.com:51223/ooad-database');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.render('loginPage',{status: 0 , message : ""})
});

var username;

app.post('/main',(req,res)=>{
   username = req.body.username
   let password = req.body.password

   User.findOne({username}, (err,result)=>{
        if(err){console.log(err)}
        if(result){
            if(result.password == password){
                console.log(result);
                res.render('mainPage', {username});
            }else{
                console.log("Password wrong");
                res.render('loginPage',{status: 1 , message : "Password is wrong"})
            }
        }else{
            console.log("Username not found");
            res.render('loginPage',{status: 1 , message : "Username not found"})
        }
   });
});

app.get('/instructorEdit',(req,res)=>{
    Instructor.find({}, (err,result)=>{
        // console.log(result);
        res.render('instructorEdit' , {status: 0 , message : "0", data : result , username});
    });
});

app.get('/instructorEdit/delete/:id',async (req,res)=>{
    Instructor.findOne({user_id : req.params.id},await function(err,result){
        result.remove();
        console.log(result);    
        
        res.redirect('/instructorEdit');
    });
});

// -------


// app.get('/instructorEdit/update/:id',(req,res)=>{
//     console.log(req.params.id)
// //     Instructor.findOne({user_id : req.params.id}, (err,result)=>{
// //         if(err){console.log(err)}
// //         if(result){
// //             console.log(res.body.username)
// //         }
// //    });
// res.redirect("/instructorEdit");
// });

// ------

app.post('/instructorEdit/submit',(req,res)=>{
    const newInstructor = new Instructor({
        user_id : req.body.id,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        faculty : req.body.faculty,
        branch : req.body.branch
    });

    Instructor.findOne({ user_id : req.body.id }, (err,result)=>{
        if(result){
            console.log("user_id is already to use")
            Instructor.find({}, (err,result)=>{
                // console.log(result);
                res.render('instructorEdit' , {status: 1 , message : "User is already to use", data : result , username});
            });
            
        }else{
            newInstructor.save((err, data)=>{
                if(err){ console.log(err) }
                else{
                    console.log(data);
                    res.redirect('/instructorEdit');
                }
            });
        }
    });

   
});

app.get('/mainPage',(req,res)=>{
    res.render('mainPage',{username})
});


app.listen(port,()=>{

console.log('Hello')
})
