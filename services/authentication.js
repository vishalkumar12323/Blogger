import passport from "passport";

import GoogleStrategy from "passport-google-oauth20";
import express from "express";
import { User } from "../models/userSchema.js";
const app = express();

function authenticate() {
  // Configure passport
  passport.use(User.createStrategy());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/user-blog",
      },
      (accessToken, refreshToken, profile, cb) => {
        // console.log(accessToken);
        User.findOrCreate(
          {
            username: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            userProfileImageURL: profile.photos[0].value,
          },
          (err, user) => {
            return cb(err, user);
          }
        );
      }
    )
  );
}

export { authenticate };
