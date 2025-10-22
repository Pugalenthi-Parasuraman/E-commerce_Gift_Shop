import { Link } from "react-router-dom";
import Logo from "../../../Assets/Logo.png";
import { CiUser } from "react-icons/ci";
// import { HiHeart } from "react-icons/hi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoChevronDownOutline } from "react-icons/io5";
import { Menus } from "./Utils";
import DesktopView from "./DesktopView";
import MobView from "./MobView";
import "../../../Styles/Home.css";
import { useEffect, useState } from "react";
import SeaFieald from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userActions";
// Import icons for light/dark mode
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
    navigate("/login");
  };

  const [sticky, setSticky] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // State for dark mode
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has a preference saved in localStorage
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const scrollSticky = () => {
    if (window.scrollY >= 20) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Save preference to localStorage
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollSticky);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Apply dark mode class to document root
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return () => {
      window.removeEventListener("scroll", scrollSticky);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [darkMode]);

  return (
    <header
      className={`${
        sticky
          ? "sticky top-0 bg-white shadow-md z-50 shadow-purple-500/30 dark:bg-gray-800 dark:shadow-gray-900/50"
          : "bg-transparent dark:bg-transparent"
      } bg-gray-100 flex text-[15px] flex-col border text-gray-500 font-inter dark:border-gray-700 dark:text-gray-300`}
    >
      <div className="container mx-auto flex justify-evenly items-center ">
        <Link to={"/"}>
          <span className="px-4 flex items-center gap-2">
            <img src={Logo} className="w-14 drop-shadow-md " alt="Rudra Logo" />
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-center py-5 dark:text-black">
          <SeaFieald />
        </div>

        <span className="flex z-50 nav-menu items-center gap-7 px-4 font-futura text-xs font-medium">
          {/* Dark mode toggle button */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <IoSunnyOutline size={20} className="text-yellow-400" />
            ) : (
              <IoMoonOutline size={20} />
            )}
          </button>

          {isAuthenticated ? (
            <div className="relative user-dropdown ">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 dark:hover:text-white px-4 py-2 cursor-pointer transition-colors duration-200"
              >
                <figure className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                  <img
                    width="50"
                    src={user?.avatar ?? "./images/default_avatar.png"}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </figure>
                <span className="font-medium">{user?.name ?? "User"}</span>
                <IoChevronDownOutline
                  className={`transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  size={16}
                />
              </button>

              <div
                className={`absolute right-0 mt-2 w-[188px] bg-white dark:bg-gray-800 border border-gray-600 dark:border-gray-600 rounded-sm shadow-xl transform transition-all duration-200 origin-top-right ${
                  dropdownOpen
                    ? "opacity-100 visible scale-100 translate-y-0"
                    : "opacity-0 invisible scale-95 -translate-y-2"
                } z-50`}
              >
                <div className="py-2">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      onClick={closeDropdown}
                      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
                    >
                      <span className="w-5 h-5 mr-3 text-gray-400">📊</span>
                      Dashboard
                    </Link>
                  )}

                  <Link
                    to="/myprofile"
                    onClick={closeDropdown}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
                  >
                    <span className="w-5 h-5 mr-3 text-gray-400">👤</span>
                    My Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={closeDropdown}
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
                  >
                    <span className="w-5 h-5 mr-3 text-gray-400">📦</span>
                    My Orders
                  </Link>

                  <div className="border-t border-gray-100 dark:border-gray-700 mt-1">
                    <button
                      onClick={() => {
                        logoutHandler();
                        closeDropdown();
                      }}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-150"
                    >
                      <span className="w-5 h-5 mr-3 text-red-400">🚪</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className=" px-4 py-2">
              <button className="flex flex-col">
                <CiUser size={25} className="stroke-1" />
                Login
              </button>
            </Link>
          )}
          {/* <button className="whislist">
            <HiHeart
              size={25}
              className="text-pink-500 hover:text-pink-600 stroke-2"
            />
            <p className="">Whishlist</p>
          </button> */}
          <Link to="/cart">
            <button className="cart flex flex-col dark:hover:text-white">
              <LiaShoppingBagSolid size={25} className="" />
              <p className="">
                Cart <span className="font-semibold">{cartItems.length}</span>
              </p>
            </button>
          </Link>
        </span>

        {/* Menu */}
        <div className="xl:hidden block px-3 mx-auto">
          <MobView Menus={Menus} />
        </div>
      </div>

      <nav className="px-3.5 flex-center-around w-full max-w-7xl mx-auto">
        {/* Desktop Menu */}
        <ul className="xl:flex-center hidden gap-x-36 py-1 relative">
          {Menus.map((menu) => (
            <DesktopView menu={menu} key={menu.name} />
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
