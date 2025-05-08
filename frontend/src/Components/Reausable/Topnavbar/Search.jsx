import React from "react";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
   const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState("")

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${keyword}`)

    }

    const clearKeyword = () =>{
        setKeyword("");
    }

    useEffect(() => {
        if(location.pathname === '/') {
            clearKeyword();
        }
    },[location])

  return (
    <div className="w-full max-w-2xl relative sm:flex sm:items-center">
      <form onSubmit={searchHandler}>
        <input
          type="text"
          id="search_field"
          name="search"
          className="form-control inline w-full px-2 rounded-sm font-poppins bg-white py-3 leading-5 placeholder-gray-500 focus:border-purple-500 focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:text-sm border-2 border-gray-400 "
          placeholder="Search for Product Name..."
          onChange={(e) => {setKeyword (e.target.value)}}
          value={keyword}
        />
        <button
          id="search_btn"
          className="btn md:hidden bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 absolute top-0 right-0 h-full w-12 rounded-r-sm text-white flex items-center justify-center"
        >
          <FaSearch className="block stroke-1 text-xl" />
        </button>
        {/* <button
                    type="submit"
                    className="hidden md:block mt-3 w-full items-center justify-center rounded-md border border-transparent px-4 py-2 font-medium shadow-sm text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-offset-1 focus:ring-purple-500 text-sm text-center sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Search
                  </button> */}
      </form>
    </div>
  );
}

export default Search;
