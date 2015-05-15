
'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.add);
router.get('/led1/filters', controller.led1Filters);
router.get('/led2/filters', controller.led2Filters);
router.get('/alerts', controller.findAllAlerts);
router.post('/alerts', controller.saveAlerts);


module.exports = router;
