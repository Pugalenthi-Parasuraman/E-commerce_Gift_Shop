import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, clearAuthError } from "../../actions/userActions";

function PasswordForgot() {
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (message) {
      toast(message, {
        type: "success",
        position: "bottom-center",
      });
      setEmail("");
      return;
    }

    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
    }
  }, [message, error, dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative">
      <div className="relative max-w-[500px] w-full px-8 py-8 rounded-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md">
        {/* Mobile-friendly Toggle Switch */}
        <div className="absolute top-5 right-5">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-gray-600 transition-colors duration-300"></div>
            <div className="absolute top-[4px] left-[4px] w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-6"></div>
          </label>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Forgot Password
        </h1>
        <p className="text-sm text-center text-gray-500 dark:text-gray-300 mb-6">
          Enter your email and we’ll send you a reset link.
        </p>

        <form onSubmit={submitHandler}>
          <div className="flex flex-col mb-6">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-gray-100 rounded-md p-3 pr-10 text-gray-800 dark:text-white text-sm"
              />
              <BiUser className="absolute right-3 top-3 text-gray-500 dark:text-gray-300" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-violet-500 hover:bg-violet-600 text-white font-semibold text-sm rounded-xl transition duration-200"
          >
            Send Email <FaArrowRightLong />
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordForgot;
