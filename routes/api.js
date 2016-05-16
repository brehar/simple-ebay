'use strict';

var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/auctions', require('./auctions'));

module.exports = router;