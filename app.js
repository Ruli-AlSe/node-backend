'use strict'

// Load node modules to create server
var express = require('express');
var bodyParser = require('body-parser');
var articleRoutes = require('./routes/articles');

// Execute express (http)
var app = express();

// Load routes

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// Add routes prefix / load routes
app.use('/api', articleRoutes);

// Export actual module
module.exports = app;
