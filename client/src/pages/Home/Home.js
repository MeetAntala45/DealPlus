import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { SetLoader } from "../../redux/LoadersSlice";
import { GetProducts } from "../../Apicalls/products";
import Divider from "../../components/Divider";
import { useNavigate } from 'react-router-dom';
import Filters from "./Filters";
import { IoFilterSharp } from 'react-icons/io5';
import Search from "./Search";
import ProductCard from "./ProductCard";
import Error from "../../components/Error";
import Pagination from "../../components/Pagination";

const Home = () => {
  const [showFilters, setshowFilters] = useState(true);
  const [error, setError] = useState(false);
  const [products, setproducts] = useState([]);
  const [filters, setfilters] = useState({
    status: "approved",
    category: [],
    age: [],
  });
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(8);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setproducts(response.data);
      } else {
        throw new Error("Product not found with these filters");
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="flex gap-3 p-5 bg-gray-50 min-h-screen">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setshowFilters={setshowFilters}
          filters={filters}
          setfilters={setfilters}
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center mb-4">
          {!showFilters && (
            <IoFilterSharp
              size={30}
              className="cursor-pointer text-[#203A43] hover:text-red-500 transition duration-200"
              onClick={() => setshowFilters(!showFilters)}
            />
          )}
          <Search setproducts={setproducts} reloadData={getData} setError={setError} />
        </div>

        <div className={`grid gap-4 ${showFilters ? "grid-cols-4" : "grid-cols-5"} tablet:grid-cols-4 mobile:grid-cols-1`}>
          <ProductCard products={currentPosts} />
        </div>
        
        
        <div className="flex items-center justify-center mt-5">
          <Pagination totalPosts={products.length} postsPerPage={postPerPage} setcurrentPage={setcurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default Home;
