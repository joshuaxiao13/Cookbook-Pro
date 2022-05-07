const mongoose = require('mongoose');
const RecipeSchema = require('./recipes');

const ModeratorSchema = new mongoose.Schema({
  recipe: RecipeSchema,
});

module.exports = mongoose.model('Moderator', ModeratorSchema);
