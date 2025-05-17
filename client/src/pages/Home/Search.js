import { useCallback, useRef } from "react";
import { GetProductsBysearch } from "../../Apicalls/products";
import { message } from "antd";
import Error from "../../components/Error";

const Search = ({ setproducts, reloadData }) => {
  const inputElem = useRef(null);
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const getSearchData = async (value) => {
    try {
      if (value !== "") {
        const response = await GetProductsBysearch(value);
        if (response.success) {
          setproducts(response.data);
        } else {
          throw new Error("Product not fiilters");
        }
      } else {
        reloadData();
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleSearch = useCallback(
    debounce((inputVal) => getSearchData(inputVal), 500),
    []
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Products here..."
        className="border border-gray-500 rounded-full border-solid w-72 p-2 h-14"
        ref={inputElem}
        onChange={() => handleSearch(inputElem.current?.value)}
      />
    </div>
  );
};

export default Search;
