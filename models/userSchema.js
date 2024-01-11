import { mongoose, bcrypt, findOrCreate } from "../import/import.js";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    userProfileImageURL: {
        type: String,
        default: '/uploads/user-profile.svg'
    },
    googleId: {
        type: String,
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
userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate);
const User = new mongoose.model('user', userSchema);

export { User };