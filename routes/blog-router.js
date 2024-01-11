import { express, multer, blogPage, createBlog, userBlog, viewBlog, editBlog, updateBlog, deleteBlog, storage1 } from "../import/import.js"

const blogRouter = express.Router();

const uploads = multer({ storage: storage1 });

blogRouter.route("/new-blog").get(blogPage).post(uploads.single('coverImage'), createBlog);
blogRouter.route('/user-blog').get(userBlog);
blogRouter.route('/:id').get(viewBlog);
blogRouter.route("/edit/:id").get(editBlog).post(uploads.single('coverImage'), updateBlog);
blogRouter.route('/delete/:id').get(deleteBlog);

export { blogRouter };