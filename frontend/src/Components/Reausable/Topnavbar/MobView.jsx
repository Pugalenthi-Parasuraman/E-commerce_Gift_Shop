import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function MobMenu({ Menus }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
  };

  const handleRedirect = (link) => {
    if (link) {
      navigate(link);
      setIsOpen(false); // Close menu on navigation
    }
  };

  const subMenuDrawer = {
    enter: { height: "auto", overflow: "hidden" },
    exit: { height: 0, overflow: "hidden" },
  };

  return (
    <div>
      {/* Mobile Menu Toggle Button */}
      <button className="lg:hidden z-[50] relative" onClick={toggleDrawer}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Drawer */}
      <motion.div
        className="fixed left-0 right-0 top-[88px] h-full bg-black/50 backdrop-blur text-white p-6 pb-20 z-[100] overflow-y-auto"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
      >
        <ul>
          {Menus.map(({ name, subMenu }, i) => {
            const isClicked = clicked === i;
            const hasSubMenu = subMenu?.length > 0;

            return (
              <li key={name}>
                {/* Main Menu Item */}
                <span
                  className="flex items-center justify-between p-4 font-futura text-lg hover:bg-white/5 rounded-md cursor-pointer"
                  onClick={() => setClicked(isClicked ? null : i)}
                >
                  {name}
                  {hasSubMenu && (
                    <ChevronDown
                      className={`ml-auto transition-transform ${
                        isClicked ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </span>

                {/* SubMenu */}
                {hasSubMenu && (
                  <motion.ul
                    initial="exit"
                    animate={isClicked ? "enter" : "exit"}
                    variants={subMenuDrawer}
                    className="ml-5 space-y-2"
                  >
                    {subMenu.map(({ name, link, icon: Icon }) => (
                      <li
                        key={name}
                        className="p-2 flex items-center gap-x-2 font-futura hover:bg-white/5 rounded-md cursor-pointer"
                        onClick={() => handleRedirect(link)}
                      >
                        {Icon && <Icon size={17} />}
                        {name}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
