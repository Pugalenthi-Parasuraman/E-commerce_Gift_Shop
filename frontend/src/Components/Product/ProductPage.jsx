import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import MetaData from "../../Components/Reausable/Topnavbar/MetaData";
import Product from "./Product";
import Loader from "../Reausable/Topnavbar/Loader";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import "../../Styles/Home.css";

function ProductPage() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1); 

  // Function to handle page change
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
      });
    }

    dispatch(getProducts(null, null, currentPage)); 
  }, [dispatch, error, currentPage]); 

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <div className="flex items-center flex-col">
            <p className="font-medium text-yellow-500 font-rubik text-sm">
              Buying New Products
            </p>
            <h1 className="font-semibold font-rubik text-2xl">
              Latest Products
            </h1>
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

export default ProductPage;
