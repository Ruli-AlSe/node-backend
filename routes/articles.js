'use strict'

var express = require('express');
var ArticleController = require('../controllers/articles');

var router = express.Router();

// Test route
router.get('/data-course', ArticleController.dataCourse);

// Useful routes
router.get('/articles/get-articles/:last_five?', ArticleController.getArticles);
router.post('/articles/save', ArticleController.save);

module.exports = router;
