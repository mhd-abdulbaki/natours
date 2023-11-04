//@Core
const express = require('express');

//@Dev
//#Review Controllers
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview
} = require('../controllers/reviewController');

//#Auth Controllers
const { protect, restrictTo } = require('../controllers/authController');

//@Router Initialization
const router = express.Router({ mergeParams: true });

//@Protected Routes
router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post([restrictTo('user'), setTourUserIds], createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('admin', 'user'), updateReview)
  .delete(restrictTo('admin', 'user'), deleteReview);

module.exports = router;
