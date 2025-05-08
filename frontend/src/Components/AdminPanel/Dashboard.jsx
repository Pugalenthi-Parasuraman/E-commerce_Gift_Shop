import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productsActions";
import { getUsers } from "../../actions/userActions";
import { adminOrders as adminOrdersAction } from "../../actions/orderActions";
import { CgShoppingCart } from "react-icons/cg";
import { HiOutlineUsers } from "react-icons/hi";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import Sidebar from "./SidePanel";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

function Dashboard() {
  const { products = [] } = useSelector((state) => state.productsState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  let outOfStock = products.filter((product) => product.stock === 0).length;
  let totalAmount = adminOrders.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );

  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(getUsers);
    dispatch(adminOrdersAction);
  }, [dispatch]);

  const stockData = [
    { name: "In Stock", value: products.length - outOfStock },
    // { name: "Out of Stock", value: outOfStock },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 bg-gray-200 w-full">
        <div>
          <p className="font-semibold text-2xl font-inter text-gray-700">
            Dashboard
          </p>
        </div>
        <div className="flex flex-wrap gap-10 mt-5">
          <DashboardCard
            title="Products"
            count={products.length}
            link="/admin/products"
            total="Total"
            icon={<CgShoppingCart />}
            detail="View Details"
          />
          <DashboardCard
            title="Revenues"
            count={totalAmount.toFixed(2)}
            total="Total"
            icon={<LiaRupeeSignSolid className="stroke-1" />}
          />
          <DashboardCard
            title="Customers"
            count={users.length}
            link="/admin/users"
            total="Total"
            icon={<HiOutlineUsers />}
            detail="View Details"
          />
          <DashboardCard
            title="Sales"
            count={adminOrders.length}
            link="/admin/orders"
            total="Total"
            icon={<RiShoppingBasket2Line />}
            detail="View Details"
          />
          {/* <div className="w-32 flex flex-col items-center justify-center bg-white border-gray-200 rounded-sm shadow-lg border-2 text-center">
            <h2 className="font-bold font-inter text-gray-800">Out of Stock</h2>
            <p className="text-2xl font-bold">{outOfStock}</p>
          </div> */}
        </div>

        {/* Graph Section */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow border">
            <h2 className="text-xl font-bold text-gray-700 mb-3">
              Stock Overview
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stockData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow border col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-gray-700 mb-3">
              Pie Chart
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Products",
                      value: products.length,
                      fill: "#8884d8",
                    },
                    { name: "Customers", value: users.length, fill: "#82ca9d" },
                    {
                      name: "Sales",
                      value: adminOrders.length,
                      fill: "#ffc658",
                    },
                    // {
                    //   name: "Out of Stock",
                    //   value: outOfStock,
                    //   fill: "#ff7300",
                    // },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}`} 
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

const DashboardCard = ({ title, total, icon, count, link, detail }) => {
  return (
    <div
      className={`w-60 bg-white border-gray-200 rounded-sm shadow-lg border-2`}
    >
      <div className="flex items-center space-x-1 pl-3 pt-3">
        <h2 className="font-bold font-inter text-gray-800">{title}</h2>
        <div className="h-4 w-[2px] bg-gray-400"></div>
        <h2 className="font-medium font-roboto text-gray-500 text-sm">
          {total}
        </h2>
      </div>

      <div className="flex flex-col px-10 py-2">
        <div className="text-2xl font-bold text-gray-800 flex items-center gap-6">
          <p className="bg-gray-400/25 text-black/75 rounded-full p-2">
            {icon}
          </p>
          <p>{count}</p>
        </div>
        {link && detail && (
          <Link
            to={link}
            className="block mt-2 text-xs text-center font-semibold font-inter hover:text-gray-800 text-gray-500"
          >
            <p>{detail}</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
