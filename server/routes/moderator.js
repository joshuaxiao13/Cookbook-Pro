const express = require('express');
const router = express.Router();
const {
  createReviewRequest,
  getRequests,
  deleteReviewRequest,
} = require('../controllers/moderator');

router
  .route('/')
  .get(getRequests)
  .post(createReviewRequest)
  .delete(deleteReviewRequest);

module.exports = router;
