import { User } from "../models/userSchema.js";
import { setToken } from "../middlewares/token-services.js"

const getSigninPage = (req, res) => {
    res.render("signin");
}

const getLoginPage = (req, res) => {
    res.render("login");
}


const signin = async (req, res) => {
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
}

const login = async (req, res) => {
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
}


const Logout = (req, res) => {
    res.clearCookie('token');
    return res.redirect("/");
}

export { getLoginPage, getSigninPage, signin, login, Logout }