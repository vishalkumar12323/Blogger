import { Router } from "express";
import { User } from "../models/userSchema.js";

const router = Router();

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
            console.log(createdUser);
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
    .post(async (req, res) => { });

export { router };
