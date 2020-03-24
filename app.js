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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Add routes prefix / load routes
app.use('/api', articleRoutes);

// Export actual module
module.exports = app;
