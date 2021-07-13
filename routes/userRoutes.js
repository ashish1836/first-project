const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const authController = require("../controllers/authController");
const middleware = require("../middleware/protect");
const { getAllUsers, updateUser, deleteUser } = require("../controllers/userController");

router.get("/", getAllUsers);

// router.get("/allusers", async (req, res) => {
//   try {
//     const users = await User.find().lean();
//     res.render("users", users);
//   } catch (err) {
//     res.status(500).render({ msg: "Cannot fetch users" });
//   }
// });

// router.get("/newuser", (req, res) => {
//   const str = { name: req.body.name, email: "ashish@gmail.com" };
//   res.render("register", str);
// });

// router.get("/log", (req, res) => {
//   res.render("login");
// });

router.post("/login", authController.login);

router.post("/signup", authController.signup);

router.patch("/update", middleware.protect, updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
