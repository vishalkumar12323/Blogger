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
    console.log('req', req);
    const id = Number(req.params.id);
    res.status(200).json({ id: id });
    res.render(`/blog/view/${id}`);
}

export { blogPage, createBlog, editBlog, updateBlogPage, viewBlog }