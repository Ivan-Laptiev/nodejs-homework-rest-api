const {Schema, model} = require("mongoose");
const {handleSaveErrors} = require('../helpers')

const userSchema = new Schema ({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    avatarURL:{
      type: String,
      required: true,
    },
    verify:{
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    token: {
      type: String,
      default: null,
    },
  },{versionKey: false, timestamps: true})

  userSchema.post("save", handleSaveErrors);

  const User = model("user", userSchema)

  module.exports = User;