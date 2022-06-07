const routes = require('express').Router();
const UsersModel = require('../models/users');
const bcrypt = require('bcrypt');

// GET ALL USER
routes.get('/', (req, res) => {
  UsersModel.find({}, (err, result) => {
    res.status(200).json(result);
  });
});

// GET ONE USER
routes.get('/:id', (req, res) => {
  try {
    UsersModel.find({ _id: req.params.id }, (err, result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json(' There is a problem try again ');
  }
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

// Login and Register
//REGISTER
routes.post('/', async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const newUser = new user({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
routes.post('/login', async (req, res) => {
  try {
    const user = await user.findOne({ email: req.body.email });
    !user && res.status(404).send('user not found');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    !validPassword && res.status(400).json('Wrong Password');

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = routes;
