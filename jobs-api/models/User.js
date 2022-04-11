const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email.",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password."],
    minlength: 8,
  },
});
// Hashing the password using the moongose middleware.
UserSchema.pre("save", async function () {
  /* Random bits to add to salt. Bigger number, more random & secure & processing power. */
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
  // next()  Passing to the next middleware.
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.checkPasswords = async function (incomingPassword) {
  const isMatch = await bycrypt.compare(incomingPassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", UserSchema);
