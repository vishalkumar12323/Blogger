import { Blog } from "../models/blogSchema.js";

const blogPage = (req, res) => {
    res.render("new-blog");
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
    const blog = await Blog.find({ createdBy: req.user.id, _id: id });
    res.render('view.ejs', { user: req.user, blog: blog });
}

const updateBlog = async (req, res) => {
    const id = req.params.id;
    const { title, content, coverImage } = req.body;
    const blog = await Blog.find({ createdBy: req.user.id, _id: id })
    if (!blog) return res.redirect('/new-blog');
    try {
        if (title) blog[0].title = title;
        if (content) blog[0].content = content;
        if (coverImage) blog[0].coverImage = `/uploads/blog-img/${req.file?.filename}`;

        await Blog.findOneAndUpdate({ createdBy: req.user.id, id }, blog);
        res.redirect('/');
    } catch (e) {
        console.log('update blog', e);
    }
}

export { blogPage, createBlog, editBlog, viewBlog, updateBlog };