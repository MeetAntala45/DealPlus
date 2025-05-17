import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { SetLoader } from "../../redux/LoadersSlice";
import {GetProducts, updateProductStatus} from "../../Apicalls/products";
import moment  from "moment";


const ProductsInfo = () => {
  const [product, setproduct] = useState([])
  const disptach = useDispatch();

  const getData= async()=>{
      try {
        disptach(SetLoader(true));
        const response = await GetProducts(null);
        if(response.success){
           disptach(SetLoader(false));
           setproduct(response.data);
        }else{
          message.error(response.message)
        }
      } catch (error) {
        disptach(SetLoader(false))
        message.error(error.message)
      }
  }
  
const onStatusUpdate=async(id,status)=>{
  try {
    disptach(SetLoader(true));
    const response = await updateProductStatus(id,status)
    disptach(SetLoader(false));
    if(response.success){
      message.success(response.message);
      getData()
    }else{
      throw new Error(response.message);
    }
  } catch (error){
    disptach(SetLoader(false))
    message.error(error.message)
  }
}

useEffect(() => {
     getData()
}, [])
  
  const columns = [
    {
      title: "Product Image",
      dataIndex: "images",
      render:(text,record)=>{
        return (
          <img src={record?.images?.length > 0 ? record.images[0]:""} alt="productimg" className="h-20 w-20 object-cover rounded-md"/>
        )
      }
    },
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render:(text,record)=>(
          record?.seller?.name
      )
      },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "MonYears",
      dataIndex: "monYears",
    },
    {
      title: "Status",
      dataIndex: "status",
      render:(text,record)=>{
        return record.status.toUpperCase();
      },
    },
    {
      title: "Added on",
      dataIndex: "createdAt",
      render:(text,record)=> moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
    },
    {
      title:"Action",
      dataIndex: "action",
      render:(text,record)=>{
        const {status, _id} = record;
        return (
          <div className="flex gap-3 ">
              {status === "pending" &&( <span className=" cursor-pointer  text-green-400" onClick={()=>onStatusUpdate(_id,'approved')}>Approve</span>)}
              {status === "pending" &&( <span className=" cursor-pointer text-red-400" onClick={()=>onStatusUpdate(_id,'rejected')}>Reject</span>)}
              {status === "approved" &&( <span className="cursor-pointer text-red-400" onClick={()=>onStatusUpdate(_id,'blocked')}>Block</span>)}
              {status === "blocked" &&( <span className=" cursor-pointer text-green-400" onClick={()=>onStatusUpdate(_id,'approved')}>Unblock</span>)}
          </div>
        )
      }
    }
  ];

  return (
    <div>
       <Table columns={columns} dataSource={product}></Table>
    </div>
  );
};

export default ProductsInfo;
