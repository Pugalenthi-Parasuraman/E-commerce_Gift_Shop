import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteOrder,
  adminOrders as adminOrdersAction,
} from "../../actions/orderActions";
import { clearError, clearOrderDeleted } from "../../Slices/orderSlice";
import Loader from "../Reausable/Topnavbar/Loader";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import Sidebar from "./SidePanel";
import { toast } from "react-toastify";

export default function OrderList() {
  const dispatch = useDispatch();
  const {
    adminOrders = [],
    loading,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "bottom-center" });
      dispatch(clearError());
    }
    if (isOrderDeleted) {
      toast.success("Order Deleted Successfully!", {
        position: "bottom-center",
      });
      dispatch(clearOrderDeleted());
    }
    dispatch(adminOrdersAction());
  }, [dispatch, error, isOrderDeleted]);

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteOrder(id));
  };

  const filteredOrders = adminOrders
    .filter(
      (order) =>
        order.customOrderId?.toLowerCase().includes(search.toLowerCase()) ||
        order._id.toLowerCase().includes(search.toLowerCase())
    )
    .filter((order) =>
      filter === "processing" ? order.orderStatus.includes("Processing") : true
    );

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const exportToCSV = () => {
    const headers = [
      "Order ID,Customer Order ID,Items,Amount,Status,Payment Method,Live Location",
    ];
    const rows = adminOrders.map((order) => {
      const liveLocation = order.liveLocation
        ? `${order.liveLocation.latitude}, ${order.liveLocation.longitude}`
        : "N/A";
      return `${order._id},${order.customOrderId || "N/A"},${
        order.orderItems.length
      },₹${order.totalPrice},${order.orderStatus},${
        order.paymentMethod
      },${liveLocation}`;
    });

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Order List</h1>

        <div className="flex justify-between mb-5">
          <div className="flex gap-4">
            <TextField
              label="Search Order ID"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by RUDRA ID or Order ID"
            />
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Filter"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Button variant="contained" color="primary" onClick={exportToCSV}>
            Export to CSV
          </Button>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <TableContainer component={Paper} className="shadow-lg rounded-lg">
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell className="font-bold">Order ID</TableCell>
                  <TableCell className="font-bold">Items</TableCell>
                  <TableCell className="font-bold">Amount</TableCell>
                  <TableCell className="font-bold">Status</TableCell>
                  <TableCell className="font-bold">Payment</TableCell>
                  <TableCell className="font-bold">Live Location</TableCell>
                  <TableCell className="font-bold text-center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order._id} className="hover:bg-gray-50">
                    <TableCell>
                      {order.customOrderId ||
                        `ORD-${order._id.slice(-6).toUpperCase()}`}
                    </TableCell>
                    <TableCell>{order.orderItems.length}</TableCell>
                    <TableCell>₹ {order.totalPrice}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 font-semibold rounded-sm shadow-lg text-white ${
                          order.orderStatus.includes("Processing")
                            ? "bg-red-500 hover:bg-red-700"
                            : order.orderStatus.includes("Shipped")
                            ? "bg-blue-500 hover:bg-blue-700"
                            : order.orderStatus.includes("Delivered")
                            ? "bg-green-500 hover:bg-green-700"
                            : "bg-gray-500 hover:bg-gray-700"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      {order.paymentMethod === "online" ? "Online" : "Offline"}
                    </TableCell>
                    <TableCell>
                      {order.liveLocation ? (
                        <div className="flex flex-col">
                          <a
                            href={`https://maps.google.com/?q=${order.liveLocation.latitude},${order.liveLocation.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            {order.liveLocation.latitude},{" "}
                            {order.liveLocation.longitude}
                          </a>
                          <span className="text-xs text-gray-500">
                            {new Date(
                              order.liveLocation.timestamp
                            ).toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Stack spacing={1} direction="row">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          component={Link}
                          to={`/admin/order/${order._id}`}
                        >
                          <CiEdit size={20} />
                        </Button>
                        <Button
                          onClick={(e) => deleteHandler(e, order._id)}
                          variant="contained"
                          color="error"
                          size="small"
                        >
                          <IoTrashOutline size={20} />
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          component={Link}
                          to={`/order/location/${order._id}`}
                        >
                          Track
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <div className="flex justify-center mt-4">
          <Pagination
            count={Math.ceil(filteredOrders.length / itemsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}
