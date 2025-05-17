const router = require("express").Router();
const authmiddleware = require("../middlewares/authMiddlewares");
const NotificationModel = require("../models/notification.model");

router.post("/notify", authmiddleware, async (req, res) => {
  try {
    const newNotification = new NotificationModel(req.body);
    await newNotification.save();
    res.send({
      success: false,
      message: "Notification added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-all-notifications", authmiddleware, async (req, res) => {
  try {
    const notifications = await NotificationModel.find({
      user: req.body.userId,
    }).sort({
      createdAt: -1,
    });
    res.send({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/delete-notification/:id", authmiddleware, async (req, res) => {
  try {
    await NotificationModel.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Notification Deleted Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
// read all notification by users

router.put("/read-all-notifications", authmiddleware, async (req, res) => {
  try {
    await NotificationModel.updateMany(
      { user: req.body.userId, read: false },
      { $set: { read: true } }
    );
    res.send({
      success: true,
      message: "read all notifications successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
