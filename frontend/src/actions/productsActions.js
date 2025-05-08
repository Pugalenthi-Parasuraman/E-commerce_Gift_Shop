import axios from "axios";
import {
  productsFail,
  productsSuccess,
  productsRequest,
  adminProductsFail,
  adminProductsRequest,
  adminProductsSuccess
} from "../Slices/productsSlice";


export const getProducts =
  (keyword, category, currentPage, price) => async (dispatch) => {
    try {
      dispatch(productsRequest());
      let link = `/api/v1/products?page=${currentPage}`;
      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      if (category) {
        link += `&category=${category}`;
      }
      if (price) {
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
      const { data } = await axios.get(link);
      dispatch(productsSuccess(data));
    } catch (error) {
      dispatch(productsFail(error.response.data.message));
    }
  };

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch(adminProductsRequest());
    const { data } = await axios.get(`/api/v1/admin/products`);
    dispatch(adminProductsSuccess(data));
  } catch (error) {
    dispatch(
      adminProductsFail(error.response?.data?.message || "Something went wrong")
    );
  }
};

   