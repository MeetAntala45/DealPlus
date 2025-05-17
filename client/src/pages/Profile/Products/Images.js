import { Button, Upload, message } from "antd";
import React, { useState } from "react";
import { SetLoader } from "../../../redux/LoadersSlice";
import { useDispatch } from "react-redux";
import { EditProduct, UploadProductImage } from "../../../Apicalls/products";
import { MdDeleteForever } from "react-icons/md";

const Images = ({ selectedProduct, getData, setshowProductForm }) => {
  const [showpreview, setshowpreview] = useState(true);
  const [images, setimages] = useState(selectedProduct.images);
  const [file, setfile] = useState(null);
  const dispatch = useDispatch();

  const upload = async () => {
    try {
      dispatch(SetLoader(true));
      // upload imagres to cloundnery and get url from backend
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        setimages([...images, response.data]);
        setshowpreview(false);
        setfile(null);
        getData();
        setshowProductForm(false);
      } else {
        dispatch(SetLoader(false));
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const handleDelete = async (image) => {
    try {
      const updatedImageArray = images.filter((img) => img !== image);
      const updatedProduct = { ...selectedProduct, images: updatedImageArray };
      const response = await EditProduct(selectedProduct._id, updatedProduct);
      if (response.success) {
        message.success("Image Deleted Successfully");
        setimages(updatedImageArray);
        setfile(null);
        getData();
      } else {
        throw new Error(message.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4 ">
        {images.map((image) => {
          return (
            <div className="flex gap-2 border border-solid border-gray-500 p-2 items-end group">
              <img
                className="h-20 w-20 object-cover"
                src={image}
                alt=""
                srcset=""
              />
              <MdDeleteForever
                className="cursor-pointer hidden group-hover:block"
                size={22}
                onClick={() => handleDelete(image)}
              />
            </div>
          );
        })}
      </div>

      <Upload
        listType="picture"
        beforeUpload={() => false}
        showUploadList={showpreview}
        onChange={(info) => {
          setfile(info.file);
          setshowpreview(true);
        }}
      >
        <Button type="default">Upload Image</Button>
      </Upload>

      <div className="flex justify-end gap-5 mt-5">
        <Button
          type="default"
          onClick={() => {
            setshowProductForm(false);
          }}
        >
          cancel
        </Button>
        <Button type="primary" onClick={upload} disabled={!file}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Images;
