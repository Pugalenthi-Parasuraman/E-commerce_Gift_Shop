import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../actions/productAction";

const getStars = (rating) => {
  const stars = [];
  const maxStars = 5;
  for (let i = 1; i <= maxStars; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }
  return stars;
};

export default function ProductReview({ reviews, productId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authState);
  const [replyText, setReplyText] = useState("");
  const [activeReplyForm, setActiveReplyForm] = useState(null); // Track which review's reply form is active

  const handleReplySubmit = (reviewId) => {
    if (!replyText.trim()) return;

    const replyData = {
      productId,
      reviewId,
      comment: replyText,
      isReply: true,
    };

    dispatch(createReview(replyData));
    setReplyText("");
    setActiveReplyForm(null); 
  };

  return (
    <div className="reviews w-full mt-8">
      <h3 className="text-xl font-semibold">Other's Reviews:</h3>
      <hr />
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review._id}
            className="review-card my-3 border border-gray-200 rounded-lg p-4"
          >
            <div className="rating-outer mb-2">
              <div className="flex items-center gap-1">
                {getStars(review.rating)}
              </div>
            </div>
            <p className="text-gray-800 font-semibold">by {review.user.name}</p>
            <p className="text-gray-600">{review.comment}</p>

            {/* Display Replies */}
            {review.replies && review.replies.length > 0 && (
              <div className="replies ml-6 mt-4 ">
                <h4 className="text-lg font-semibold">Replies:</h4>
                {review.replies.map((reply) => (
                  <div
                    key={reply._id}
                    className="reply-card my-2 p-2 rounded-lg"
                  >
                    <p className="text-gray-800 font-semibold">
                      by {reply.name}
                    </p>
                    <p className="text-gray-600">{reply.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Form */}
            {user && (
              <div className="mt-4">
                {activeReplyForm === review._id ? (
                  <div className="reply-form">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      rows="3"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleReplySubmit(review._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Submit Reply
                      </button>
                      <button
                        onClick={() => setActiveReplyForm(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveReplyForm(review._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Reply
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">
          No reviews yet. Be the first to write one!
        </p>
      )}
    </div>
  );
}
