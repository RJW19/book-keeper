import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    username: {
      type: String,
      unique: [true, "Username already exists"],
      sparse: true,
      match: [
        /^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Username must be 8 to 20 characters long, contain only letters, numbers, dots, and underscores, and must not start or end with a dot or underscore",
      ],
    },
    login: {
      type: String,
      unique: [true, "Login already exists"],
      sparse: true,
      match: [
        /^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Login must be 8 to 20 characters long, contain only letters, numbers, dots, and underscores, and must not start or end with a dot or underscore",
      ],
    },
    image: {
      type: String,
    },
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
  },
  {
    validateBeforeSave: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.username && !this.login) {
    next(new Error("Either username or login is required"));
  } else {
    next();
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
