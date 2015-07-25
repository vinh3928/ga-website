var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var users = db.get('users');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
});

router.get('/register', function(req, res, next) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  var errors = [];
  if (!req.body.email) {
    errors.push("email cannot be blank");
  }
  if (!req.body.password) {
    errors.push("password cannot be blank");
  }
  if (errors.length) {
    res.render('index', {error: errors, content: req.body});
    return;
  }
  users.findOne({email: req.body.email}, function (file, doc) {
    if (doc) {
      res.render("register", {error: "Email already in use", content: req.body});
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          req.body.password = hash;
          users.insert(req.body, function (err, docs) {
            req.session.id = docs._id;
            res.redirect('/intro');
          });
        });
      });
    }
  });
});

router.post('/login', function(req, res, next) {
  var errors = [];
  if (!req.body.email) {
    errors.push("email cannot be blank");
  }
  if (!req.body.password) {
    errors.push("password cannot be blank");
  }
  if (errors.length) {
    res.render('index', {error: errors, content: req.body});
    return;
  }
  users.findOne({email: req.body.email}, function (err, doc) {
    if (err) throw new Error ("cannot login");
    if (!doc) {
      res.render("index", {error: "not a valid sign-in combination", content: req.body});
      return;
    }
    if (req.body.password) {
      bcrypt.compare(req.body.password, doc.password, function(err, test) {
        if (test) {
          req.session.id = doc._id;
          res.redirect('/');
        } else {
          res.render("login", {error: "not a valid sign-in combination", content: req.body});
        }
      });
    }
  });


});
module.exports = router;
