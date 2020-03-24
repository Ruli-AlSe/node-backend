'use strict'

var express = require('express');
var ArticleController = require('../controllers/articles');

var router = express.Router();

// Test route
router.get('/data-course', ArticleController.dataCourse);

// Useful routes
router.get('/articles/get-articles/:last_five?', ArticleController.getArticles);
router.get('/articles/get-article/:id', ArticleController.getArticle);
router.post('/articles/save', ArticleController.save);
router.put('/articles/update-article/:id', ArticleController.updateArticle);

module.exports = router;
