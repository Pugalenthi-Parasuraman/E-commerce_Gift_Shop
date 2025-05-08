import axios from "axios";
import {
  productFail,
  productSuccess,
  productRequest,
  createReviewFail,
  createReviewRequest,
  createReviewSuccess,
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  newProductFail,
  newProductRequest,
  newProductSuccess,
  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
  reviewsRequest,
  reviewsSuccess,
  reviewsFail,
  deleteReviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  addReplyFail,
  addReplyRequest,
  addReplySuccess,
} from "../Slices/productSlice";

 export const getProduct = (id) => async (dispatch) => {
   try {
     dispatch(productRequest());
     const { data } = await axios.get(`/api/v1/products/${id}`);
     dispatch(productSuccess(data));
   } catch (error) {
     dispatch(productFail(error.response.data.message));
   }
 };

export const createReview = (reviewData) => async (dispatch) => {
  try {
    const { isReply } = reviewData;

    // Dispatch the appropriate request action
    if (isReply) {
      dispatch(addReplyRequest());
    } else {
      dispatch(createReviewRequest());
    }

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Make the API call
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    // Dispatch the appropriate success action
    if (isReply) {
      dispatch(addReplySuccess(data));
    } else {
      dispatch(createReviewSuccess(data));
    }
  } catch (error) {
    // Dispatch the appropriate fail action
    if (reviewData.isReply) {
      dispatch(addReplyFail(error.response.data.message));
    } else {
      dispatch(createReviewFail(error.response.data.message));
    }
  }
};

export const createNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch(newProductRequest());
    const { data } = await axios.post(`/api/v1/admin/products/addNew`, productData);
    dispatch(newProductSuccess(data));
  } catch (error) {
    dispatch(newProductFail(error.response.data.message));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    await axios.delete(`/api/v1/admin/products/${id}`);
    dispatch(deleteProductSuccess());
  } catch (error) {
    dispatch(deleteProductFail(error.response.data.message));
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());
    const { data } = await axios.put(
      `/api/v1/admin/products/${id}`,
      productData
    );
    dispatch(updateProductSuccess(data));
  } catch (error) {
    dispatch(updateProductFail(error.response.data.message));
  }
};

export const getReviews = (id) => async (dispatch) => {
  try {
    dispatch(reviewsRequest());

    const { data } = await axios.get(`/api/v1/admin/reviews`, {
      params: { id },
    });

    console.log("API Response:", data); 

    if (!data || !data.reviews) {
      throw new Error("Invalid response: Data or reviews is missing");
    }

    dispatch(reviewsSuccess(data));
  } catch (error) {
    console.error("Fetch Reviews Error:", error);
    dispatch(
      reviewsFail(error.response?.data?.message || "Failed to fetch reviews")
    );
  }
};


export const deleteReview = (productId, id) => async (dispatch) => {
  try {
    dispatch(deleteReviewRequest());
    await axios.delete(`/api/v1/admin/reviews`, { params: { productId, id } });
    dispatch(deleteReviewSuccess());
  } catch (error) {
    dispatch(deleteReviewFail(error.response.data.message));
  }
};