const authMiddlewares = require("../middlewares/authMiddlewares");
const ProductModel = require("../models/products.model");
const router = require("express").Router();
const cloudinary = require("../config/clouldinaryConfig");
const multer = require("multer");
const UserModel = require("../models/user.model");
const notificationModel = require("../models/notification.model");

// add a new products

router.post("/add-products", authMiddlewares, async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    await newProduct.save();

    const username = await UserModel.findById(req.body.userId);
    const admins = await UserModel.find({ role: "admin" });
    admins.forEach(async (admin) => {
      const newNotification = new notificationModel({
        user: admin._id,
        title: "New product added",
        message: `New Product Added by ${username.name}`,
        onClick: "/admin",
        read: false,
      });
      await newNotification.save();
    });
    res.send({
      success: true,
      message: "product add successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all  products
router.post("/get-products", async (req, res) => {
  try {
    const { seller, category = [], age = [], status } = req.body;
    let filters = {};
    if (seller) {
      filters.seller = seller;
    }
    if (status) {
      filters.status = status;
    }

    // filters by category
    if (category.length > 0) {
      filters.category = { $in: category };
    }

    if (age.length > 0) {
      age.forEach((item) => {
        const fronteAge = item.split("-")[0];
        // console.log(fromAge);
        const toAge = item.split("-")[1];
        // console.log(toAge);
        filters.age = { $gte: Number(fronteAge), $lte: Number(toAge) };
      });
    }
    const products = await ProductModel.find(filters)
      .populate("seller")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      data: products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get products by search
router.get("/search/:key", async (req, res) => {
  try {
    const response = await ProductModel.find({
      $or: [
        { name: { $regex: req.params.key, $options: "i" } },
        { description: { $regex: req.params.key, $options: "i" } },
      ],
    });
    res.send({
      success: true,
      data: response,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get-products-by-id

router.get("/get-product-by-id/:id", authMiddlewares, async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "seller"
    );
    res.send({
      success: true,
      data: product,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// edit product

router.put("/edit-products/:id", authMiddlewares, async (req, res) => {
  try {
    await ProductModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.send({
      success: true,
      message: error.message,
    });
  }
});

// delete a product by id
router.delete("/delete-products/:id", authMiddlewares, async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.send({
      success: true,
      message: error.message,
    });
  }
});

/// get image from pc
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

router.post(
  "/upload-product-image",
  authMiddlewares,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "productPhotos",
      });

      const productId = req.body.productId;
      await ProductModel.findByIdAndUpdate(productId, {
        $push: { images: result.secure_url },
      });
      res.send({
        success: true,
        message: "Image uploaded successfully",
        data: result.secure_url,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

// update products status by admin

router.put("/update-product-status/:id", authMiddlewares, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
      status,
    });

    // send notification to seeller after admin acceepts the product
    const notification = new notificationModel({
      user: updatedProduct.seller,
      title: "product status updated",
      message: `your product ${updatedProduct.name} has been ${status}`,
      onClick: "/profile",
      read: false,
    });
    await notification.save();
    res.send({
      success: true,
      message: "products status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
