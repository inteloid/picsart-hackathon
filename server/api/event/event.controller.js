'use strict';

var _ = require('lodash');

var defLed1 = {
  filters: [
    {
      name: 'type',
      op: '=',
      value: 'photo_upload'
    },
    {
      name: 'version',
      op: '='
    }
  ]
};

var defLed2 = {
  filters: [
    {
      name: 'type',
      op: '=',
      value: 'like_added'
    },
    {
      name: 'country',
      op: 'contains',
      value: 'armenia'
    }
  ]
};

var io = require('socket.io')(3300);

var eh = require('./event_handler').createHandler(io);
eh.setLed1(defLed1);
eh.setLed2(defLed2);
//75.126.39.90
var redis = require("redis"), redisClient = redis.createClient(6379, 'localhost');

var alerter = require('./alerter').createAlerter(io);

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

redisClient.psubscribe('action*');

redisClient.on('pmessage', function (pattern, channel, message) {
  eh.process(message);
  alerter.incrementCounter(message);
});

exports.index = function (req, res) {
  res.send(200)
};

exports.led1Filters = function (req, res) {
  res.send(200, defLed1)
};

exports.led2Filters = function (req, res) {
  res.send(200, defLed2)
};

exports.findAllAlerts = function (req, res) {
  var alerts = [];
  res.send(200, alerts)
};

exports.saveAlerts = function (req, res) {
  alerter.setAlerts(req.body);
  alerter.check();
  res.send(200);
};

exports.add = function (req, res) {
  var data = req.body;
  eh.setLed1(data.led1);
  eh.setLed2(data.led2);
  res.send(200)
};
