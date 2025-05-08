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
import { deleteUser, getUsers } from "../../actions/userActions";
import { clearError, clearUserDeleted } from "../../Slices/userSlice";
import Loader from "../Reausable/Topnavbar/Loader";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import Sidebar from "./SidePanel";

export default function UserList() {
  const dispatch = useDispatch();
  const {
    users = [],
    loading,
    error,
    isUserDeleted,
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
    if (isUserDeleted) {
      toast.success("User Deleted Successfully!", {
        position: "bottom-center",
      });
      dispatch(clearUserDeleted());
    }
    dispatch(getUsers());
  }, [dispatch, error, isUserDeleted]);

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteUser(id));
  };

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .filter((user) => (roleFilter ? user.role === roleFilter : true));

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">User List</h1>

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
        </div>

        {loading ? (
          <Loader />
        ) : (
          <TableContainer component={Paper} className="shadow-lg rounded-lg">
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell className="font-bold">Id</TableCell>
                  <TableCell className="font-bold">Name</TableCell>
                  <TableCell className="font-bold">Email</TableCell>
                  <TableCell className="font-bold">Role</TableCell>
                  <TableCell className="font-bold text-center">
                    Actions
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
                    <TableCell className="flex gap-2 justify-center">
                      <Stack spacing={2} direction="row">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          <Link to={`/admin/user/${user._id}`}>
                            <CiEdit size={20} />
                          </Link>
                        </Button>
                        <Button
                          onClick={(e) => deleteHandler(e, user._id)}
                          variant="contained"
                          color="error"
                          size="small"
                        >
                          <IoTrashOutline size={20} />
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
