var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    validate: {
      validator: function (value) {
        if (typeof this.duplicatePrice === "undefined") return true;
        return value <= this.duplicatePrice;
      },
      message: "display price cannot exceed the duplicate price",
    },
  },
  duplicatePrice: {
    type: Number,
  },

  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
    enum: {
      values: [
        "Personalized Gifts",
        "Birth days",
        "Anniversary",
        "Valentine's Day",
        "Christmas snow",
        "Gifts for Him",
        "Wedding Day",
        "Diwali Spark",
        "Gifts for Her",
        "Children Gifts",
        "Popular Products",
        "Latest First",
        "Price-Low to High",
        "Price-High to Low",
      ],
      message: "Please select correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxlength: [20, "Product stock cannot exceed 20"],
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          name: {
            type: String,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

productSchema.virtual("discount").get(function () {
  if (this.duplicatePrice && this.price) {
    return Math.round(
      ((this.duplicatePrice - this.price) / this.duplicatePrice) * 100
    );
  }
  return 0;
}); 

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);