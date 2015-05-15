'use strict';

var _ = require('lodash');

var defaultFilter = {
  type: {
    id: "like_added",
    label: "Like"
  }
};

var eh = require('./event_handler').createHandler();

//75.126.39.90
var redis = require("redis"), redisClient = redis.createClient(6379, 'localhost');

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

redisClient.psubscribe('action*');

redisClient.on('pmessage', function (pattern, channel, message) {
  eh.process(message)
});

exports.index = function (req, res) {
  res.send(200, defaultFilter.type)
};

exports.add = function (req, res) {
  var data = req.body;
  eh.setLed1(data.led1);
  eh.setLed2(data.led2);
  res.send(200)
};
