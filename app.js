require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require("compression");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user');


const authRouter = require("./routes/authRoutes");
const homeRouter = require("./routes/homeRoutes");

const app = express();

// Set up rate limiter: maximum of 40 requests per minute
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 40,
});

app.use(limiter);
app.use(express.static('public'));

// Set up mongoose connection
const mongoose = require("mongoose");
const { mainModule } = require('process');
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Set up compression
app.use(compression()); // Compress all routes

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// passport setup
passport.use(
  new LocalStrategy(async (username, password, done) => {
      try {
          // Find user by username
          const user = await User.findOne({ username: username });
          // If user not found, return error
          if (!user) {
              return done(null, false, { message: 'Incorrect username' });
          }
          // Match password
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
              return done(null, user);
          } else {
              return done(null, false, { message: 'Incorrect password' });
          }
      } catch (err) {
          console.error(err);
          return done(err);
      }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  };
});
  
app.use(passport.initialize());
app.use(passport.session());
app.post("/sign-in", passport.authenticate('local', {
      successRedirect: "/",
      failureRedirect: "/sign-in"
  })
);
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// routes
app.use(authRouter);
app.use(homeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
