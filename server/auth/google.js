const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.FRONTEND_URL,
    successRedirect: process.env.FRONTEND_URL,
  }));

module.exports = router;
