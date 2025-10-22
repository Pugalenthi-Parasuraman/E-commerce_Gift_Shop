import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { MdDriveFolderUpload } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/userActions";

function ProfileUpdate() {
  const { error, user, isUpdated } = useSelector((state) => state.authState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png"
  );
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }

    if (isUpdated) {
      toast("Profile updated successfully", {
        type: "success",
        position: "bottom-center",
      });
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
  }, [user, isUpdated, error, dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative px-4">
      <form
        onSubmit={submitHandler}
        encType="multipart/form-data"
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-sm p-6 shadow-lg w-full max-w-md relative"
      >
        {/* Inner Box Dark/Light Toggle */}
        <div className="absolute top-6 right-6 shadow-inner">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-yellow-400 transition-colors duration-300"></div>
            <div className="absolute top-[4px] left-[4px] w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-7"></div>
          </label>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Update Profile
        </h1>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 pl-10 bg-transparent text-gray-900 dark:text-white text-sm"
              placeholder="Enter your name"
            />
            <BiUser className="absolute left-3 top-4 text-gray-500 dark:text-gray-300" />
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <div className="relative items-center justify-start">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 pl-10 bg-transparent text-gray-900 dark:text-white text-sm"
              placeholder="Enter your email"
            />
            <BiUser className="absolute left-3 top-4 text-gray-500 dark:text-gray-300" />
          </div>
        </div>

        {/* Avatar Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Avatar
          </label>
          <div className="flex items-center gap-4">
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="relative flex-1">
              <input
                type="file"
                onChange={onChangeAvatar}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-gray-900 dark:text-white bg-transparent text-sm"
              />
              <MdDriveFolderUpload className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 bg-violet-500 hover:bg-violet-600 text-white font-semibold text-sm rounded-lg transition duration-200"
        >
          Update <FaArrowRightLong />
        </button>
      </form>
    </div>
  );
}

export default ProfileUpdate;
