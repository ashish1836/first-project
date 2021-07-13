// for updating user
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

exports.signup = async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      location: req.body.location,
      age: req.body.age,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = signToken(newUser._id);
    res.status(201).json({ status: "success", token, data: newUser });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data!",
    });
  }
};

exports.login = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return err;
    }
    const user = await User.findOne({ email: email }).select("+password");
    // console.log(user);
    // console.log(user.password);

    if (!user || !(await user.checkPassword(password, user.password))) {
      console.log("jcsdiujdn");
      return "Incorrect password or email";
    }
    const token = signToken(user._id);
    console.log("I have token");
    res.status(200).json({ success: true, token, data: user });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data!",
    });
  }
};
