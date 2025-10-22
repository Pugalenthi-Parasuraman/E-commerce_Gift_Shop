import React, { useEffect, useState, Fragment } from "react";
import {
  FaArrowRight,
  FaMapMarkedAlt,
  FaCity,
  FaPhone,
  FaMapPin,
  FaGlobeAsia,
  FaHome,
  FaGlobe,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../Slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutStep from "./CheckoutStep";
import { toast } from "react-toastify";

export const validateShipping = (shippingInfo) => {
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
    return false;
  }
  return true;
};

function Shipping() {
  const { shippingInfo = {} } = useSelector((state) => state.cartState);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [latitude, setLatitude] = useState(
    shippingInfo.coordinates?.latitude || ""
  );
  const [longitude, setLongitude] = useState(
    shippingInfo.coordinates?.longitude || ""
  );

  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!latitude || !longitude) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLatitude(lat);
            setLongitude(lon);
            fetchLocationDetails(lat, lon);
            toast.success("Location auto-filled", {
              position: "bottom-center",
            });
          },
          () => {
            toast.warn("Unable to access location", {
              position: "bottom-center",
            });
          }
        );
      }
    }
  }, [latitude, longitude]);

  const fetchLocationDetails = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      if (data && data.address) {
        const addr = data.address;
        setAddress(
          addr.road
            ? `${addr.house_number || ""} ${addr.road}`.trim()
            : addr.neighbourhood || ""
        );
        setCity(addr.city || addr.town || addr.village || "");
        setState(addr.state || "");
        setCountry(addr.country || "");
        setPostalCode(addr.postcode || "");
      }
    } catch (error) {
      console.error("Error fetching location info:", error);
      toast.error("Failed to fetch address from coordinates");
    }
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 10);
    return numbers.length > 5
      ? `${numbers.slice(0, 5)} ${numbers.slice(5)}`
      : numbers;
  };

  const formatPostal = (value) => value.replace(/\D/g, "").slice(0, 6);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({
        address,
        city,
        phoneNo,
        postalCode,
        country,
        state,
        coordinates: { latitude, longitude },
      })
    );
    navigate("/order/confirm");
  };

  const inputWrapper =
    "flex items-center border border-gray-300 rounded-[5px] px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-500";

  return (
    <Fragment>
      <CheckoutStep shipping />
      <div className="flex justify-center items-start py-2 px-4">
        <div className="bg-white border border-gray-300 rounded-[2px] py-3 px-8 shadow-xl w-full max-w-md">
          <h1 className="text-2xl text-orange-400 dark:text-black font-bold text-center mb-5 font-sans">
            Shipping Info
          </h1>

          <form className="font-medium" onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                htmlFor="address_field"
                className="block text-sm text-gray-700 mb-1"
              >
                Address
              </label>
              <div className={inputWrapper}>
                <FaHome className="text-gray-500 mr-2" />
                <input
                  type="text"
                  id="address_field"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full bg-transparent outline-none dark:text-black"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="city_field"
                className="block text-sm text-gray-700 mb-1"
              >
                City
              </label>
              <div className={inputWrapper}>
                <FaCity className="text-gray-500 mr-2" />
                <input
                  type="text"
                  id="city_field"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full dark:text-black bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="phone_field"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Phone No
                </label>
                <div className={inputWrapper}>
                  <FaPhone className="text-gray-500 mr-2" />
                  <input
                    type="tel"
                    id="phone_field"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(formatPhone(e.target.value))}
                    required
                    className="w-full dark:text-black bg-transparent outline-none"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="postal_code_field"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Postal Code
                </label>
                <div className={inputWrapper}>
                  <FaMapPin className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    id="postal_code_field"
                    value={postalCode}
                    onChange={(e) =>
                      setPostalCode(formatPostal(e.target.value))
                    }
                    required
                    className="w-full dark:text-black bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="state_field"
                className="block text-sm text-gray-700 mb-1"
              >
                State
              </label>
              <div className={inputWrapper}>
                <FaMapMarkedAlt className="text-gray-500 mr-2" />
                <input
                  type="text"
                  id="state_field"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className="w-full dark:text-black bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="latitude_field"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Latitude
                </label>
                <div className={inputWrapper}>
                  <FaGlobeAsia className="text-gray-500 mr-2" />
                  <input
                    type="number"
                    id="latitude_field"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    required
                    className="w-full dark:text-black bg-transparent outline-none"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="longitude_field"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Longitude
                </label>
                <div className={inputWrapper}>
                  <FaGlobe className="text-gray-500 mr-2" />
                  <input
                    type="number"
                    id="longitude_field"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    required
                    className="w-full dark:text-black bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="country_field"
                className="block text-sm text-gray-700 mb-1"
              >
                Country
              </label>
              <select
                id="country_field"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full dark:text-black px-4 py-2 border border-gray-300 rounded-[5px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select Country
                </option>
                {countryList.map((c, i) => (
                  <option key={i} value={c.name} className="dark:text-black">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 mt-4 mb-2">
              <button
                type="button"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (pos) => {
                        const lat = pos.coords.latitude;
                        const lon = pos.coords.longitude;
                        setLatitude(lat);
                        setLongitude(lon);
                        fetchLocationDetails(lat, lon);
                        toast.success("Current location updated", {
                          position: "bottom-center",
                        });
                      },
                      () => {
                        toast.error("Location permission denied", {
                          position: "bottom-center",
                        });
                      }
                    );
                  } else {
                    toast.error("Geolocation not supported");
                  }
                }}
                className="w-1/2 px-4 py-2 bg-green-600 text-white rounded-[5px] hover:bg-green-700 transition"
              >
                Use Location
              </button>
              <button
                id="shipping_btn"
                type="submit"
                className="w-1/2 flex items-center justify-center gap-2 text-white text-[16px] px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-[5px] transition"
              >
                Continue <FaArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Shipping;
