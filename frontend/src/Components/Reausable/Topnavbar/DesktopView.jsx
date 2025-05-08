import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import React from "react";
import { motion } from "framer-motion";
import "../../../Styles/Home.css";

function DesktopView({ menu }) {
  const [isHover, toggleHover] = useState(false);
  const navigate = useNavigate(); 

  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const hasSubMenu = menu?.subMenu?.length;


  const handleRedirect = (link) => {
    if (link) {
      navigate(link); // Redirect to category page
    }
  };

  return (
    <motion.li
      className="nav-list z-10 group/link"
      onHoverStart={toggleHoverMenu}
      onHoverEnd={toggleHoverMenu}
      key={menu.name}
    >
      <span className="flex-center relative gap-1 cursor-pointer px-1 py-1 hover:text-black font-poppins uppercase text-sm tracking-wider font-medium">
        {menu.name}
        {hasSubMenu && (
          <ChevronDown
            className="mt-[0.6px] group-hover/link:rotate-180 duration-200"
            size={20}
          />
        )}
      </span>

      {hasSubMenu && (
        <motion.div
          className="sub-menu"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div
            className={`grid gap-7 ${
              menu.gridCols === 3 ? "grid-cols-3" : "grid-cols-1"
            }`}
          >
            {menu.subMenu.map((submenu, i) => (
              <div
                key={i}
                className="relative cursor-pointer py-1"
                onClick={() => handleRedirect(submenu.link)} // ✅ Redirect on click
              >
                {menu.gridCols > 1 && menu?.subMenuHeading?.[i] && (
                  <p className="text-sm mb-4 text-black">
                    {menu?.subMenuHeading?.[i]}
                  </p>
                )}
                <div className="flex-center gap-x-4 group/menubox">
                  <div className="bg-white/40 text-black w-fit p-3 rounded-md group-hover/menubox:bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950 group-hover/menubox:text-white duration-300">
                    {submenu.icon && <submenu.icon />}
                  </div>
                  <div>
                    <h6 className="font-semibold font-futura uppercase text-gray-800">
                      {submenu.name}
                    </h6>
                    <p className="text-sm font-futura text-gray-600">
                      {submenu.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}

export default DesktopView;
