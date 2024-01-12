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
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("user", userSchema);

export { User };
