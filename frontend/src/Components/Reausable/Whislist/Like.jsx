import React from "react";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Like = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div
      className=" top-2 right-2 cursor-pointer text-2xl"
      onClick={toggleLike}
    >
      {liked ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart className="text-gray-400" />
      )}
    </div>
  );
};

export default Like;
