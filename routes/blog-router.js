import { Router } from "express";
import multer from "multer";
import { storage1 } from "../services/file-handle.js";
import {
    blogPage, createBlog,
    editBlog, updateBlogPage,
    viewBlog
} from "../controllers/blog.js"
const blogRouter = Router();


const uploads = multer({ storage: storage1 });

blogRouter.route("/new-blog").get(blogPage).post(uploads.single('coverImage'), createBlog);

blogRouter.route("/edit").get(editBlog).post(updateBlogPage);
blogRouter.route('/:id').get(viewBlog)

export { blogRouter };