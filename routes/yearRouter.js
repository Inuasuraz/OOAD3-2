const express = require('express');
const Router = express.Router();
const Year = require('../models/year');

Router.get('/addYear', (req, res) => {
    res.render('addYear', { status: 0, message: "0", username })
})

Router.post('/addYear/add', (req, res) => {
    var add = req.body.year + "/" + req.body.term
    Year.findOne({ 'year': add }, (req, result) => {
        if (result) {
            console.log(result)
        } else {
            var newYear = new Year({
                year: add
            })
            Year.insertMany(newYear)
        }
    })
    res.redirect('/mainPage')
})

module.exports = Router;