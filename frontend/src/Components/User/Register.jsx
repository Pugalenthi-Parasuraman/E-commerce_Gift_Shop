import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, clearAuthError } from "../../actions/userActions";
import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { MdDriveFolderUpload } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png"
  );
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
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    dispatch(register(formData))
      .then(() => console.log("API Call Successful"))
      .catch((err) => console.error("API Error:", err));
  };

  useEffect(() => {
    if (isAuthenticated) {
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
    <div className="text-white h-[100vh] flex justify-center items-center bg-cover">
      <form
        onSubmit={submitHandler}
        encType="multipart/form-data"
        className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative"
      >
        <h1 className="text-4xl text-white font-bold text-center mb-6">
          Register
        </h1>
        <h1 className="text-xl text-white font-semibold text-center mb-6">
          🎉 Join us!
        </h1>
        <div>
          <div className="relative my-6">
            <input
              type="name"
              id="name"
              name="name"
              onChange={onChange}
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blur-600 peer"
              placeholder=""
            />
            <label
              htmlFor="name"
              className="absolute text-sm font-inter text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:text-base peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
            >
              Name
            </label>
            <BiUser className="absolute top-0 right-4" />
          </div>
          <div className="relative my-6">
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChange}
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blur-600 peer"
              placeholder=""
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
              id="password"
              name="password"
              onChange={onChange}
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blur-600 peer"
              placeholder=""
            />
            <label
              htmlFor="password"
              className="absolute text-sm font-inter text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:text-base peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            <AiOutlineLock className="absolute top-0 right-4" />
          </div>
          <div className="relative my-6">
            <input
              type="password"
              id="Confirmpwd"
              name="confirmpwd"
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blur-600 peer"
              placeholder=""
            />
            <label
              htmlFor="Confirmpwd"
              className="absolute text-sm font-inter text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:text-base peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
            <AiOutlineLock className="absolute top-0 right-4" />
          </div>
          <div className="relative my-6">
            <span className="flex gap-3 items-center">
              <figure className="inline-block w-15 py-2.3 px-0 text-sm text-white bg-transparent appearance-none focus:outline-none focus-text-white peer">
                <img
                  src={avatarPreview}
                  alt=""
                  className="w-12 h-12 object-cover-f rounded-full"
                />
              </figure>
              <input
                type="file"
                id="myfile"
                name="avatar"
                onChange={onChange}
                className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent appearance-none focus:outline-none focus-text-white peer"
                placeholder=""
              />
              <label
                htmlFor="myfile"
                className="absolute text-sm font-inter text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:text-base peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Avatar
              </label>
              <MdDriveFolderUpload className="absolute top-0 right-4" />
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
              Already have an account?
              <Link to="/login" className="text-blue-500">
                Click!
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
