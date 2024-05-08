import express from "express";
import passport from "passport";
import multer from "multer";
import { User } from "../models/userSchema.js";
import { storage2 } from "../services/file-handle.js";

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ storage: storage2 });

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/user-blog",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.get("/signup", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/signup", upload.single("profileImage"), (req, res) => {
  User.register(
    {
      username: req.body.email,
      email: req.body.email,
      name: req.body.name,
      userProfileImageURL: `uploads/users/${req.file.filename}`,
    },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/");
        });
      }
    }
  );
});

router.post("/login", (req, res) => {
  const user = new User({
    username: req.body.email,
    password: req.body.password,
  });
  req.login(user, (err) => {
    if (err) {
      console.log("login error", err);
      res.redirect("login");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    }
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("logout error", err);
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
});

export { router };
