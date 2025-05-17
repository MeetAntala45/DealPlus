const router = require("express").Router();
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddlewares = require("../middlewares/authMiddlewares");
const { Error } = require("mongoose");

router.post("/register", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      res.send({
        success: false,
        message: "User already exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashpassword;
      const newuser = new UserModel(req.body);
      await newuser.save();
      res.send({
        success: true,
        message: "User saved successfully",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.status !== "active") {
      throw new Error(
        "User's account is blocked, please contact to administrator"
      );
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.TOKEN_SECRET
    );
    res.send({
      success: true,
      message: "user login in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get current user
router.get("/profile", authMiddlewares, async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    res.send({
      success: true,
      message: "user fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-users", authMiddlewares, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send({
      success: true,
      message: "user fetch succesfully",
      data: users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.put("/update-user-status/:id", authMiddlewares, async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
