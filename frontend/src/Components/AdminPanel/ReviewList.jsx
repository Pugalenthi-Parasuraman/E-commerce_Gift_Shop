import { useEffect, useState, Fragment } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
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
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

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
      dispatch(getReviews(productId)); // Reload reviews
    }
  }, [dispatch, error, isReviewDeleted, productId]);

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteReview(productId, id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviews(productId));
  };

  return (
    <div className="flex">
      <Sidebar />
      <Fragment>
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-6">Review List</h1>

          <div className="max-w-md mx-auto mb-6">
            <form onSubmit={submitHandler} className="space-y-4">
              <TextField
                fullWidth
                label="Product ID"
                variant="outlined"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                Search
              </Button>
            </form>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : reviews.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">No reviews found.</p>
          ) : (
            <TableContainer component={Paper} className="shadow-md rounded-lg">
              <Table>
                <TableHead className="bg-gray-100">
                  <TableRow>
                    <TableCell className="font-bold">ID</TableCell>
                    <TableCell className="font-bold">Rating</TableCell>
                    <TableCell className="font-bold">User</TableCell>
                    <TableCell className="font-bold">Comment</TableCell>
                    <TableCell className="font-bold text-center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reviews.map((review) => (
                    <TableRow key={review._id} className="hover:bg-gray-50">
                      <TableCell>{review._id}</TableCell>
                      <TableCell>{review.rating}</TableCell>
                      <TableCell>{review.user?.name || "Unknown"}</TableCell>
                      <TableCell>{review.comment}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          onClick={(e) => deleteHandler(e, review._id)}
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
          )}
        </div>
      </Fragment>
    </div>
  );
}
