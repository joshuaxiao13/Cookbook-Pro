const Moderator = require('../models/moderator');

const getRequests = async (req, res) => {
  try {
    const requests = await Moderator.find({});
    return res.status(200).json({ msg: 'success', requests });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createReviewRequest = async (req, res) => {
  try {
    const queue = await Moderator.create(req.body);
    res.status(201).json({ msg: 'success', queue });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const deleteReviewRequest = async (req, res) => {
  try {
    const queue = await Moderator.deleteMany({ recipe: req.body.recipe });
    res.status(201).json({ msg: 'success', queue });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

module.exports = {
  getRequests,
  createReviewRequest,
  deleteReviewRequest,
};
