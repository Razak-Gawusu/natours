const express = require('express');
const { isLoggedIn, protect } = require('../controller/authController');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData
} = require('../controller/viewsController');

const router = express.Router();

router.get('/', isLoggedIn, getOverview);
router.get('/me', protect, getAccount);
router.get('/tour/:slug',isLoggedIn, getTour);
router.get('/login',isLoggedIn, getLoginForm);

router.post('/submit-user-data', protect, updateUserData)
module.exports = router;
