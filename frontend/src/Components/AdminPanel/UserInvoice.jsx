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
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUsers } from "../../actions/userActions";
import { clearError } from "../../Slices/userSlice";
import Loader from "../Reausable/Topnavbar/Loader";
import Sidebar from "./SidePanel";

export default function UserInvoice() {
  const dispatch = useDispatch();
  const {
    users = [],
    loading,
    error,
  } = useSelector((state) => state.userState);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "bottom-center" });
      dispatch(clearError());
    }
    dispatch(getUsers());
  }, [dispatch, error]);

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .filter((user) => (roleFilter ? user.role === roleFilter : true));

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const exportToCSV = () => {
    const headers = "Id,Name,Email,Role";
    const rows = filteredUsers.map(
      (user) => `${user._id},${user.name},${user.email},${user.role}`
    );
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "user_list.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">User Invoices</h1>

        <div className="flex justify-between mb-5">
          <div className="flex gap-4">
            <TextField
              label="Search User"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                label="Role"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Button variant="contained" color="primary" onClick={exportToCSV}>
            Export CSV
          </Button>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <TableContainer component={Paper} className="shadow-lg rounded-lg">
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell className="font-bold">ID</TableCell>
                  <TableCell className="font-bold">Name</TableCell>
                  <TableCell className="font-bold">Email</TableCell>
                  <TableCell className="font-bold">Role</TableCell>
                  <TableCell className="font-bold text-center">
                    Avatar
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user._id} className="hover:bg-gray-50">
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 font-semibold rounded-sm shadow-lg text-white ${
                          user.role === "admin"
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-green-500 hover:bg-green-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Avatar
                        src={user.avatar || "/default-avatar.png"}
                        alt={user.name}
                        sx={{ width: 40, height: 40 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <div className="flex justify-center mt-4">
          <Pagination
            count={Math.ceil(filteredUsers.length / itemsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}
