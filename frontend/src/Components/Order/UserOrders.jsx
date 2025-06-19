import { Fragment, useEffect } from "react";
import MetaData from "../Reausable/Topnavbar/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { userOrders as userOrdersAction } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import Loader from "../Reausable/Topnavbar/Loader";

export default function UserOrders() {
  const {
    userOrders = [],
    loading,
    error,
  } = useSelector((state) => state.orderState || {});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrdersAction());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500 text-center my-4">Error: {error}</p>;
  }

  const columns = [
    {
      name: "Order ID",
      selector: (row) =>
        row.customOrderId || `ORD-${row._id.slice(-6).toUpperCase()}`,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Items",
      selector: (row) => row.orderItems.length,
      sortable: true,
      center: true,
    },
    {
      name: "Amount",
      selector: (row) => `₹${row.totalPrice.toFixed(2)}`,
      sortable: true,
      right: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            row.orderStatus === "Delivered"
              ? "bg-green-100 text-green-800"
              : row.orderStatus === "Shipped"
              ? "bg-blue-100 text-blue-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.orderStatus}
        </span>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "View",
      cell: (row) => (
        <Link
          to={`/order/${row._id}`}
          className="text-blue-500 hover:text-blue-700 flex justify-center"
          title="View Order Details"
        >
          <FaEye size={18} />
        </Link>
      ),
      center: true,
    },
    {
      name: "Track",
      cell: (row) => (
        <Link
          to={`/order/location/${row._id}`}
          className="text-green-500 hover:text-green-700 flex justify-center"
          title="Track Live Location"
        >
          📍
        </Link>
      ),
      center: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#f3f4f6",
        fontWeight: "bold",
        fontSize: "0.875rem",
        textTransform: "uppercase",
      },
    },
    cells: {
      style: {
        padding: "12px 16px",
      },
    },
  };

  return (
    <Fragment>
      <MetaData title="My Orders" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>

        {userOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/products"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <DataTable
              columns={columns}
              data={userOrders}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
              highlightOnHover
              responsive
              pointerOnHover
              customStyles={customStyles}
              noDataComponent={
                <div className="py-8 text-center text-gray-500">
                  No orders found
                </div>
              }
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}
