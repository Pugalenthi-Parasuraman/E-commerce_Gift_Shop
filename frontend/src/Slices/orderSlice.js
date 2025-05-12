import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetail: {},
    userOrders: [],
    adminOrders: [],
    orders: [],
    loading: false,
    isOrderDeleted: false,
    isOrderUpdated: false,
    error: null,
    currentLocation: null, 
  },
  reducers: {
 
    createOrderRequest(state) {
      state.loading = true;
    },
    createOrderSuccess(state, action) {
      state.loading = false;
      state.orderDetail = action.payload.order;
    },
    createOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    userOrdersRequest(state) {
      state.loading = true;
    },
    userOrdersSuccess(state, action) {
      state.loading = false;
      state.userOrders = action.payload.orders;
    },
    userOrdersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

  
    orderDetailRequest(state) {
      state.loading = true;
    },
    orderDetailSuccess(state, action) {
      state.loading = false;
      state.orderDetail = action.payload.order;
    },
    orderDetailFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    adminOrdersRequest(state) {
      state.loading = true;
    },
    adminOrdersSuccess(state, action) {
      state.loading = false;
      state.adminOrders = action.payload.orders;
    },
    adminOrdersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteOrderRequest(state) {
      state.loading = true;
    },
    deleteOrderSuccess(state) {
      state.loading = false;
      state.isOrderDeleted = true;
    },
    deleteOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

  
    updateOrderRequest(state) {
      state.loading = true;
    },
    updateOrderSuccess(state) {
      state.loading = false;
      state.isOrderUpdated = true;
    },
    updateOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

   
    updateLiveLocation(state, action) {
      state.currentLocation = action.payload;
    },

  
    clearLiveLocation(state) {
      state.currentLocation = null;
    },

    clearOrderDeleted(state) {
      state.isOrderDeleted = false;
    },

 
    clearOrderUpdated(state) {
      state.isOrderUpdated = false;
    },

   
    clearError(state) {
      state.error = null;
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  createOrderFail,
  createOrderSuccess,
  createOrderRequest,
  userOrdersFail,
  userOrdersSuccess,
  userOrdersRequest,
  orderDetailFail,
  orderDetailSuccess,
  orderDetailRequest,
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
  clearOrderDeleted,
  clearOrderUpdated,
  clearError,
} = actions;

export default reducer;
