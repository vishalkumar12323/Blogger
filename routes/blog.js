import express from "express";
import multer from "multer";
import { storage1 } from "../services/file-handle.js";
import { Blog } from "../models/blogSchema.js";
import { User } from "../models/userSchema.js";
import { postNewBlog } from "../controllers/blog.js";

const blog = express.Router();

// Configure multer for file uploads
const upload = multer({ storage: storage1 });

blog.get("/new", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("new");
  } else {
    res.redirect("/login");
  }
});

blog.route("/new").post(upload.single("coverImage"), postNewBlog);
export { blog };
