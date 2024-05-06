import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      sparse: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
    userProfileImageURL: {
      type: String,
      default: "/uploads/user-profile.svg",
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});
userSchema.plugin(findOrCreate);
const User = new mongoose.model("user", userSchema);

export { User };
