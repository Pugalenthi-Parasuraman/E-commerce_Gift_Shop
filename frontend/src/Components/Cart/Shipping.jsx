import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../Slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutStep from "./CheckoutStep";
import { toast } from "react-toastify";

export const validateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.phoneNo ||
    !shippingInfo.postalCode
  ) {
    toast.error("Please fill the shipping information", {
      position: "bottom-center",
    });
    return false; // Don't navigate
  }
  return true;
};


function Shipping() {
  const { shippingInfo = {} } = useSelector((state) => state.cartState);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ address, city, phoneNo, postalCode, country, state })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <CheckoutStep shipping />
      <div className="text-black h-[100vh] flex justify-center items-center bg-cover ">
        <div className="bg-gray-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <h1 className="text-4xl text-black font-futura font-bold text-center mb-6">
            Shipping Info
          </h1>
          <div>
            <form className="font-semibold" onSubmit={submitHandler}>
              <div className="relative my-6 ">
                <input
                  type="text"
                  id="address_field"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-72 py-2.3 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-black focus:border-blur-600 peer"
                  required
                />
                <label
                  htmlFor="address_field"
                  className="absolute text-sm font-inter text-black duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:text-base peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  Address
                </label>
              </div>

              <div className="relative my-6">
                <input
                  type="text"
                  id="city_field"
                  className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-black focus:border-blur-600 peer"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <label
                  htmlFor="city_field "
                  className="absolute text-sm font-inter text-black duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:text-base peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  City
                </label>
              </div>

              <div className="relative my-6">
                <input
                  type="phone"
                  id="phone_field"
                  className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-black focus:border-blur-600 peer"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                />
                <label
                  htmlFor="phone_field"
                  className="absolute text-sm font-inter text-black duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:text-base peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  Phone No
                </label>
              </div>

              <div className="relative my-6">
                <input
                  type="number"
                  id="postal_code_field"
                  className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-black focus:border-blur-600 peer"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
                <label
                  htmlFor="postal_code_field"
                  className="absolute text-sm font-inter text-black duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:text-base peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  Postal Code
                </label>
              </div>

              <div className="relative my-6">
                <label
                  htmlFor="country_field"
                  className="absolute text-sm font-inter text-black duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:text-base peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  Country
                </label>
                <select
                  id="country_field"
                  className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-black focus:border-blur-600 peer"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  {countryList.map((country, i) => (
                    <option key={i} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative my-6">
                <input
                  type="text"
                  id="state_field"
                  className="block w-72 py-2.3 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-black focus:border-blur-600 peer"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
                <label
                  htmlFor="state_field"
                  className="absolute text-sm font-inter text-black duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:text-base peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  State
                </label>
              </div>

              <button
                id="shipping_btn"
                type="submit"
                className="w-full text-white flex items-center justify-between mb-4 text-[18px] text-start px-2 mt-6 border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus-text-black focus:border-blur-600 bg-blue-600 duration-300"
              >
                continue
                <FaArrowRightLong />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Shipping;
