import { useEffect, useState, Fragment } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReviews } from "../../actions/productAction";
import { clearError, clearReviewDeleted } from "../../Slices/productSlice";
import { toast } from "react-toastify";
import Sidebar from "./SidePanel";

export default function ReviewList() {
  const {
    reviews = [],
    loading,
    error,
    isReviewDeleted,
  } = useSelector((state) => state.productState);

  const [filterRating, setFilterRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const reviewsPerPage = 5;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "bottom-center" });
      dispatch(clearError());
    }
    if (isReviewDeleted) {
      toast.success("Review Deleted Successfully!", {
        position: "bottom-center",
      });
      dispatch(clearReviewDeleted());
      dispatch(getReviews());
    }
  }, [dispatch, error, isReviewDeleted]);

  const deleteHandler = (e, id, productId) => {
    e.target.disabled = true;
    dispatch(deleteReview(productId, id));
  };

  // Filter and Sort
  const filteredReviews = reviews
    .filter((r) => (filterRating === 0 ? true : r.rating === filterRating))
    .sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    });

  // Paginate
  const indexOfLast = page * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirst, indexOfLast);

  return (
    <div className="flex">
      <Sidebar />
      <Fragment>
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-6">All Reviews</h1>

          <div className="flex gap-4 mb-6">
            <FormControl>
              <InputLabel>Filter by Rating</InputLabel>
              <Select
                value={filterRating}
                onChange={(e) => setFilterRating(Number(e.target.value))}
                label="Filter by Rating"
                style={{ minWidth: 150 }}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>1 Star</MenuItem>
                <MenuItem value={2}>2 Stars</MenuItem>
                <MenuItem value={3}>3 Stars</MenuItem>
                <MenuItem value={4}>4 Stars</MenuItem>
                <MenuItem value={5}>5 Stars</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Sort</InputLabel>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                label="Sort"
                style={{ minWidth: 150 }}
              >
                <MenuItem value="desc">Latest First</MenuItem>
                <MenuItem value="asc">Oldest First</MenuItem>
              </Select>
            </FormControl>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : currentReviews.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">No reviews found.</p>
          ) : (
            <>
              <TableContainer
                component={Paper}
                className="shadow-md rounded-lg"
              >
                <Table>
                  <TableHead className="bg-gray-100">
                    <TableRow>
                      <TableCell className="font-bold">Review ID</TableCell>
                      <TableCell className="font-bold">Rating</TableCell>
                      <TableCell className="font-bold">User</TableCell>
                      <TableCell className="font-bold">Comment</TableCell>
                      <TableCell className="font-bold">Product ID</TableCell>
                      <TableCell className="font-bold text-center">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentReviews.map((review) => (
                      <TableRow key={review._id} className="hover:bg-gray-50">
                        <TableCell>{review._id}</TableCell>
                        <TableCell>{review.rating}</TableCell>
                        <TableCell>{review.user?.name || "Unknown"}</TableCell>
                        <TableCell>{review.comment}</TableCell>
                        <TableCell>{review.productId}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            onClick={(e) =>
                              deleteHandler(e, review._id, review.productId)
                            }
                            variant="contained"
                            color="error"
                            size="small"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <div className="flex justify-center mt-4">
                <Pagination
                  count={Math.ceil(filteredReviews.length / reviewsPerPage)}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </div>
            </>
          )}
        </div>
      </Fragment>
    </div>
  );
}
