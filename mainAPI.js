const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const path = require('path')
const port = 5000;
const mongoose = require('mongoose');
const swal = require('sweetalert')

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
mongoose.connect('mongodb://admin:a12345@ds251223.mlab.com:51223/ooad-database');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const Router2 = require('./routes/router');
app.get('/',(req,res)=>{
    res.render('loginPage',{status: 0 , message : ""})
});



app.use('/', Router2);


app.listen(port,()=>{

console.log('Hello')
})
