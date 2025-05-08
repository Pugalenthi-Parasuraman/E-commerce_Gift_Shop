import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

function HomeCard(props) {
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
    <div className="productCard text-center w-52 overflow-hidden max-h-96 p-2 bg-white shadow-gray-950 border border-orange-500">
      <img className="w-full h-52 object-cover " src={props.image} alt="" />
      <div className="discription mt-2">
        <p className="product_name font-futura text-gray-800 hover:text-orange-500">
          {props.name}
        </p>
        <div className="ratings mt-2 flex justify-center items-center gap-1">
          {getStars()}
          <span id="no_of_reviews" className="text-gray-700 text-sm ml-1">
            ({props.reviews} Reviews)
          </span>
        </div>
        <Link to={"/products"}>
          <button className="font-futura mt-2 border-gray-400 border py-2 px-14 bg-none cursor-pointer transition duration-300 ease-linear hover:border-black ">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomeCard