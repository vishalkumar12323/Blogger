import { Blog } from "../models/blogSchema.js";
import { User } from "../models/userSchema.js";

const blogPage = (req, res) => {
    res.render("new-blog");
}

const userBlog = async (req, res) => {
    const id = req.user.id;
    try {
        const current_user = await User.findById({ _id: id });
        const blog = await Blog.find({ createdBy: req.user.id });
        res.render('user-blog', { user: current_user, blogs: blog });
    } catch (e) {
        console.log('user-blog error', e);
    }
}
const editBlog = (req, res) => {
    const id = req.params.id;
    res.render('edit', { id: id });
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


const viewBlog = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    const current_user = await User.findById({ _id: userId });
    const blog = await Blog.find();
    res.render('view.ejs', { user: current_user, blog: blog });
}

const updateBlog = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const { title, content, coverImage } = req.body;
    const blog = await Blog.find({ createdBy: req.user.id, _id: id })
    if (!blog) return res.redirect('/new-blog');
    try {
        if (title) blog[0].title = title;
        if (content) blog[0].content = content;
        if (coverImage) blog[0].coverImage = `/uploads/blog-img/${req.file?.filename}`;
        await Blog.findOneAndUpdate({ createdBy: req.user.id, _id: id }, blog);
        res.redirect('/');
    } catch (e) {
        console.log('update blog', e);
    }
}

const deleteBlog = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await Blog.deleteOne({ _id: id });
    res.redirect('/');
}

export { blogPage, createBlog, editBlog, viewBlog, updateBlog, deleteBlog, userBlog };