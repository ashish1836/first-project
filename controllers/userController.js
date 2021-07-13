const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      reslts: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data!",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        location: req.body.location,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({ status: "success", data: updatedUser });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data!",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Success", message: "user deleted", data: null });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data!",
    });
  }
};

module.exports = { getAllUsers, updateUser, deleteUser };
