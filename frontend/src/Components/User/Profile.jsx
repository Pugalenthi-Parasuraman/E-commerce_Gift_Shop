import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useSelector((state) => state.authState);
  
  return (
    <div className="container mx-auto px-20 font-futura">
      <h2 className="mt-5 ml-5 text-xl font-bold">My Profile</h2>
      <div className="xl:flex flex-wrap xl:justify-around mt-5 gap-10 items-center">
        <div className="md:w-1/4 text-center">
          <figure className="w-full mx-auto mb-5">
            <img
              className="rounded-full w-32 h-32 object-cover mx-auto"
              src={user.avatar ?? "./images/default_avatar.png"}
              alt="Profile"
            />
          </figure>

          <Link
            to="/myprofile/update"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full"
          >
            Edit Profile
          </Link>
        </div>

        <div className="md:w-1/2">
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Full Name</h4>
            <p className="text-gray-700">{user.name}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Email Address</h4>
            <p className="text-gray-700">{user.email}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Joined</h4>
            <p className="text-gray-700">
              {String(user.createdAt).substring(0, 10)}
            </p>
          </div>

          <div className="mt-5 space-y-3">
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-full">
              <Link to="/orders"> My Orders</Link>
            </button>

            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">
              <Link to="/myprofile/update/password">Change Password</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
