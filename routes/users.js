const routes = require('express').Router();
const UsersModel = require('../models/users');

// GET ALL USERS
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
    res.status(404).json(' Could not find a user with that id');
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
  const user = {
    username: req.body.username,
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber
  };
  UsersModel.updateOne(user, (err, result) => {
    if (err) console.log(err);
    res.json(result);
  });
});

// DELETE USER
routes.delete('/:id', (req, res) => {
  try {
    UsersModel.deleteOne({ _id: req.params.id }, (err, result) => {
      res.json(result);
    });
  } catch (err) {
    res.status(404).json(' Could not find a user with that id');
  }
});

//Follow and Unfollow a user
//follow a user
routes.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await user.findById(req.params.id);
      const currentUser = await user.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json('user has been followed');
      } else {
        res.status(403).json('you already follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant follow yourself');
  }
});

//unfollow a user
routes.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await user.findById(req.params.id);
      const currentUser = await user.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json('user has been followed');
      } else {
        res.status(403).json("you don't follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant unfollow yourself');
  }
});

module.exports = routes;
