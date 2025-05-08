import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const getStars = () => {
    const stars = [];
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      if (i <= Math.floor(props.rating)) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === Math.ceil(props.rating)) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="productCard text-center w-60 overflow-hidden max-h-full p-2 bg-white shadow-gray-950 border border-orange-500">
      <img className="w-full h-52 object-cover" src={props.image} alt="" />
      <div className="product mt-2">
        <p className="product_price font-futura text-lg font-bold">
          ₹{props.disc_price}
          <span className="line-through text-gray-500 ml-2 font-medium text-base">
            ₹{props.price}
          </span>
        </p>
        <p className="product_name font-futura text-gray-800 hover:text-orange-500">
          {props.name}
        </p>
        <div className="ratings mt-2 flex justify-center items-center gap-1">
          {getStars()}
          <span id="no_of_reviews" className="text-gray-700 text-sm ml-1">
            ({props.reviews} Reviews)
          </span>
        </div>
        <div className="flex justify-center items-center ">
          <Link to={"/products"}>
            <button className="font-futura mt-2 border-gray-400 border py-2 px-16 text-black cursor-pointer transition duration-300 ease-linear hover:border-black">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
