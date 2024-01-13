import { Blog } from "../models/blogSchema.js";

const postNewBlog = async (req, res) => {
  const blog = req.body;
  if (!blog) return res.redirect("/new");
  try {
    const newBlog = new Blog({
      title: blog.title,
      content: blog.content,
      coverImage: `uploads/blog-img/${req.file.filename}`,
      createdBy: req.user._id,
    });
    if (newBlog) {
      await newBlog.save();
      res.redirect("/");
    }
  } catch (e) {
    res.redirect("/new");
  }
};

export { postNewBlog };
