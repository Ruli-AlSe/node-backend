'use strict'

// Load node modules to create server
var express = require('express');
var bodyParser = require('body-parser');

// Execute express (http)
var app = express();

// Load routes

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// Add routes prefix

// Test route
app.get('/test', (request, response) => {
  return response.status(200).send({
    framework: 'NodeJS',
    user: 'Raul Almanza',
    web: 'www.github.com'
  });
});

// Export actual module
module.exports = app;