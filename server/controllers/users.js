const _ = require('lodash');
const Users = require('../models/users');

const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    let users_hidden = Object.entries(users).map(([key, value]) => {
      return _.omit(JSON.parse(JSON.stringify(value)), [
        'name',
        'password',
        '_id',
      ]);
    });
    res.status(200).json({ users: users_hidden });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ msg: `user with id ${username} does not exist` });
    }
    res.status(200).json({
      user: _.omit(JSON.parse(JSON.stringify(user)), ['_id', 'password']),
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({
        msg: `username ${req.body.username} already exists in database, choose a different username`,
      });
    }
    return res.status(500).json({ msg: error });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOneAndUpdate(
      { username, password },
      req.body,
      {
        new: false,
      }
    );
    if (!user) {
      return res
        .status(404)
        .json({ sucesss: false, msg: 'username or password does not match' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const addRecipe = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.params.username });
    user.recipes.push(req.body.recipe);
    const updated = await user.save();
    res.status(201).json({ recipes: updated.recipes });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.params.username });
    for (let i = 0; i < user.recipes.length; ++i) {
      if (user.recipes[i]._id == req.body.id) {
        user.recipes.splice(i, 1);
        break;
      }
    }
    const updated = await user.save();
    res.status(201).json({ recipes: updated.recipes });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.params.username });
    for (let i = 0; i < user.recipes.length; ++i) {
      if (user.recipes[i]._id == req.body.id) {
        user.recipes[i] = req.body.updatedRecipe;
        break;
      }
    }
    const updated = await user.save();
    res.status(201).json({ recipes: updated.recipes });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  loginUser,
  addRecipe,
  deleteRecipe,
  updateRecipe,
};
