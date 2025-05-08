import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Product({ product }) {
    const getStars = () => {
      const stars = [];
      const maxStars = 5;
      for (let i = 1; i <= maxStars; i++) {
        if (i <= Math.floor(product.rating)) {
          stars.push(<FaStar key={i} className="text-yellow-400" />);
        } else if (i === Math.ceil(product.rating)) {
          stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
        } else {
          stars.push(<FaRegStar key={i} className="text-yellow-400" />);
        }
      }
      return stars;
    };
const discountPercent =
  product.duplicatePrice > product.price
    ? Math.round(
        ((product.duplicatePrice - product.price) / product.duplicatePrice) *
          100
      )
    : 0;

const discountColor =
  discountPercent >= 50
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-600";

  return (
    <div className="productCard text-center w-60 overflow-hidden max-h-full p-2 bg-white shadow-gray-950 border border-orange-500">
      <div className="">
        {product.images.length > 0 && (
          <img
            className="w-full h-52 object-cover"
            src={product.images[0].image}
            alt={product.name}
          />
        )}
        <div className="flex flex-col">
          <p className="product_price font-futura text-lg font-bold">
            ₹{product.price}
            <span className="line-through text-gray-500 ml-2 font-medium text-base">
              ₹{product.duplicatePrice}
            </span>
            {discountPercent > 0 && (
              <span
                className={`ml-2 font-semibold text-sm px-2 py-0.5 rounded ${discountColor}`}
              >
                {discountPercent}% OFF
              </span>
            )}
          </p>
          <h5 className="font-futura text-gray-800 hover:text-orange-500 truncate">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-2 flex justify-center items-center gap-1">
            {getStars()}
            <span id="no_of_reviews" className="text-gray-700 text-sm ml-1">
              ({product.numberOfReviews} Reviews)
            </span>
          </div>
          <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="font-futura mt-2 border-opacity-50 border py-2 px-16 bg-orange-500 text-white cursor-pointer transition duration-300 ease-linear hover:border-black hover:bg-orange-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
