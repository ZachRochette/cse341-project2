const mongoose = require('mongoose');

// create schema and model
const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const UsersModel = mongoose.model('users', UserSchema);

module.exports = UsersModel;
