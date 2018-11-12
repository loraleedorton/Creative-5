var express = require('express');
var router = express.Router();
var request = require('request');
//var fs = require('fs');

router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/json', function(req, res, next) {
  var url = "https://api.sunrise-sunset.org/";
  console.log("query ", req.query);
  url += "json?lat=" + req.query["lat"];
  url += "&lng=";
  url += req.query["lng"];
  url += "&date=today";
  console.log(url.toString());
  request(url).pipe(res);
});

module.exports = router;