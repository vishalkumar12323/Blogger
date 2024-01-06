import { Router } from "express";
import multer from "multer";
import path from "path";
import { Blog } from "../models/blogSchema.js";
const blogRouter = Router();

// handle blog-cover images.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, path.resolve('./public/uploads/blog-img/'));
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const uploads = multer({ storage: storage });



blogRouter.route("/new-blog").get((req, res) => {
    res.render("new-blog");
}).post(uploads.single('coverImage'), async (req, res) => {
    const blog = req.body;
    if (!blog) return res.redirect("/new-blog");
    try {
        const newBlog = await new Blog({
            title: blog.title,
            content: blog.content,
            coverImage: `/uploads/blog-img/${req.file.filename}`,
        });
        await newBlog.save();
        return res.redirect("/");
    } catch (e) {
        console.log('blog error', e);
        return res.redirect("/blog/new-blog");
    }
});

blogRouter.route("/edit").get((req, res) => {
    res.render("edit");
}).post(async (req, res) => {

});

export { blogRouter };