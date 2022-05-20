const routes = require('express').Router();
const UsersModel = require('../models/users');

// GET ALL USER
routes.get('/', (req, res) => {
  UsersModel.find({}, (err, result) => {
    res.status(200).json(result);
  });
});

// GET ONE USER
routes.get('/:id', (req, res) => {
  UsersModel.find({ _id: req.params.id }, (err, result) => {
    res.status(200).json(result);
  });
});

// CREATE NEW USER
routes.post('/', (req, res) => {
  const user = {
    username: req.body.username,
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber
  };
  UsersModel.create(user, (err, result) => {
    if (err) console.log(err);
    res.json(result);
  });
});

// UPDATE USER
routes.put('/:id', (req, res) => {
  UsersModel.findOneAndUpdate({ _id: req.params.id }, req.body, (err, result) => {
    res.json(result);
  });
});

// DELETE USER
routes.delete('/:id', (req, res) => {
  UsersModel.deleteOne({ _id: req.params.id }, (err, result) => {
    res.json(result);
  });
});

module.exports = routes;
