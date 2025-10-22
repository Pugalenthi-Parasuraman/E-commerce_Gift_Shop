import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register, clearAuthError } from "../../actions/userActions";
import { BiUser } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdDriveFolderUpload } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import MetaData from "../Reausable/Topnavbar/MetaData";

function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (userData.password !== confirmPassword) {
      toast("Passwords do not match", {
        position: "bottom-center",
        type: "error",
      });
      return;
    }
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => dispatch(clearAuthError),
      });
    }
  }, [isAuthenticated, error, dispatch, navigate]);

  return (
    <Fragment>
      <MetaData title={`Register`} />
      <div className={`${isDark ? "dark" : ""}`}>
        <div className="h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <form
            onSubmit={submitHandler}
            encType="multipart/form-data"
            className="relative max-w-[500px] px-8 py-6 rounded-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-200 shadow-lg w-full"
          >
            {/* Violet Left-to-Right Toggle Switch */}
            <div
              onClick={() => setIsDark(!isDark)}
              className={`absolute top-4 right-4 w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                isDark ? "bg-gray-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  isDark ? "translate-x-7" : "translate-x-0"
                }`}
              ></div>
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Register
            </h1>
            <p className="text-sm text-center text-gray-500 dark:text-gray-300 mt-2 mb-4">
              🎉 Join us! Create your account.
            </p>

            {/* Name */}
            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={onChange}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-gray-100 rounded-md p-3 pr-10 text-gray-800 dark:text-white text-sm"
                />
                <BiUser className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={onChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-gray-100 rounded-md p-3 pr-10 text-gray-800 dark:text-white text-sm"
                />
                <BiUser className="absolute right-3 top-3 text-gray-400 dark:text-gray-300" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={onChange}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-gray-100 rounded-md p-3 pr-10 text-gray-800 dark:text-white text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 dark:text-gray-300"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmpwd"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-gray-100 rounded-md p-3 pr-10 text-gray-800 dark:text-white text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 dark:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>
            </div>

            {/* Avatar Upload */}
            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Avatar
              </label>
              <div className="flex items-center gap-4 mt-1">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={onChange}
                  className="text-sm text-gray-700 dark:text-gray-300"
                />
                <MdDriveFolderUpload className="text-xl text-gray-400 dark:text-gray-300" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-violet-500 hover:bg-violet-600 text-white font-semibold text-sm rounded-md transition duration-200"
            >
              Continue <FaArrowRightLong />
            </button>

            {/* Footer */}
            <div className="mt-4 text-center text-base text-gray-500 dark:text-gray-300">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 text-violet-500 hover:underline"
              >
                Click!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
