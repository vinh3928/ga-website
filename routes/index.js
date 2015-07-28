var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var db = require('monk')(process.env.MONGOLAB_URI);
var users = db.get('users');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    unirest.get('http://graph.facebook.com/v2.4/10207106967174155/picture')
      .header('Authorization', 'Bearer ' + req.user.token)
      .header('x-li-format', 'json')
      .end(function(response) {
        res.render('index', { profile: response.body });
      });
  } else {
    res.render('index', {  });
  }
});

router.get('/second-attempt', function(req, res, next) {
  res.render('second', {});
});


router.get('/home', function(req, res, next) {
  if (req.session.id) {
    users.findOne({_id: req.session.id}, function (err, doc) {
      if (err) throw new Error('cannot find session id');
      if (doc.visited === true) {
        res.redirect('/second-attempt');
      } else {
        res.render('home', {});
      }
    });
  } else {
    res.redirect('/');
  }
});

router.get('/results', function(req, res, next) {
  res.render('results', {});
});

router.get('/intro', function(req, res, next) {
  if (req.session.id || req.session.passport.user) {
    if (req.session.id) {
      users.findOne({_id: req.session.id}, function(err, doc) {
        if (err) throw new Error("cannot find user with matching id");
        res.render('intro', {user: {name: doc.name }});
      });
    }
    else {
      res.render('intro', {});
    }
  } else {
    res.redirect('/');
  }
});

router.get('/styleguide', function(req, res, next) {
  res.render('styleguide', {});
});

module.exports = router;
