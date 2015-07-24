var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('home', {});
});

router.get('/styleguide', function(req, res, next) {
  res.render('styleguide', {});
});

module.exports = router;
