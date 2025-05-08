import { addCartItemRequest, addCartItemSuccess } from "../Slices/cartSlice";
import axios from "axios";

export const addCartItem = (id, quantity) => async (dispatch) => {
  try {
    dispatch(addCartItemRequest());
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch(
      addCartItemSuccess({
        products: data.products._id,
        name: data.products.name,
        price: data.products.price,
        image: data.products.images[0].image,
        stock: data.products.stock,
        quantity,
      })
    );
  } catch (error) {}
};
