
'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();

router.get('/events/selected', controller.selected);
router.post('/events', controller.add);

module.exports = router;
