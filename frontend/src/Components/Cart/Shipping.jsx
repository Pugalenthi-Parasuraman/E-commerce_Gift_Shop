import React, { useEffect, useState, Fragment } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
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
  }, []);

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
        coordinates: {
          latitude,
          longitude,
        },
      })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <CheckoutStep shipping />
      <div className="text-black h-[100vh] flex justify-center items-center bg-cover">
        <div className="bg-gray-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <h1 className="text-4xl text-black font-futura font-bold text-center mb-6">
            Shipping Info
          </h1>
          <form className="font-semibold" onSubmit={submitHandler}>
            {[
              {
                label: "Address",
                value: address,
                setter: setAddress,
                type: "text",
                id: "address_field",
              },
              {
                label: "City",
                value: city,
                setter: setCity,
                type: "text",
                id: "city_field",
              },
              {
                label: "Phone No",
                value: phoneNo,
                setter: setPhoneNo,
                type: "tel",
                id: "phone_field",
              },
              {
                label: "Postal Code",
                value: postalCode,
                setter: setPostalCode,
                type: "number",
                id: "postal_code_field",
              },
              {
                label: "Latitude",
                value: latitude,
                setter: setLatitude,
                type: "number",
                id: "latitude_field",
              },
              {
                label: "Longitude",
                value: longitude,
                setter: setLongitude,
                type: "number",
                id: "longitude_field",
              },
              {
                label: "State",
                value: state,
                setter: setState,
                type: "text",
                id: "state_field",
              },
            ].map(({ label, value, setter, type, id }) => (
              <div className="relative my-6" key={id}>
                <input
                  type={type}
                  id={id}
                  step={type === "number" ? "any" : undefined}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  required
                  className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  htmlFor={id}
                  className="absolute text-sm font-inter text-black duration-300 transform -translate-y-6 scale-75 top-0 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  {label}
                </label>
              </div>
            ))}

            {/* Country Dropdown */}
            <div className="relative my-6">
              <select
                id="country_field"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="block w-72 py-2.3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option value="" disabled>
                  Select Country
                </option>
                {countryList.map((c, i) => (
                  <option key={i} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <label
                htmlFor="country_field"
                className="absolute text-sm font-inter text-black duration-300 transform -translate-y-6 scale-75 top-0 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Country
              </label>
            </div>

            {/* Use My Location Button */}
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
              className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Use My Current Location
            </button>

            <button
              id="shipping_btn"
              type="submit"
              className="w-full text-white flex items-center justify-between mb-4 text-[18px] text-start px-2 mt-6 bg-blue-600 hover:bg-blue-700 rounded"
            >
              continue
              <FaArrowRightLong />
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Shipping;
