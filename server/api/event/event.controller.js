'use strict';

var _ = require('lodash');

exports.index = function(req, res) {
  res.send(200)
};

exports.selected = function(req, res) {
  console.log("selected response")
  res.send(200, {
    id: "like_added",
    label : "Like"
  })
};

exports.add = function(req, res){
    console.log(req.body);
    res.send(200)
};

function handleError(res, err) {
  return res.send(500, err);
}
