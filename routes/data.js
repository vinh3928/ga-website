require('dotenv').load();
var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var population = db.get('population');
var users = db.get('users');

router.get('/population.json', function(req, res, next) {
  population.findOne({active: true}, function (err, docs) {
    if (err) console.log('error no true');
    if (docs) {
      res.end(JSON.stringify(docs));
    } else {
      population.find({}, function (error, docums) {
        if (docums.length === 0) {
          res.type('html');
          res.send(false);
        } else {
          res.type('html');
          res.send(true);
        }
      });
    }
  });
});

router.post('/newpopulation', function (req, res, next) {
  population.find({}, {sort: {counter: -1}, limit: 1}, function (err, docs) {
    if (docs.length > 0) {
      for (var i = 0, l = req.body.members.length; i < l; i ++) {
       if (i === 0) {
        population.insert({population: req.body.members[i], active: true, hasBeen: false, counter: docs[0].counter + 1 + i}, function (err, doc) {
        });
       } else {
        population.insert({population: req.body.members[i], active: false, hasBeen: false, counter: docs[0].counter + 1 + i}, function (err, doc) {
        });
       }
      }
    } else {
      for (var i = 0, l = req.body.members.length; i < l; i ++) {
       if (i === 0) {
        population.insert({population: req.body.members[i], active: true, hasBeen: false, counter: i + 1}, function (err, doc) {
        });
       } else {
        population.insert({population: req.body.members[i], active: false, hasBeen: false, counter: i + 1}, function (err, doc) {
        });
       }
      }

    }
  });
   res.send({redirect: "home"});
});

router.get('/getpopulation', function (req, res, next) {
  population.find({}, {sort: {counter: -1}, limit: 8}, function (err, docs) {
    res.end(JSON.stringify(docs));
  });
});

router.post('/nextone', function (req, res, next) {
  population.findAndModify({_id: req.body._id}, {$set: {active: false}});
  population.findAndModify({_id: req.body._id}, {$set: {hasBeen: true}});
  population.findAndModify({counter: {$gt: req.body.counter}}, {$set: {active: true}});
  users.findAndModify({_id: req.session.id}, {$set: {visited: true}});
  // find the active thats true, change it it false, 
  // save id in variable, find next one of id, 
  // then change active to true.
  //
});

router.post('/updatefitness', function (req, res, next) {
  population.findAndModify({_id: req.body._id}, {$set: {population: {code: req.body.population.code, fitness: req.body.population.fitness}}});
});

router.get('/results', function (req, res, next) {
  population.find({hasBeen: true}, function (req, docs) {
    res.send(docs);

  });
});
module.exports = router;
