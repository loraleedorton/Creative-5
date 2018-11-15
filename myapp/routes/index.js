var express = require('express');
var router = express.Router();
var request = require('request');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://localhost:27017/';
var collection;

MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, client) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }
  else {
    console.log('Connection established to', dbUrl);
    var db = client.db('memory');
    db.createCollection('leaderboard', function(err, result) {
      if (err) {
        console.log('Creating collections failed', err);
      }
      else {
        console.log("Hooray! Collection worked");
        collection = result;
        collection.stats(function(err, stats) {
          if (err) {
            console.log('Stats messed up', err);
          }
          else {
            if (leaders.length == 0) {
              console.log("Zero leaders yet");
            }
          }
        });
      }
    });
  }
});

router.get('/leaders', function(req, res, next) {
  console.log("Getting Leaders");
  collection.find().toArray(function(err, result) {
    if (err) {
      console.log('Bad', err);
    }
    else {
      console.log("All good");
      res.send(result);
    }
  });
});

router.post('/leaders', function(req, res) {
  console.log("Leaders Post");
  console.log(req.body);
  collection.insertOne(req.body, function(err, result) {
    if (err) {
      console.log('Bad', err);
    }
    else {
      console.log("All good");
      res.end('{"success" : "Updated Successfully", "status" : 200}');
    }
  })
});

router.delete('/leaders', function(req, res, next) {
    console.log("delete route");
    collection.deleteMany({}, function(err, result) {
        if (err) return console.error(err);
        else {
            console.log("Deleting all");
            console.log("Leftovers: ", result);
            res.sendStatus(200);
        }
    });
});

var leaders = [];

module.exports = router;