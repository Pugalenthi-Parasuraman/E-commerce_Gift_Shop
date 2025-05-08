import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import "../../Styles/Home.css";
import MetaData from "../Reausable/Topnavbar/MetaData";
import { toast } from "react-toastify";
import { clearAuthError, login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      return;
    }
  }, [isAuthenticated, error, dispatch, navigate, redirect]);

  return (
    <Fragment>
      <MetaData title={`Login`} />
      <div className="text-white h-[100vh] flex justify-center items-center bg-cover ">
        <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <h1 className="text-4xl text-white font-bold text-center mb-6">
            Login
          </h1>
          <h1 className="text-xl text-white font-semibold text-center mb-6">
            👋 Welcome back!
          </h1>
          <div>
            <form onSubmit={submitHandler}>
              <div className="relative my-6">
                <input
                  type="email"
                  id=""
                  name=""
                  className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blur-600 peer"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm font-inter text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:text-base peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  Email
                </label>
                <BiUser className="absolute top-0 right-4" />
              </div>

              <div className="relative my-6">
                <input
                  type="password"
                  id=""
                  name=""
                  className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blur-600 peer"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="pwd"
                  className="absolute text-sm font-inter text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:text-base peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
                <AiOutlineLock className="absolute top-0 right-4" />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <input type="checkbox" id="" name="" />
                  <label htmlFor="Remember Me">Remember Me</label>
                </div>
                <span className="text-blue-500">
                  <Link to="/password/forgot">Forgot Password</Link>
                </span>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-between mb-4 text-[18px] text-start px-2 mt-6 border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus-text-white focus:border-blur-600 bg-blue-600 duration-300"
                disabled={loading}
              >
                Continue
                <FaArrowRightLong />
              </button>
              <div className="text-center">
                <span className="m-4">
                  Don't have an account?
                  <Link to="/register" className="text-blue-500">
                    Click!
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
