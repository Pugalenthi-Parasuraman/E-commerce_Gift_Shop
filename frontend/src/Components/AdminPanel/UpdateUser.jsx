import { Fragment, useEffect, useState } from "react";
import Sidebar from "./SidePanel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../Slices/userSlice";
import { toast } from "react-toastify";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id: userId } = useParams();
  const { loading, isUserUpdated, error, user } = useSelector(
    (state) => state.userState
  );
  const { user: authUser } = useSelector((state) => state.authState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    dispatch(updateUser(userId, formData));
  };

  useEffect(() => {
    if (isUserUpdated) {
      toast.success("User Updated Successfully!", {
        position: "bottom-center",
        onOpen: () => dispatch(clearUserUpdated()),
      });
      navigate("/admin/users");
      return;
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => dispatch(clearError()),
      });
      return;
    }

    dispatch(getUser(userId));
  }, [isUserUpdated, error, dispatch, userId, navigate]);

  useEffect(() => {
    if (user?._id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  return (
    <div className="flex items-center">
      <Sidebar />
      <div className="flex-1 ">
        <Fragment>
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-semibold mb-4 text-center">
              Update User
            </h1>
            <form onSubmit={submitHandler} className="space-y-4">
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="w-full border rounded-md p-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <select
                className="w-full border rounded-md p-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={user?._id === authUser?._id} // Prevent self-role change
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                UPDATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
