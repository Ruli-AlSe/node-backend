'use stric'

var mongoose = require('mongoose');
var app = require('./app');
var port = 5000;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
        .then(() => {
          console.log('Database connection successfully!!');

          // Create server and listening on port 5000
          app.listen(port, () => {
            console.log('Server is running on http://localhost:' + port);
          })
        });