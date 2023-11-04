// @Third Party
const express = require('express');

// @Dev
// #View Controllers
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount
} = require('../controllers/viewController');
const { isLoggedIn, protect } = require('../controllers/authController');

const router = express.Router();

router.get('/me', protect, getAccount);

router.use(isLoggedIn);
// @SSR Routes
router.get('/', getOverview);
router.get('/tour/:slug', getTour);
router.get('/login', getLoginForm);

module.exports = router;
