import React, { useEffect, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import {
  updatePassword as updatePasswordAction,
  clearAuthError,
} from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaArrowRightLong } from "react-icons/fa6";

function PasswordUpdate() {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const { isUpdated, error } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("password", password);
    dispatch(updatePasswordAction(formData));
  };

  useEffect(() => {
    if (isUpdated) {
      toast("Password updated successfully", {
        type: "success",
        position: "bottom-center",
      });
      setOldPassword("");
      setPassword("");
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
  }, [isUpdated, error, dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-sm shadow-md p-8 w-96 relative">
        {/* Toggle Switch same as Login Page */}
        <div className="absolute top-6 right-6">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-gray-600 transition-colors duration-300"></div>
            <div className="absolute top-[4px] left-[4px] w-3 h-3 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5"></div>
          </label>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Update Password
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Old Password */}
          <div className="relative">
            <input
              type="password"
              id="old_password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-gray-100 rounded-md p-3 pr-10 text-gray-800 dark:text-white text-sm"
            />
            <AiOutlineLock className="absolute right-4 top-3 text-gray-500 dark:text-gray-300" />
          </div>

          {/* New Password */}
          <div className="relative">
            <input
              type="password"
              id="NewPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-gray-100 rounded-md p-3 pr-10 text-gray-800 dark:text-white text-sm"
            />
            <AiOutlineLock className="absolute right-4 top-3 text-gray-500 dark:text-gray-300" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-between py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm rounded-lg transition duration-200"
          >
            Update Password
            <FaArrowRightLong />
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordUpdate;
