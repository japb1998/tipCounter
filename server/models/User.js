const mongoose = require('mongoose');
const {Schema} = mongoose
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  username:{
    type:String,
     required: [true, "Please tell us your username"],
  },
  email: {
    type: String,
    required: [true, "Please tell us your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8,
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function(next) {
  //only run this middleware if password if modified or just created
  if (!this.isModified("password")) return next();
  //hash the password
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;