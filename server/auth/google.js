const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure',
    successRedirect: 'http://localhost:3000',
  }));
router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'Failed to authenticate.' });
});

module.exports = router;
