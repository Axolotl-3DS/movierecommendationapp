const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const dotenv = require("dotenv").config();
const User = require("./models/userModel");
const mongoose = require("mongoose");

passport.serializeUser(function (user, done) {
  console.log("serializeUser:", user.id);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("deserializeUser:", user.id);
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.github_client_id,
      clientSecret: process.env.github_client_secret,
      callbackURL: "http://localhost:3000/login/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //pasport callback function
      //check if user alraedy exists in our db with the given profile id
      console.log("profile.username:", profile.username);
      User.findOne({ username: profile.username }).then(
        //check if currentUser exists in the db
        (currentUser) => {
          if (currentUser) {
            console.log("currentUser exists in db");
            done(null, currentUser);
            //create newUser in db
          } else {
            console.log("create new user in db:", profile.username);
            new User({
              username: profile.username,
              password: profile.nodeId,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        }
      );
    }
    //Figure out with this isn't working. Above code is different syntax but same object - find/create user in db.
    //   let currentUser = User.findOne({ username: profile.username });
    //   //check if currentUser exists in the DB
    // console.log("currentUser Check:", currentUser);
    //   if (currentUser) {
    //       done(null, currentUser);
    //       console.log('CurrentUser exists in DB');
    //   } else {
    //      let newUser =  User.create({
    //           username: profile.username,
    //           password: profile.nodeId
    //      })
    //       console.log('newUser created in DB');
    //       done(null, newUser);
    //   }
  )
);
