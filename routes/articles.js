'use strict'

var express = require('express');
var ArticleController = require('../controllers/articles');

var router = express.Router();

router.get('/data-course', ArticleController.dataCourse);

module.exports = router;
