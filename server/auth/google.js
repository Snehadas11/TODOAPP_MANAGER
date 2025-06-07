const express = require('express');
const passport = require('./passport'); // Import passport configured above

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: process.env.FRONTEND_URL
  })
);

module.exports = router;
