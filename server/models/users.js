const mongoose = require('mongoose');
const RecipesSchema = require('./recipes');

const noWhitespace = (str) => str.indexOf(' ') == -1;

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide first name'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'must provide username'],
    unique: true,
    validate: {
      validator: noWhitespace,
      message: 'no spaces allowed in username',
    },
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'must provide email address'],
    validate: {
      validator: noWhitespace,
      message: 'no spaces allowed in username',
    },
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'must provide password'],
    validate: {
      validator: noWhitespace,
      message: 'no spaces allowed in password',
    },
    trim: true,
  },
  previous_login: {
    type: Date,
    default: new Date(),
  },
  recipes: [RecipesSchema],
});

module.exports = mongoose.model('Users', UsersSchema);
