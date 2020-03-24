'use strict'
var validator = require('validator');
var Article = require('../models/article');

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
  }
};

module.exports = controller;
