'use strict'

var controller = {

  dataCourse: (request, response) => {
    return response.status(200).send({
      framework: 'NodeJS',
      user: 'Raul Almanza',
      web: 'www.github.com'
    });
  }
};

module.exports = controller;
