import express from "express";
import multer from "multer";
import { storage1 } from "../services/file-handle.js";
import {
  postNewBlog,
  deleteBlog,
  newBlog,
  updateBlog,
  viewBlog,
  viewUpdatedBlog,
} from "../controllers/blog.js";

const blog = express.Router();

// Configure multer for file uploads
const upload = multer({ storage: storage1 });

blog.route("/new").get(newBlog);

blog.route("/new").post(upload.single("coverImage"), postNewBlog);

blog
  .route("/edit/:id")
  .get(viewUpdatedBlog)
  .post(upload.single("coverImage"), updateBlog);

blog.route("/:id").get(viewBlog);

blog.route("/delete/:id").get(deleteBlog);

export { blog };
