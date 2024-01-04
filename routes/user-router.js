import { Router } from "express";
import { User } from "../models/userSchema.js";
import { setToken } from "../middlewares/token-services.js";

const router = Router();
router.get('/', (req, res) => {
    // console.log('user ', req.user);
    res.render("home");
});
router
    .route("/signin")
    .get((req, res) => {
        res.render("signin");
    })
    .post(async (req, res) => {
        const user = req.body;
        if (!user) return res.redirect("/signin");
        try {
            const createdUser = await User.create(user);
            if (createdUser) {
                const token = setToken(createdUser);
                res.cookie('token', token);
                res.redirect("/");
            }
            return res.redirect('/');
        } catch (e) {
            console.log('e ', e);
            return res.redirect('/signin');
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

export { router };
