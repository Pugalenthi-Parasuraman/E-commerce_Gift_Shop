import React, { useEffect, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearAuthError } from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    dispatch(resetPassword(formData, token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast("Password Reset Success!", {
        type: "success",
        position: "bottom-center",
      });
      navigate("/");
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
      return;
    }
  }, [isAuthenticated, error, dispatch, navigate]);

  return (
    <div
      className={`h-screen flex justify-center items-center transition-colors duration-500 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-sm shadow-lg border p-6 sm:p-8 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Dark/Light Toggle inside box */}
        <div className="flex justify-end mb-4">
          <div
            className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                darkMode ? "translate-x-7" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Reset Your Password
        </h1>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          {/* Password Field with Icon */}
          <div className="relative">
            <AiOutlineLock
              className={`absolute left-3 top-3 text-lg ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className={`pl-10 pr-3 py-2 rounded-md border w-full focus:outline-none focus:ring-2 text-sm ${
                darkMode
                  ? "bg-gray-700 border-gray-500 text-white focus:ring-white"
                  : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-gray-900"
              }`}
            />
          </div>

          {/* Confirm Password Field with Icon */}
          <div className="relative">
            <AiOutlineLock
              className={`absolute left-3 top-3 text-lg ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}
            />
            <input
              type="password"
              id="ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className={`pl-10 pr-3 py-2 rounded-md border w-full focus:outline-none focus:ring-2 text-sm ${
                darkMode
                  ? "bg-gray-700 border-gray-500 text-white focus:ring-white"
                  : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-gray-900"
              }`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-base font-medium bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors duration-300"
          >
            Update Password
            <FaArrowRightLong />
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordReset;
