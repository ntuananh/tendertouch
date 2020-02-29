var express = require('express');
var router = express.Router();
const database = require('../database.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  let name='Dear';
    res.render('index', { title: name , message: 'Hello there!'});
});

module.exports = router;
