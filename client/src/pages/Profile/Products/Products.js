import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/LoadersSlice";
import { DeleteProduct, GetProducts } from "../../../Apicalls/products";
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import moment  from "moment";
import Bids from "./Bids";
import Error from "../../../components/Error";



// dataIndex must match with aproprite mongoDb proprty

const Products = () => {

  const [showBids, setshowBids]=useState(false);
  const [selectedProduct, setselectedProduct]=useState(null)
  const [product, setproduct] = useState([])
  const [showProductForm, setshowProductForm]=useState(false);
  const {user} = useSelector(state => state.users);
  const disptach = useDispatch();

  const getData= async()=>{
      try {
        disptach(SetLoader(true));
        const response = await GetProducts({
          seller:user._id,
        });
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

  const deleteProduct = async(id)=>{
    try {
        disptach(SetLoader(true));
        const response = await DeleteProduct(id);
        if(response.success){
          disptach(SetLoader(false));
          message.success(response.message);
          getData();
        }else{
          disptach(SetLoader(false));
          message.error(response.message);
        }
    } catch (error) {
      disptach(SetLoader(false))
      message.error(error.message);
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
      title: "Name",
      dataIndex: "name",
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
    },
    {
      title: "Added on",
      dataIndex: "createdAt",
      render:(text,record)=> moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
    },
    {
      title: "Action",
      dataIndex: "action",
      render:(text,record)=>{
        return (
          <div className="flex gap-5 items-center">
             <MdDeleteForever className="cursor-pointer" size={22} 
             onClick={()=>{
              deleteProduct(record._id)
             }}
             />
             <AiOutlineEdit className="cursor-pointer" size={22} onClick={()=>{
              setselectedProduct(record);
              setshowProductForm(true);
             }}/>

             <span className="underline cursor-pointer"
             onClick={()=>{
               setselectedProduct(record);
               setshowBids(true);
             }}
             >
              show Bids
             </span>
          </div>
        )
      }
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-3">
        <Button type="default" onClick={() => {
          setselectedProduct(null);
          setshowProductForm(true);
        }}>
          Add product
        </Button>
      </div>
      <Table columns={columns} dataSource={product}></Table> 
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setshowProductForm={setshowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}

      {showBids && (
        <Bids 
        showBidsModel={showBids}
        setshowBidsModel={setshowBids}
        selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
