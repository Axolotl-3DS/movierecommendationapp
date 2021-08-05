const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv").config();
const User = require("../models/userModel");
const mongoose = require("mongoose");
require("../githubPassport");

//github Oauth

//Authentication Request
router.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req, res) {
    console.log("github Passport authenticated", req);
    res.cookie("Github Oauth Cookie:", req.user_id)
    //Successful authentication, redirect home
    res.redirect("http://localhost:8080/home");
  }
);

//google Oauth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.client_id,
      clientSecret: process.env.client_secret,
      callbackURL: "http://localhost:3000/login/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      //check if user already exists in our db with the given profile ID
      console.log("profile.id: ", profile.id);
      User.findOne({ username: profile.emails[0].value }).then(
        (currentUser) => {
          if (currentUser) {
            //if we already have a record with the given profile ID
            done(null, currentUser);
          } else {
            //if not, create a new user
            new User({
              username: profile.emails[0].value,
              password: profile.id,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(user.id);
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    console.log("user: ", user);
    done(null, user);
  });
});

//Authentication Request
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    console.log("hey");
    res.cookie("Google Oauth Cookie:", req.user._id);
    // Successful authentication, redirect home.
    res.redirect("http://localhost:8080/home");
  }
);

router.get("/", (req, res) => res.status(200).send("login route is working"));
router.post("/", loginController.verifyUser, (req, res) =>
  res.status(200).send("success")
);

router.post("/signup", loginController.createUser, (req, res) =>
  res.status(200).json(res.locals.newUser)
);

module.exports = router;
