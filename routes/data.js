require('dotenv').load();
var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.GENETIC);
var population = db.get('population');

router.get('/population.json', function(req, res, next) {
  population.findOne({active: true}, function (err, docs) {
    if (err) console.log('error no true');
    if (docs) {
      res.end(JSON.stringify(docs));
    } else {
      res.type('html');
      res.send(true);
    }
  });
});

router.post('/population.json', function (req, res, next) {
   for (var i = 0, l = req.body.members.length; i < l; i ++) {
     if (i === 0) {
      population.insert({population: req.body.members[i], active: true, counter: i+1}, function (err, doc) {
      });
     } else {
      population.insert({population: req.body.members[i], active: false, counter: i+1}, function (err, doc) {
      });

     }
   }
});

module.exports = router;
