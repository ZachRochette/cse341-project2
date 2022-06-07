const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/users', require('./users'));
routes.use('/auth', require('./auth'));
routes.use('/posts', require('./posts'));

module.exports = routes;
