import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import MetaData from "../Reausable/Topnavbar/MetaData";
import { toast } from "react-toastify";
import { clearAuthError, login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // dark/light toggle

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
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
  }, [isAuthenticated, error, dispatch, navigate, redirect]);

  return (
    <Fragment>
      <MetaData title={`Login`} />
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className="h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="relative max-w-[500px] px-8 py-6 rounded-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-200 shadow-lg w-full mx-4">
            {/* Left-to-Right Toggle Switch */}
            <div
              onClick={() => setDarkMode(!darkMode)}
              className={`absolute top-3 right-4 w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                darkMode ? "bg-gray-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-2xl transform transition-transform duration-300 ${
                  darkMode ? "translate-x-7" : "translate-x-0"
                }`}
              ></div>
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Login
            </h1>
            <p className="text-sm text-center text-gray-500 dark:text-gray-300 mt-1">
              👋 Welcome! Enter your details.
            </p>

            <form onSubmit={submitHandler} className="mt-6">
              <div className="flex flex-col mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-gray-100 rounded-md p-3 pr-10  text-gray-800 dark:text-white text-sm"
                  />
                  <BiUser className="absolute right-3 top-3 text-gray-500 dark:text-gray-300" />
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-gray-100 rounded-md p-3 pr-10 text-gray-800 dark:text-white text-sm"
                  />
                  {showPwd ? (
                    <AiOutlineEyeInvisible
                      className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-gray-300"
                      onClick={() => setShowPwd(false)}
                    />
                  ) : (
                    <AiOutlineEye
                      className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-gray-300"
                      onClick={() => setShowPwd(true)}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mb-5 text-sm">
                <label className="text-gray-700 dark:text-gray-300">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <Link
                  to="/password/forgot"
                  className="text-violet-500 hover:underline"
                >
                  Forgot?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-violet-500 hover:bg-violet-600 text-white font-semibold text-sm rounded-md transition duration-200"
              >
                Continue <FaArrowRightLong />
              </button>

              <div className="mt-5 text-center text-base text-gray-500 dark:text-gray-300">
                No account?
                <Link
                  to="/register"
                  className="ml-1 text-violet-500 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
