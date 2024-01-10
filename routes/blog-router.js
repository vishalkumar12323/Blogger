import { Router } from "express";
import multer from "multer";
import { storage1 } from "../services/file-handle.js";
import {
    blogPage, createBlog,
    editBlog, updateBlog,
    viewBlog
} from "../controllers/blog.js"
const blogRouter = Router();


const uploads = multer({ storage: storage1 });

blogRouter.route("/new-blog").get(blogPage).post(uploads.single('coverImage'), createBlog);

blogRouter.route('/:id').get(viewBlog)
blogRouter.route("/edit/:id").get(editBlog).post(uploads.single('coverImage'), updateBlog);

export { blogRouter };