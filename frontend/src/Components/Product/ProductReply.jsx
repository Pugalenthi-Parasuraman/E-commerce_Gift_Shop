import React, { useState } from "react";

export default function ProductReply({ reviews, onReplySubmit }) {
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReplySubmit(replyText);
      setReplyText(""); 
    }
  };

  return (
    <div className="reviews w-full mt-8">
      <h3 className="text-xl font-semibold">Other's Reply</h3>
      <hr />
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review._id}
            className="review-card my-3 border border-gray-200 rounded-lg p-4"
          >
            <p className="text-gray-800 font-semibold">by {review.user.name}</p>
            <p className="text-gray-600">{review.reply}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">
          No reply yet. Be the first to write one!
        </p>
      )}

      {/* Reply Input Field */}
      <div className="mt-4">
        <textarea
          className="w-full border rounded-lg p-2 text-gray-700"
          rows="3"
          placeholder="Write your reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleReplySubmit}
        >
          Submit Reply
        </button>
      </div>
    </div>
  );
}
