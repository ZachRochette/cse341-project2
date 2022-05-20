const routes = require('express').Router();

// routes.use('/', require('./swagger'));
routes.use('/users', require('./users'));

module.exports = routes;
