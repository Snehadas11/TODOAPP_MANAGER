const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');

dotenv.config();
console.log("MONGO_URI is:", process.env.MONGO_URI);

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

const passport = require('./auth/passport'); // load passport config once
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./auth/google')); // Use auth routes
app.use('/todos', require('./routes/todo'));

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
app.get('/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});
app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL); // redirects to React app after logout
  });
});
