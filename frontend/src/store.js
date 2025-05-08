import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; 
import productsReducer from "./Slices/productsSlice";
import productReducer from "./Slices/productSlice";
import authReducer from "./Slices/authSlice";
import cartReducer from "./Slices/cartSlice";
import orderReducer from "./Slices/orderSlice";
import userReducer from "./Slices/userSlice"



const reducer = combineReducers({
  productsState: productsReducer,
  productState: productReducer,
  authState: authReducer,
  cartState: cartReducer,
  orderState: orderReducer,
  userState: userReducer,
});


const store = configureStore({
  devTools: true,
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
