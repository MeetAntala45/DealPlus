import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import { SetLoader } from "../../redux/LoadersSlice";
import { GetProductById, getAllBids } from "../../Apicalls/products";
import Divider from "../../components/Divider";
import { useParams } from "react-router-dom";
import moment from "moment";
import BidModel from "./BidModel";

const SingleProduct = () => {
  const { user } = useSelector((state) => state.users);
  const [selectedImagesIndex, setselectedImagesIndex] = useState(0);
  const [showAddNewBid, setshowAddNewBid] = useState(false);
  const [product, setproduct] = useState(null);
  const [filters, setfilters] = useState({
    status: "approved",
  });

  const { id } = useParams();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        const bidsResponse = await getAllBids({ product: id });
        setproduct({
          ...response.data,
          bids: bidsResponse.data,
        });
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    product && (
      <div className="container mx-auto my-5">
        <div className="grid grid-cols-2 gap-5">
          {/* Image Section */}
          <div className="flex flex-col gap-5">
          <div className="h-80 overflow-hidden">
  <img
    src={product.images[selectedImagesIndex]}
    alt="productImg"
    className="w-full max-h-full object-contain rounded-md border border-solid"
  />
</div>
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  className={
                    "w-20 h-20 object-cover rounded-md cursor-pointer p-2" +
                    (selectedImagesIndex === index
                      ? " border-2 border-solid border-green-700"
                      : "")
                  }
                  src={image}
                  onClick={() => setselectedImagesIndex(index)}
                  alt="pics"
                />
              ))}
            </div>
            <Divider />
            <div>
              <h1 style={{ color: "#203A43", letterSpacing: "1px" }}>
                Added On
              </h1>
              <span>
                {moment(product.createdAt).format("MMM D, YYYY hh:mm A")}
              </span>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col gap-3">
            <div>
              <h1
                className="text-2xl font-semibold"
                style={{ color: "#203A43", letterSpacing: "1px" }}
              >
                {product.name}
              </h1>
              <span>{product.description}</span>
            </div>

            <Divider />
            <div className="flex flex-col">
              <h1
                className="text-2xl font-semibold"
                style={{ color: "#203A43", letterSpacing: "1px" }}
              >
                Product Details
              </h1>

              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span>${product.price}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span>{product.category}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Bill Available</span>
                <span>{product.billAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Warranty Available</span>
                <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Accessories Available</span>
                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Box Available</span>
                <span>{product.boxAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Product Damage</span>
                <span>{product.productdamage ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>First Owner</span>
                <span>{product.firstowner ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Scratches on product</span>
                <span>{product.scratches ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Product Age</span>
                <span>
                  {product.age} {product.monYears}
                </span>
              </div>

              {product.monYears === "Months" ? (
                <div className="flex justify-between mt-2">
                  <span>Purchased Month</span>
                  <span>
                    {moment().subtract(product.age, "months").format("MMM-YYYY")}
                  </span>
                </div>
              ) : (
                <div className="flex justify-between mt-2">
                  <span>Purchased Year</span>
                  <span>
                    {moment().subtract(product.age, "years").format("YYYY")}
                  </span>
                </div>
              )}
            </div>

            <Divider />
            <div className="flex flex-col">
              <h1
                className="text-2xl font-semibold"
                style={{ color: "#203A43", letterSpacing: "1px" }}
              >
                Seller Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Owner Name</span>
                <span>{product.seller.name}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span>{product.seller.email}</span>
              </div>
            </div>

            {/* Bids Section */}
            <Divider />
            <div className="flex flex-col">
              <div className="flex justify-between mb-5">
                <h1
                  className="text-2xl font-semibold"
                  style={{ color: "#203A43", letterSpacing: "1px" }}
                >
                  Bids
                </h1>
                <Button
                  onClick={() => setshowAddNewBid(!showAddNewBid)}
                  disabled={user._id === product.seller._id}
                >
                  New Bid
                </Button>
              </div>

              {product.showBidsProductPage &&
                product?.bids?.map((bid) => {
                  return (
                    <div className="border border-gray-300 border-solid p-2 rounded m-1">
                      <div className="flex justify-between text-gray-600">
                        <span>Name</span>
                        <span>{bid.buyer.name}</span>
                      </div>

                      <div className="flex justify-between text-gray-600">
                        <span>Bid Amount</span>
                        <span>${bid.bidAmount}</span>
                      </div>

                      <div className="flex justify-between text-gray-600">
                        <span>Bid Placed On</span>
                        <span>
                          {moment(bid.createdAt).format("MMM D, YYYY hh:mm A")}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {showAddNewBid && (
          <BidModel
            product={product}
            reloadData={getData}
            showBidModel={showAddNewBid}
            setshowBidModel={setshowAddNewBid}
          />
        )}
      </div>
    )
  );
};

export default SingleProduct;
