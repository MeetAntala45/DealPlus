import { Divider, Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/LoadersSlice";
import { getAllBids } from "../../../Apicalls/products";
import moment from "moment";

const Bids = ({ showBidsModel, setshowBidsModel, selectedProduct }) => {
  const [bidsData, setbidsData] = useState([]);

  const dispatch = useDispatch();

  const getBidscall = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await getAllBids({
        product: selectedProduct._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        message.success("Fetching Bids");
        setbidsData(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Bids Placed On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm A");
      },
    },
    {
      title: "Name",
      dataIndex:"name",
      render: (text, record) => {
        return record.buyer.name;
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Contact Deatils",
      dataIndex: "conatctDetails",
      render: (text, record) => {
        return (
          <div>
            <p>Phone: {record.mobile}</p>
            <p>Email: {record.buyer.email}</p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (selectedProduct) {
      getBidscall();
    }
  }, [selectedProduct]);

  return (
    <Modal
      title=""
      open={showBidsModel}
      onCancel={() => setshowBidsModel(false)}
      centered
      width={1200}
      footer={null}
    >
      <h1 className="text-xl text-primary">Bids</h1>
      <Divider />
      <h1 className="text-xl">Product Name : {selectedProduct.name}</h1>
      
      <Table columns={columns} dataSource={bidsData}/>
    </Modal>
  );
};

export default Bids;
