import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, createReview } from "../../actions/productAction";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Loader from "../Reausable/Topnavbar/Loader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BsCart3 } from "react-icons/bs";
import MetaData from "../../Components/Reausable/Topnavbar/MetaData";
import { useState } from "react";
import { addCartItem } from "../../actions/cartAction";
import ProductReview from "./ProductReview";
import { toast } from "react-toastify";

function ProductDetails() {
  const { product, loading, error, isReviewSubmitted } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

const discountColorText =
  product.discount >= 50 ? "text-green-600" : "text-red-600";

  const increaseQty = () => {
    if (product.stock === 0 || quantity >= product.stock) return;
    setQuantity((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    if (quantity === 1) return;
    setQuantity((prevQty) => prevQty - 1);
  };

  useEffect(() => {
    if (isReviewSubmitted) {
      toast.success("Review Submitted Successfully");
      setShowReviewModal(false);
      setRating(1);
      setComment("");
    }
    if (error) {
      toast.error(error);
    }
    dispatch(getProduct(id));
  }, [isReviewSubmitted, error, dispatch, id]);

  if (!product) {
    return (
      <div className="text-center py-10">
        <p>Product not found. Please try again later.</p>
      </div>
    );
  }

  const submitReviewHandler = () => {
    if (!rating || !comment ) {
      toast.error("Please fill in all fields");
      return;
    }

    const reviewData = { rating, comment, productId: id};
    dispatch(createReview(reviewData));
  };

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
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="mx-auto py-10 px-5 max-w-md xl:max-w-6xl flex items-center">
            <div className="flex flex-wrap xl:flex-nowrap  ">
              <div className="w-full max-w-lg mx-auto ">
                <Carousel className="max-w-md border-2 ">
                  {product.images &&
                    product.images.length > 0 &&
                    product.images.map((image) => (
                      <img
                        className="mx-auto "
                        key={image._id}
                        src={image.image}
                        alt={product.name}
                      />
                    ))}
                </Carousel>
              </div>

              <div className="w-full font-rubik flex flex-wrap flex-col items-start ">
                <h3 className="text-2xl font-poppins font-semibold uppercase">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-2  text-sm">
                  Product # {product._id}
                </p>

                <div className="ratings my-2 flex justify-center items-center gap-1">
                  {getStars()}
                  <span
                    id="no_of_reviews"
                    className="text-gray-700 text-sm ml-1"
                  >
                    ({product.numberOfReviews} Reviews)
                  </span>
                </div>

                <p className="product_price font-futura text-lg font-bold text-orange-500">
                  ₹{product.price}
                  <span className="line-through text-gray-500 ml-2 font-medium text-base">
                    ₹{product.duplicatePrice}
                  </span>
                  <span
                    className={`ml-2 font-bold text-xl ${discountColorText}`}
                  >
                    {product.discount}%
                  </span>
                </p>
                <div className="flex items-center mt-3  bg-white rounded">
                  <button className="">
                    <FaMinus
                      className=" text-orange-500 mx-2"
                      onClick={decreaseQty}
                    />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-7 mx-2 inline  text-center "
                  />
                  <button className="">
                    <FaPlus
                      className=" text-orange-500 mx-2"
                      onClick={increaseQty}
                    />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(addCartItem(product._id, quantity));
                    toast("Cart Item Added!", {
                      type: "success",
                      position: "bottom-center",
                    });
                  }}
                  disabled={product.stock === 0 ? true : false}
                  className="px-7 flex items-center gap-2 shadow-xl cursor-pointer hover:bg-orange-500/70 py-2 font-semibold text-sm font-futura bg-orange-500 text-white rounded mt-3"
                >
                  <BsCart3 size={22} className="" />
                  Add to Cart
                </button>
                <hr className="my-2" />

                <p>
                  Status:
                  <span
                    className={`px-1 font-semibold ${
                      product.stock > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>

                <h4 className="text-lg font-semibold mt-2">Description:</h4>
                <p className="text-gray-600 ">{product.description}</p>
                <hr className="my-2" />
                <p>
                  Sold by: <strong>{product.seller}</strong>
                </p>

                <button
                  onClick={() => setShowReviewModal(true)}
                  className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
                >
                  Submit Your Review
                </button>

                <ProductReview reviews={product.reviews} />

                {showReviewModal && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg w-96">
                      <h3 className="text-xl font-semibold mb-4">
                        Submit Your Review
                      </h3>

                      <div className="flex mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`cursor-pointer text-${
                              star <= rating ? "yellow-400" : "gray-300"
                            }`}
                            onClick={() => setRating(star)}
                          />
                        ))}
                      </div>

                      <textarea
                        rows="4"
                        placeholder="Write your review here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      ></textarea>

                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => setShowReviewModal(false)}
                          className="px-4 py-2 bg-gray-300 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={submitReviewHandler}
                          className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetails;
