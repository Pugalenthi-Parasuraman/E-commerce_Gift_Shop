import React, { Fragment } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { FaSquareMinus } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  decreaseCartItemQty,
  increaseCartItemQty,
  removeItemFromCart,
} from "../../Slices/cartSlice";

function Cart() {
  const { items } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    const count = item.quantity;
    if (item.stock === 0 || count >= item.stock) return;
    dispatch(increaseCartItemQty(item.product));
  };
  const decreaseQty = (item) => {
    const count = item.quantity;
    if (count === 1) return;
    dispatch(decreaseCartItemQty(item.product));
  };


  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <Fragment>
      <div className="flex flex-col mx-auto items-center ">
        {items.length === 0 ? (
          <h2 className="mt-5 text-2xl font-semibold">Your Cart is Empth</h2>
        ) : (
          <Fragment>
            <h2 className="mt-5 text-2xl font-semibold">
              Your Cart: <b className="font-futura">{items.length} items</b>
            </h2>

            <div className="flex flex-wrap flex-col container items-center justify-center mt-6 ">
              {items.map((item) => (
                <Fragment>
                  <div className="flex p-3 flex-col w-full lg:w-1/3 bg-white shadow-md rounded-lg">
                    <div className="flex  items-center justify-between  mt-2 ">
                      <div className="w-52 ">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-40 object-cover rounded-md"
                        />
                      </div>

                      <div className="flex items-center p-3">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-sm font-semibold font-poppins hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div className="font-semibold font-rubik ">
                        <p id="card_item_price" className="text-sm font-medium">
                          ₹{item.price}
                        </p>
                      </div>

                      <div className="flex items-center ">
                        <button className="">
                          <FaSquareMinus
                            onClick={() => decreaseQty(item)}
                            className=" text-red-500 mx-2 text-2xl hover:text-red-600"
                          />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="w-10 mx-3 inline text-center  "
                        />
                        <button className="">
                          <FaSquarePlus
                            onClick={() => increaseQty(item)}
                            className=" text-blue-500 mx-2 text-2xl hover:text-blue-600"
                          />
                        </button>
                      </div>

                      <div className="w-1/12  ">
                        <RiDeleteBin6Fill
                          onClick={() =>
                            dispatch(removeItemFromCart(item.product))
                          }
                          id="delete_cart_item"
                          className=" text-red-600 hover:text-red-800 text-2xl cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}

              <div className=" my-4 font-poppins mx-5 flex flex-col items-center gap-1 w-1/2 lg:w-1/3 bg-white shadow-md p-6 rounded-lg">
                <h4 className="text-lg font-semibold ">Order Summary</h4>

                <div className="flex flex-col gap-2 w-full">
                  <p className="flex justify-between">
                    Subtotal:{" "}
                    <span className="order-summary-values">
                      {items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                      (Units)
                    </span>
                  </p>
                  <p className="flex justify-between">
                    Est. total:{" "}
                    <span className="order-summary-values">
                      ₹
                      {items.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}
                    </span>
                  </p>
                </div>

                <button
                  id="checkout_btn"
                  onClick={checkoutHandler}
                  className="w-full bg-orange-500 text-white font-semibold py-2 rounded-sm hover:bg-orange-600"
                >
                  Check out
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default Cart;
