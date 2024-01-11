import { mongoose, bcrypt } from "../import/import.js";
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
        default: '/uploads/user-profile.svg'
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

userSchema.methods.checkPassword = async function (password, next) {
    try {
        const comparePassword = await bcrypt.compare(password, this.password);
        return comparePassword;
    } catch (e) {
        next(e);
    }
}
const User = new mongoose.model('user', userSchema);

export { User };