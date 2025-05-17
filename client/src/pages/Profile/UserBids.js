import {Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { SetLoader } from "../../redux/LoadersSlice";
import { getAllBids } from "../../Apicalls/products";
import Error from "../../components/Error";

const UserBids = () => {
  const [bidsData, setbidsData] = useState([]);
  const {user} = useSelector((state)=>state.users)
  const dispatch = useDispatch();

  const getBidscall = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await getAllBids({
        buyer: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setbidsData(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
       title:"Product Name",
       dataIndex:"product",
       render:(text,record)=>{
        return record.product.name;
       },
    },
    {
      title: "Bids Placed On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm A");
      },
    },
    {
      title: "Seller Name",
      dataIndex: "seller",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
        title: "Offered Price",
        dataIndex: "productPrice",
        render: (text, record) =>{
            return record.product.price;
        }
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
    getBidscall();
  }, []);

 
  return (
    <div className="flex gap-3 flex-col h-screen">
       { bidsData.lebgth !==0 ? (<Table columns={columns} dataSource={bidsData} /> ) : (<Error value={"Bids"} opration={"Add a new Bids"}/>)}
    </div>
    
  );
};

export default UserBids;
