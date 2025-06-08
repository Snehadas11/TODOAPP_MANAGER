const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');

dotenv.config();

passport.serializeUser((user, done) => {
  // Serialize only user id for session
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Usually get user from DB by id here
  // For now, just pass the id as user object
  done(null, { id });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  // You can save or update user in DB here
  // For now, just pass profile as user object
  done(null, profile);
}));
