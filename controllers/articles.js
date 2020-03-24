'use strict'
var validator = require('validator');
var Article = require('../models/article');

var fs = require('fs');
var path = require('path');

var controller = {

  dataCourse: (request, response) => {
    return response.status(200).send({
      framework: 'NodeJS',
      user: 'Raul Almanza',
      web: 'www.github.com'
    });
  },

  save: (request, response) => {
    // Get params from url
    var params = request.body;

    // Validate data
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (error) {
      return response.status(200).send({
        status: 'error',
        message: 'Data is missing.'
      });
    }

    if (validate_title && validate_content) {
      // Create object
      var article = new Article();

      // Assign values
      article.title = params.title;
      article.content = params.content;
      article.image = null;

      // Save article
      article.save((err, articleStored) => {
        if (err || !articleStored) {
          return response.status(404).send({
            status: 'error',
            message: 'There ware problems saving article.'
          });
        }
        // Send response
        return response.status(200).send({
          status: 'success',
          articleStored
        });
      });

    } else {
      return response.status(200).send({
        status: 'error',
        message: 'Invalid data.'
      });
    }
  },

  getArticles: (request, response) => {
    var query = Article.find({});

    if (request.params.last_five != undefined) {
      query.limit(5);
    }

    query.sort('-_id').exec((err, articles) => {
      if(err) {
        return response.status(500).send({
          status: 'error',
          message: 'There was a problem finding articles.'
        });
      }

      if(!articles) {
        return response.status(404).send({
          status: 'error',
          message: 'There are not articles.'
        });
      }

      return response.status(200).send({
        status: 'success',
        articles
      });
    })
  },

  getArticle: (request, response) => {
    var articleId = request.params.id;


    Article.findById(articleId, (err, article) => {
      if(err) {
        return response.status(500).send({
          status: 'error',
          message: 'There was a problem finding article.'
        });
      }

      return response.status(200).send({
        status: 'success',
        article
      });
    })
  },

  updateArticle: (request, response) => {
    var articleId = request.params.id;

    var params = request.body;

    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (error) {
      return response.status(200).send({
        status: 'error',
        message: 'Data is missing.'
      });
    }

    if (validate_title && validate_content) {
      Article.findByIdAndUpdate({_id: articleId}, params, {new: true}, (error, articleUpdated) => {
        if (error) {
          return response.status(500).send({
            status: 'error',
            message: 'Error updating article.'
          });
        }

        return response.status(200).send({
          status: 'success',
          articleUpdated
        });
      });
    } else {
      return response.status(200).send({
        status: 'error',
        message: 'Invalid data.'
      });
    }
  },

  deleteArticle: (request, response) => {
    var articleId = request.params.id;

    Article.findByIdAndDelete({_id: articleId}, (error, articleRemoved) => {
      if (error) {
        return response.status(500).send({
          status: 'error',
          message: 'Error removing article.'
        });
      }

      if (!articleRemoved) {
        return response.status(404).send({
          status: 'error',
          message: 'Article does not exist.'
        });
      }

      return response.status(200).send({
        status: 'success',
        message: 'Article removed.'
      });
    });
  },

  uploadImage: (request, response) => {

    // Verify files
    if (!request.files) {
      return response.status(404).send({
        status: 'error',
        message: 'File has not been received.'
      });
    }

    // Get name and image file type
    var filePath = request.files.file0.path;
    var fileNameSplit = filePath.split('/');
    var fileName = fileNameSplit[2];
    var extSplit = fileName.split('.');
    var ext = extSplit[1];

    // Verify valid image type
    if (ext != 'png' && ext != 'jpg' && ext != 'jpeg' && ext != 'gif') {
      // Remove uploaded file
      fs.unlink(filePath, (error) => {
        return response.status(500).send({
          status: 'error',
          message: 'Invalid file extension.'
        });
      });
    } else {
      // Find article and update image url
      var articleId = request.params.id
      Article.findOneAndUpdate({_id: articleId}, {image: fileName}, {new: true}, (error, articleUpdated) => {
        if (error) {
          return response.status(404).send({
            status: 'error',
            message: 'Error updating article.'
          });
        }

        return response.status(200).send({
          status: 'success',
          articleUpdated
        });
      });
    }
  },

  getImage: (request, response) => {
    var fileName = request.params.name;
    var filePath = './upload/articles/' + fileName;

    fs.exists(filePath, (exists) => {
      if (exists) {
        return response.sendFile(path.resolve(filePath));
      } else {
        return response.status(404).send({
          status: 'error',
          message: 'File does not exists.'
        });
      }
    })
  },

  search: (request, response) => {
    var searchString = request.params.search;

    Article.find({ "$or": [
      { "title": { "$regex": searchString, "$options": "i" } },
      { "content": { "$regex": searchString, "$options": "i" } }
    ]})
    .sort([['date', 'descending']])
    .exec((error, articles) => {
      if(error) {
        return response.status(500).send({
          status: 'error',
          message: 'Request error.'
        });
      }

      if(!articles  || articles.length <= 0) {
        return response.status(500).send({
          status: 'error',
          message: 'No articles matches.'
        });
      }

      return response.status(200).send({
        status: 'success',
        articles
      });
    });
  }
};

module.exports = controller;
