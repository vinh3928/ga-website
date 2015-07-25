var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    unirest.get('http://graph.facebook.com/v2.4/10207106967174155/picture')
      .header('Authorization', 'Bearer ' + req.user.token)
      .header('x-li-format', 'json')
      .end(function (response) {
        console.log(response);
        res.render('index', { profile: response.body });
      })
  } else {
    res.render('index', {  });
  }
});

router.get('/home', function(req, res, next) {
  res.render('home', {});
});

router.get('/intro', function(req, res, next) {
  console.log(req.user);
  res.render('intro', {});
});

router.get('/styleguide', function(req, res, next) {
  res.render('styleguide', {});
});

module.exports = router;
