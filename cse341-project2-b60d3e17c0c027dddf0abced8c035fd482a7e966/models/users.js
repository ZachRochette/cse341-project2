const mongoose = require('mongoose');

// create schema and model
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  displayName: {
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
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

const UsersModel = mongoose.model('users', UserSchema);

module.exports = UsersModel;
