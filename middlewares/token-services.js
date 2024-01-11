import { jwt } from "../import/import.js";

const setToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        userProfile: user.userProfileImageURL
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

    return token;
}

const getToken = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return null;
    }
}

export { setToken, getToken };