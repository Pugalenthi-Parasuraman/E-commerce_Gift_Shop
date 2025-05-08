import { Link } from "react-router-dom";
import Logo from "../../../Assets/Logo.png";
import { CiUser } from "react-icons/ci";
// import { HiHeart } from "react-icons/hi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { Menus } from "./Utils";
import DesktopView from "./DesktopView";
import MobView from "./MobView";
import "../../../Styles/Home.css";
import { useEffect, useState } from "react";
import SeaFieald from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userActions";

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

  const scrollSticky = () => {
    if (window.scrollY >= 20) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollSticky);

    return () => {
      window.removeEventListener("scroll", scrollSticky);
    };
  }, []);

  return (
    <header
      className={`${
        sticky
          ? "sticky top-0 bg-white shadow-md z-50 shadow-purple-500/30"
          : "bg-transparent"
      } bg-gray-100 flex text-[15px] flex-col border text-gray-500 font-inter`}
    >
      <div className="container mx-auto flex justify-evenly items-center ">
        <Link to={"/"}>
          <span className="px-4 flex items-center gap-2">
            <img src={Logo} className="w-14 drop-shadow-md " alt="Rudra Logo" />
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-center py-5">
          <SeaFieald />
        </div>

        <span className="flex z-50 nav-menu items-center gap-7 px-4 font-futura text-xs font-medium">
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2  text-gray-700 px-4 py-2 "
                onClick={() => {
                  document
                    .getElementById("user-dropdown")
                    .classList.toggle("hidden");
                }}
              >
                <figure className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    width="50"
                    src={user.avatar ?? "./images/default_avatar.png"}
                    alt="avatar"
                  />
                </figure>
                <span>{user.name}</span>
              </button>

              <div
                id="user-dropdown"
                className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg hidden"
              >
                <div className="py-2">
                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/myprofile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-center px-4 py-2 text-red-600 hover:bg-gray-200"
                  >
                    Logout
                  </button>
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
            <button className="cart flex flex-col">
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
