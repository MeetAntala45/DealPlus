import moment from "moment"; 
import { useNavigate } from "react-router-dom";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  
  return (
    <>
      {products.map((product) => (
        <div
          className="cursor-pointer border border-solid rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg duration-300"
          key={product._id}
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <div className="w-full rounded-lg shadow-lg bg-white">
            
            {/* Image Container */}
            <div className="h-64 overflow-hidden flex justify-center items-center"> 
              <img
                className="h-full w-auto object-contain" // Ensure the image retains its aspect ratio and fits within the height
                src={product.images[0]}
                alt="productimg"
              />
            </div>

            {/* Product Details */}
            <div className="p-5 bg-gray-100">
              <div className="mb-2 h-6 overflow-hidden">
                <h5 className="text-xl font-bold tracking-tight text-gray-800">
                  {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                </h5>
              </div>
              <div className="h-16 overflow-hidden">
                <p className="text-gray-600">
                  {product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="font-semibold text-green-500">
                  &#8377; {product.price}
                </p>
                <p className="text-gray-600">
                  <span className="text-gray-500">Year: </span>
                  {moment().subtract(product.age, "years").format("YYYY")}
                </p>
              </div>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="mt-4 w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors duration-300"
              >
                Read more
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
