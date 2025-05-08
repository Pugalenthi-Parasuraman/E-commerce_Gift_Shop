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
import { getAdminProducts } from "../../actions/productsActions";
import { deleteProduct } from "../../actions/productAction";
import { clearError, clearProductDeleted } from "../../Slices/productSlice";
import Loader from "../Reausable/Topnavbar/Loader";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import Sidebar from "./SidePanel";

function ProductList() {
  const dispatch = useDispatch();
  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (error || productError) {
      toast.error(error || productError, {
        position: "bottom-center",
      });
      dispatch(clearError());
    }
    if (isProductDeleted) {
      toast.success("Product Deleted Successfully!", {
        position: "bottom-center",
      });
      dispatch(clearProductDeleted());
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, productError, isProductDeleted]);

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => (filter === "lowStock" ? product.stock < 10 : true));

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const exportToCSV = () => {
    const headers = ["Id,Name,DuplicatePrice,Price,Stock"];
    const rows = products.map(
      (product) =>
        `${product._id},${product.name},₹${product.duplicatePrice},₹${product.price},${product.stock}`
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "products.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Product List</h1>

        <div className="flex justify-between mb-5">
          <div className="flex gap-4 mb-4">
            <TextField
              label="Search Product"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Filter"
                variant="outlined"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="lowStock">Low Stock</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={exportToCSV}>
              Export to CSV
            </Button>
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
                  <TableCell className="font-bold">DuplicatePrice</TableCell>
                  <TableCell className="font-bold">Price</TableCell>
                  <TableCell className="font-bold">Stock</TableCell>
                  <TableCell className="font-bold text-center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow key={product._id} className="hover:bg-gray-50">
                    <TableCell>{product._id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>₹{product.duplicatePrice}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Stack spacing={2} direction="row">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          <Link to={`/admin/product/${product._id}`}>
                            <CiEdit size={20} />
                          </Link>
                        </Button>
                        <Button
                          onClick={(e) => deleteHandler(e, product._id)}
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
            count={Math.ceil(filteredProducts.length / itemsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductList;
