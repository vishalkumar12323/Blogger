import { Router } from "express";
import multer from "multer";
import path from "path";
import { User } from "../models/userSchema.js";
import { Blog } from "../models/blogSchema.js"
import { setToken } from "../middlewares/token-services.js";

// handle user-profile images(multer).
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve('./public/uploads/users/'));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        return cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

const router = Router();

// home page route
router.get('/', async (req, res) => {
    const blogs = await Blog.find({ id: req.user?._id });
    res.render("home", { user: req.user, blogs: blogs });
});

// signin page route
router
    .route("/signin")
    .get((req, res) => {
        res.render("signin");
    })
    .post(upload.single('profileImage'), async (req, res) => {
        const user = req.body;
        if (!user) return res.redirect("/signin");
        try {
            const createdUser = await User.create({
                name: user.name,
                email: user.email,
                password: user.password,
                userProfileImageURL: `/uploads/users/${req.file.filename}`,
            });
            if (createdUser) {
                const token = setToken(createdUser);
                res.cookie('token', token);
                res.redirect("/");
            }
            return res.redirect('/');
        } catch (e) {
            console.log('e ', e);
        }
    });


// login page route
router
    .route("/login")
    .get((req, res) => {
        res.render("login");
    })
    .post(async (req, res) => {
        const { email, password } = req.body;
        try {
            const foundedUser = await User.findOne({ email });
            if (!foundedUser) return res.render('login', { error: 'Invalid Email or Password.' });
            const isPasswordValid = foundedUser.checkPassword(password);
            if (isPasswordValid) {
                const token = setToken(foundedUser);
                res.cookie('token', token);
                res.redirect("/");
            }
        } catch (e) {
            console.log('login error', e);
            res.redirect("/login");
        }
    });


// logout page route
router.route("/logout").get((req, res) => {
    res.clearCookie('token');
    return res.redirect("/");
});
export { router };
