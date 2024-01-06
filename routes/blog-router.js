import { Router } from "express";
import { Blog } from "../models/blogSchema.js";
const blogRouter = Router();

blogRouter.route("/new-blog").get((req, res) => {
    res.render("new-blog");
}).post(async (req, res) => {
    const blog = req.body;
    if (!blog) return res.redirect("/new-blog");
    try {
        const newBlog = await Blog.create({
            title: blog.title,
            content: blog.content
        });
        return res.redirect("/");
    } catch (e) {
        console.log('blog error', e);
        return res.redirect("/new-blog");
    }
});

blogRouter.route("/edit").get((req, res) => {
    res.render("edit");
}).post(async (req, res) => {

});

export { blogRouter };