import express from "express";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";
import { config } from "dotenv";
import passport from "passport";
import session from "express-session";
import { authenticate } from "./services/authentication.js";
import { connectDB } from "./db/connection.js";
import { User } from "./models/userSchema.js";
import { storage2 } from "./services/file-handle.js";

// Load environment variables
config();

// Set up Express app
const app = express();
const port = 8080;

// Configure multer for file uploads
const upload = multer({ storage: storage2 });

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Set view engine and views path
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Configure session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
authenticate();

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/user-blog",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.get("/signup", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/new-blog", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("new-blog");
  } else {
    res.redirect("/login");
  }
});

app.post("/signup", upload.single("profileImage"), (req, res) => {
  User.register(
    {
      username: req.body.email,
      email: req.body.email,
      name: req.body.name,
      userProfileImageURL: `uploads/user/${req.file.filename}`,
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

app.post("/login", (req, res) => {
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

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("logout error", err);
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
});

// Connect to the database
connectDB(process.env.LOCAL_URL).then(() =>
  console.log("Connected to the database")
);

// Start the server
app.listen(port, () => console.log(`Server started on port: ${port}`));
