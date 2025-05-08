import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import MetaData from "../../Components/Reausable/Topnavbar/MetaData";
import Product from "./Product";
import Loader from "../Reausable/Topnavbar/Loader";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import "../../Styles/Home.css";
import { useParams } from "react-router-dom";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(null);
  const { keyword } = useParams();

  const categories = [
    "Popular Products",
    "Latest First",
    "Price-Low to High",
    "Price-High to Low",
  ];

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
      });
    }

    dispatch(getProducts(keyword, category, currentPage));
  }, [dispatch, error, currentPage, keyword, category]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <div className="flex flex-col">
            <div className="flex justify-around flex-wrap">
              <span>
                <p className="font-medium text-yellow-500 font-rubik text-sm">
                  Search More and Take More
                </p>
                <h1 className="font-semibold font-rubik text-2xl">
                  Search Products
                </h1>
              </span>

              <div className="flex items-center text-gray-700 font-futura border-1 justify-center ">
                <label htmlFor="sortby" className="">
                  <p className="flex items-center text-sm gap-2 font-semibold">
                    <TbAdjustmentsHorizontal
                      className="text-black "
                      size={20}
                    />
                    Sort By:
                  </p>
                </label>
                <select
                  className="cursor-pointer bg-gray-200 "
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option
                      className="cursor-pointer list-none bg-none"
                      key={category}
                      onClick={() => {
                        setCategory(category);
                      }}
                    >
                      <span>
                        <p className=""> {category}</p>
                      </span>
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <section className="mt-5">
              <div className="flex flex-wrap gap-6 justify-center p-2">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </section>
            {productsCount > 0 && productsCount > resPerPage ? (
              <div className="flex mt-3 items-center justify-center">
                <Pagination
                  activePage={currentPage}
                  onChange={setCurrentPageNo}
                  totalItemsCount={productsCount}
                  itemsCountPerPage={resPerPage}
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item block w-full text-center font-futura font-medium px-3 py-2 border border-gray-300 hover:bg-gray-100"
                  linkClass="page-link text-black hover:text-orange-600"
                  activeClass="active bg-orange-500 border-orange-500 text-white"
                  activeLinkClass="text-black"
                  innerClass="pagination"
                />
              </div>
            ) : null}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductSearch;
