const express = require('express');
const app = express();
const User = require('../models/user');
const Instructor = require('../models/instructor');
const Room = require('../models/room');
const Router2 = express.Router();
var username;
Router2.route('/').get(function (req,res){
    res.render('loginPage',{status: 0 , message : ""})
 });


Router2.post('/main',(req,res)=>{
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

Router2.get('/instructorEdit',(req,res)=>{
    Instructor.find({}, (err,result)=>{
        console.log(result);
        res.render('instructorEdit' , {status: 0 , message : "0", data : result , username});
    });
});

Router2.get('/instructorEdit/delete/:id',async (req,res)=>{
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

Router2.post('/instructorEdit/submit',(req,res)=>{
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

Router2.get('/mainPage',(req,res)=>{
    res.render('mainPage',{username})
});


//-----Sunny-----

Router2.get('/buildingEdit',(req,res)=>{
    Room.find({}, (err,result)=>{
        console.log(result);
        res.render('buildingEdit' , {status: 0 , message : "0", data : result , username});
    });
});

Router2.get('/roomEdit/:id',(req,res)=>{
    console.log(req.params.id)
    Room.find({name:req.params.id}, (err,result)=>{
        console.log(result);
        res.render('roomEdit' , {data : result , username});
    });
})

Router2.get('/roomEdit/del/:id',async (req,res)=>{
    room.findOne({user_id : req.params.id},await function(err,result){
        result.remove();
        console.log(result);    
        
        res.redirect('/instructorEdit');
    });
});

Router2.post('/roomEdit/submit/:id',(req,res)=>{
    var day = req.body.day;
    var time = req.body.time;
    var num = req.body.num;
    var sub = req.body.sub;
    console.log(req.params.id)
    console.log(day)
    console.log(time)
    console.log(num)
    console.log(sub)
    if (day=="monday"){
        console.log("1")
        Room.updateOne({'name': req.params.id,'monday._id' : time},{ $set:{
                'monday.$.sub' : sub,
                'monday.$.num' : num
            }}, function(err,result){
                console.log(result);
            });
    }else if (day=="tuesday"){
        console.log("2")
        Room.updateOne({'name': req.params.id,'tuesday._id' : time},{ $set:{
            'tuesday.$.sub' : sub,
            'tuesday.$.num' : num
        }}, function(err,result){
            console.log(result);
        });
    }else if (day=="wednesday"){
        console.log("3")
        Room.updateOne({'name': req.params.id,'wednesday._id' : time},{ $set:{
            'wednesday.$.sub' : sub,
            'wednesday.$.num' : num
        }}, function(err,result){
            console.log(result);
        });
    }else if (day=="thursday"){
        console.log("4")
        Room.updateOne({'name': req.params.id,'thursday._id' : time},{ $set:{
            'thursday.$.sub' : sub,
            'thursday.$.num' : num
        }}, function(err,result){
            console.log(result);
        });
    }else if (day=="friday"){
        console.log("5")
        Room.updateOne({'name': req.params.id,'friday._id' : time},{ $set:{
            'friday.$.sub' : sub,
            'friday.$.num' : num
        }}, function(err,result){
            console.log(result);
        });
    }else if (day=="saturday"){
        console.log("6")
        Room.updateOne({'name': req.params.id,'saturday._id' : time},{ $set:{
            'saturday.$.sub' : sub,
            'saturday.$.num' : num
        }}, function(err,result){
            console.log(result);
        });
    }else if (day=="sunday"){
        console.log("7")
        Room.updateOne({'name': req.params.id,'sunday._id' : time},{ $set:{
            'sunday.$.sub' : sub,
            'sunday.$.num' : num
        }}, function(err,result){
            console.log(result);
        });
    }
    res.redirect(req.get('referer'));

    // Room.findOne({name: req.params.id},(err,result)=>{
    //     console.log(result)
    //     res.redirect('/roomEdit');
    // })
    
    // Room.updateOne({name : req.params.id},{ $set:{
    //     day:{
    //         time: {
    //             "sub": sub,
    //             "num": num
    //         }
    //     }
    // }}, function(err,result){
    //     console.log(result);
    // });
    // Room.findOne({name: req.params.id},(err,result)=>{
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log(result)
    //     }
        
    // });
});

Router2.post('/roomEdit/open/:id', (req,res)=>{
    Room.findOne({name : req.params.id}, function(err,result){
        console.log(result);
          res.send('roomEdit' , {data : result , username});
    });
});


/* Router2.get('/buildingEdit/roomEdit/:name',(req,res)=>{
    Room.findOne({name : req.params.name}, (err,result)=>{
        console.log(result);
        res.render('roomEdit' , {status: 0 , message : "0", data : result , username});
    });
}); */

module.exports = Router2;
