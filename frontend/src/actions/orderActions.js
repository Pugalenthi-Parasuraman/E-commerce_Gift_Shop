import {
  createOrderRequest,
  createOrderFail,
  createOrderSuccess,
  userOrdersRequest,
  userOrdersSuccess,
  userOrdersFail,
  orderDetailRequest,
  orderDetailSuccess,
  orderDetailFail,
  adminOrdersFail,
  adminOrdersRequest,
  adminOrdersSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  updateLiveLocation,
  clearLiveLocation,
} from "../Slices/orderSlice";
import axios from "axios";


// Function to track live location and dispatch to Redux
export const trackLiveLocation = () => async (dispatch) => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString(),
        };
        dispatch(updateLiveLocation(location)); // Dispatch to update live location in Redux store
      },
      (error) => {
        console.error("Error tracking location: ", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

// Clear live location when needed
export const clearLocation = () => async (dispatch) => {
  dispatch(clearLiveLocation()); // Dispatch action to clear live location
};

// Create order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const { data } = await axios.post(`/api/v1/order/new`, order);
    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response.data.message));
  }
};

// Get user orders
export const userOrders = () => async (dispatch) => {
  try {
    dispatch(userOrdersRequest());
    const { data } = await axios.get(`/api/v1/myorders`);
    dispatch(userOrdersSuccess(data));
  } catch (error) {
    dispatch(userOrdersFail(error.response.data.message));
  }
};

// Get order details
export const orderDetail = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailRequest());
    const { data } = await axios.get(`/api/v1/order/${id}`);
    dispatch(orderDetailSuccess(data));
  } catch (error) {
    dispatch(orderDetailFail(error.response.data.message));
  }
};

// Get admin orders
export const adminOrders = () => async (dispatch) => {
  try {
    dispatch(adminOrdersRequest());
    const { data } = await axios.get(`/api/v1/admin/orders`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    dispatch(adminOrdersSuccess(data));
  } catch (error) {
    dispatch(
      adminOrdersFail(error.response?.data?.message || "Failed to fetch orders")
    );
  }
};

// Delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    await axios.delete(`/api/v1/admin/order/${id}`);
    dispatch(deleteOrderSuccess());
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};

// Update order
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());
    const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData);
    dispatch(updateOrderSuccess(data));
  } catch (error) {
    dispatch(updateOrderFail(error.response.data.message));
  }
};