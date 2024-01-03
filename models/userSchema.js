import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userProfileImageURL: {
        type: String,
        default: '/assets/user-profile.svg'
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    } catch (e) {
        console.log('err ' + e);
        return next();
    }
});
const User = new mongoose.model('user', userSchema);

export { User };