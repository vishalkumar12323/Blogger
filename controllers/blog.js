import { Blog } from "../models/blogSchema.js";

const blogPage = (req, res) => {
    res.render("new-blog");
}

const editBlog = (req, res) => {
    res.render("edit");
}
const createBlog = async (req, res) => {
    const blog = req.body;
    if (!blog) return res.redirect("/new-blog");
    try {
        const newBlog = await new Blog({
            title: blog.title,
            content: blog.content,
            coverImage: `/uploads/blog-img/${req.file.filename}`,
            createdBy: req.user.id,
        });
        await newBlog.save();
        return res.redirect("/");
    } catch (e) {
        console.log('blog error', e);
        return res.redirect("/blog/new-blog");
    }
}

const updateBlogPage = async (req, res) => {

};

const viewBlog = async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.find({ createdBy: req.user.id, _id: id });
    res.render('view.ejs', { user: req.user, blog: blog });
}

export { blogPage, createBlog, editBlog, updateBlogPage, viewBlog }