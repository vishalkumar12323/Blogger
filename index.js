import express from "express";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";
import { config } from "dotenv";
import passport from "passport";
import session from "express-session";
import { authenticate } from "./services/authentication.js";
import { connectDB } from "./db/connection.js";
import { router } from "./routes/user.js";
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

app.use("/", router);
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.get("/new-blog", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("new-blog");
  } else {
    res.redirect("/login");
  }
});
// Connect to the database
connectDB(process.env.LOCAL_URL).then(() =>
  console.log("Connected to the database")
);

// Start the server
app.listen(port, () => console.log(`Server started on port: ${port}`));
