import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { User } from "../models/userSchema.js";
import { setToken } from "../middlewares/token-services.js";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve('./public/uploads/'));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        return cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

const router = Router();
router.get('/', (req, res) => {
    res.render("home", { user: req.user });
});
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
                userProfileImageURL: `/uploads/${req.file.filename}`,
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


router.route("/logout").get((req, res) => {
    res.clearCookie('token');
    return res.redirect("/");
});
export { router };
