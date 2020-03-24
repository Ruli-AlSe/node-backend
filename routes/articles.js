'use strict'

var express = require('express');
var ArticleController = require('../controllers/articles');

var router = express.Router();

// Configure module connect multiparty
var multiparty = require('connect-multiparty');
var md_upload = multiparty({ uploadDir: './upload/articles'});

// Test route
router.get('/data-course', ArticleController.dataCourse);

// Useful routes
router.get('/articles/get-articles/:last_five?', ArticleController.getArticles);
router.get('/articles/get-article/:id', ArticleController.getArticle);
router.post('/articles/save', ArticleController.save);
router.put('/articles/update-article/:id', ArticleController.updateArticle);
router.delete('/articles/delete-article/:id', ArticleController.deleteArticle);
router.post('/articles/upload-image/:id', md_upload, ArticleController.uploadImage);
router.get('/articles/image/:name', ArticleController.getImage);

module.exports = router;
