const User = require("../models/User");
const jwt = require("jsonwebtoken");
// const { token } = require('morgan');

const signToken = (name, id,username) => {
  return jwt.sign({ id,name,username }, process.env.JWT_SECRET, { expiresIn:'1d' });
};

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.getUser = (req, res) => {
 try {
   console.log(req.headers.authorization)
    res.status(200).json({
      status: "success",
      // data: {},
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.signup = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.create({
      name: name,
      email: email,
      username: username,
      password: password,
    });
    const token = signToken(user._id, user.name,user.username);
    res.status(200).json({
      status: "success",
      data: { user: user, token: token },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    // 1) check email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "wrong credentials",
      });
    }

    //2)user exist and password is ok
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(400).json({
        status: "error",
        message: "wrong credentials",
      });
    }
    //3) if ok return token
    const token = signToken(user.name, user._id);
    user.password = undefined;
    res.status(200).json({
      status: "success",
      data: { user, token },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
