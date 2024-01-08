import { Blog } from "../models/blogSchema.js"

const Home = async (req, res) => {
    const blogs = await Blog.find().limit(9);
    res.render("home", { user: req.user, blogs: blogs });
}
export { Home };