const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    monYears: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default:[],
      required: true,
    },
    billAvailable: {
      type: Boolean,
      default:false,
      required: true,
    },
    warrantyAvailable: {
        type: Boolean,
        default:false,
        required: true,
    },
    accessoriesAvailable: {
        type: Boolean,
        default:false,
        required: true,
    },
    boxAvailable: {
        type: Boolean,
        default:false,
        required: true,
    },
    showBidsProductPage: {
      type: Boolean,
      default:false,
  },
    productdamage: {
        type: Boolean,
        default:false,
        required: true,
    },
    firstowner: {
        type: Boolean,
        default:false,
        required: true,
    },
    scratches: {
        type: Boolean,
        default:false,
        required: true,
    },
    status: {
        type: String,
        default:"pending",
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
