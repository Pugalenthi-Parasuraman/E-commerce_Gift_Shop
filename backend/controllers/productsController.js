const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsnycErrors");
const APIFeatures = require("../utils/apiFeatures");

// Create Product - /api/v1/products/addNew
const addNewProducts = catchAsyncError(async (req, res, next) => {
  let images = [];
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "development") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/products/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.images = images;
  req.body.user = req.user.id;

  var products = await Product.create(req.body);
  res.status(201).json({
    success: true,
    products,
  });
});

// Get Products - /api/v1/products
var getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 3;

  let buildQuery = () => {
    return new APIFeatures(Product.find().lean(), req.query).search().filter();
  };

  const filteredProductsCount = await buildQuery().query.countDocuments({});
  const totalProductsCount = await Product.countDocuments({});
  let productsCount = totalProductsCount;

  if (filteredProductsCount !== totalProductsCount) {
    productsCount = filteredProductsCount;
  }

  const products = await buildQuery().paginate(resPerPage).query;

  res.status(200).json({
    success: true,
    count: productsCount,
    resPerPage,
    products,
  });
});

// Get Single Product - /api/v1/products/:id
const getSingleProducts = catchAsyncError(async (req, res, next) => {
  var id = req.params.id;
  const products = await Product.findById(id).populate(
    "reviews.user",
    "name email"
  );
  await new Promise((resolve) => setTimeout(resolve, 3000));
  if (!products) {
    return next(new ErrorHandler("Product not found ", 400));
  }
  res.status(201).json({
    success: true,
    products,
  });
});

// Update Product - /api/v1/products/:id
const UpdateProducts = async (req, res, next) => {
  var id = req.params.id;
  let products = await Product.findById(id);

  let images = [];

  if (req.body.imagesCleared === "false") {
    images = products.images;
  }

  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "development") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/products/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.images = images;

  if (!products) {
    return res.status(404).json({
      success: false,
      message: "Products not found",
    });
  }
  products = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    success: true,
    products,
  });
};

// Delete Product - /api/v1/products/:id
const deleteProducts = async (req, res, next) => {
  var id = req.params.id;
  let products = await Product.findById(id);
  if (!products) {
    return res.status(404).json({
      success: false,
      message: "Products not found",
    });
  }
  products = await Product.findByIdAndDelete(id, req.body);

  res.status(200).json({
    success: true,
    message: "Products Deleted!",
    products,
  });
};

//Create Review - api/v1/review
var createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment, reply} = req.body;

  const review = {
    user: req.user.id,
    rating,
    comment,
    replies: reply
      ? [{ user: req.user.id, name: req.user.name, comment: reply }]
      : [],
  };

  const product = await Product.findById(productId);
  //finding user review exists
  const isReviewed = product.reviews.find((review) => {
    return;
    // review.user.toString() == req.user.id.toString();
  });

  if (isReviewed) {
    //updating the  review
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
                if (reply) {
                  review.replies.push({
                    user: req.user.id,
                    name: req.user.name,
                    comment: reply,
                  });
                }
      }
    });
  } else {
    //creating the review
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }
  //find the average of the product reviews
  product.rating =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  product.rating = isNaN(product.rating) ? 0 : product.rating;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get Reviews - api/v1/reviews?id={productId}
var getReviews = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;

  if (id) {
    const product = await Product.findById(id).populate("reviews.user", "name email");

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      reviews: product.reviews || [],
    });
  } else {
    // Fetch all reviews from all products
    const products = await Product.find().populate("reviews.user", "name email");

    const allReviews = products.flatMap((product) =>
      product.reviews.map((review) => ({
        ...review.toObject(),
        productId: product._id,
      }))
    );

    return res.status(200).json({
      success: true,
      reviews: allReviews,
    });
  }
});


//Delete Review - api/v1/review
var deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });

  const numOfReviews = reviews.length;

  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;
  ratings = isNaN(ratings) ? 0 : ratings;

  //save the product document
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });
  res.status(200).json({
    success: true,
  });
});

// get admin products  - api/v1/admin/products
var getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).send({
    success: true,
    products,
  });
});

module.exports = {
  getProducts,
  addNewProducts,
  getSingleProducts,
  UpdateProducts,
  deleteProducts,
  createReview,
  getReviews,
  deleteReview,
  getAdminProducts,
};
