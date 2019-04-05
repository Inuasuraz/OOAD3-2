const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const path = require('path')
const port = 5000;
const mongoose = require('mongoose');
const swal = require('sweetalert')

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
mongoose.connect('mongodb+srv://admin:1212312121@cluster0-vxefs.gcp.mongodb.net/test?retryWrites=true');
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
