import React, { useState } from "react";
import { HiMenuAlt3} from "react-icons/hi";
import { MdOutlineDashboard, MdOutlineCreateNewFolder, MdOutlineReviews } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { CgShoppingBag } from "react-icons/cg";
// import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineProduct } from "react-icons/ai";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

function Sidebar (){
  const menus = [
    { name: "Dashboard", link: "/admin/dashboard", icon: MdOutlineDashboard },
    { name: "Users", link: "/admin/users", icon: AiOutlineUser },
    { name: "Invoices", link: "/admin/users/invoice", icon: LiaFileInvoiceSolid },
    { name: "All Products", link: "/admin/products", icon: AiOutlineProduct, margin: true },
    { name: "Create Products", link: "/admin/products/create", icon: MdOutlineCreateNewFolder },
    { name: "Orders List", link: "/admin/orders", icon: CgShoppingBag  },
    // { name: "Analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "Reviews", link: "/admin/reviews", icon: MdOutlineReviews },
    { name: "Logout", link: "/", icon: RiLogoutBoxLine, margin: true },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#ffffff] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-black px-4`}
      >
        <div className="py-6 flex justify-between">
          <h2 className={`text-lg font-bold  ${!open && "hidden"}`}>Admin Panel</h2>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className=" flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-3"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-200 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
