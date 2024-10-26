const router = require("express").Router();
const BidsModel = require("../models/bid.model");
const authMiddlewares = require("../middlewares/authMiddlewares");
// place a bids

router.post("/place-new-bid", authMiddlewares, async (req, res) => {
  try {
    const newBids = new BidsModel(req.body);
    await newBids.save();
    res.send({
      success: true,
      message: "Bids saved successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/get-all-bid", authMiddlewares, async (req, res) => {
  try {
    const {product,seller,buyer}= req.body;
    let filters={};
    if(product){
        filters.product=product
    }if(seller){
        filters.seller=seller
    }
    if(buyer){
      filters.buyer=buyer
    }
    const Bids = await BidsModel.find(filters)
      .populate("product")
      .populate("buyer")
      .populate("seller").sort({createdAt:-1});
    res.send({
      success: true,
      data: Bids,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router
